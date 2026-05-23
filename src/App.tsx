import { ActionIcon, AppShell, AppShellHeader, Avatar, AppShellMain, AppShellAside, Affix, FileInput, FileButton } from "@mantine/core";
import "@mantine/core/styles.css";
import Verse from "./components/Verse";
import { DesktopQuranNavigator } from "./components/QuranNavigator";
import { Group } from "@mantine/core";
import ScienceNavigator from "@/components/PageNavigator";
import { IconDice6, IconDirectionsFilled, IconSettings } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import SettingsModal from "@/components/SettingsModal";
import { randomiseVerse } from "@/utils/quranData";
import { useLocationStore } from "@/stores/useLocationStore";
import { useNahwStore } from "@/stores/useNahwStore";
import { useSarfStore } from "@/stores/useSarfStore";
import { useBalaghaStore } from "@/stores/useBalaghaStore";
import { useCommentsStore } from "@/stores/useCommentsStore";
import { z } from "zod";
import { IconDownload } from "@tabler/icons-react";
import { IconUpload } from "@tabler/icons-react";

function App() {
    const QuranicKey = z.string().regex(/^\d+-\d+$/);

    const AyahDataSchema = z.object({
        nodes: z.array(z.unknown()),
        edges: z.array(z.unknown()),
        iraab: z.array(z.unknown()),
    });

    const ProgressSchema = z.object({
        nahw: z.record(QuranicKey, AyahDataSchema),
        sarf: z.record(QuranicKey, z.array(z.unknown())),
        balagha: z.record(QuranicKey, z.array(z.unknown())),
        comments: z.record(QuranicKey, z.string()),
    });

    type ProgressPayload = z.infer<typeof ProgressSchema>;
    const setLocation = useLocationStore((s) => s.setLocation);
    const [opened, { open, close }] = useDisclosure(false);
    const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
    const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure();

    const saveAnalysis = () => {
        const nahwData = useNahwStore.getState().data;
        const sarfData = useSarfStore.getState().data;
        const balaghaData = useBalaghaStore.getState().data;
        const commentsData = useCommentsStore.getState().data;
        const combinedData = {
            nahw: nahwData,
            sarf: sarfData,
            balagha: balaghaData,
            comments: commentsData,
        };
        const fileName = "quran-progress";
        const jsonString = JSON.stringify(combinedData, null, 2);
        const blob = new Blob([jsonString], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `${fileName}.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    const loadAnalysis = (file: File | null) => {
        if (!file) return;

        const reader = new FileReader();
        reader.onload = () => {
            try {
                const text = reader.result;
                const parsed = JSON.parse(typeof text === "string" ? text : "");

                const result = ProgressSchema.safeParse(parsed);
                if (!result.success) {
                    throw new Error(JSON.stringify(result.error.flatten()));
                }

                const progress = result.data as ProgressPayload;
                useNahwStore.setState({ data: progress.nahw as unknown as Record<`${number}-${number}`, any> });
                useSarfStore.setState({ data: progress.sarf as unknown as Record<`${number}-${number}`, any[]> });
                useBalaghaStore.setState({ data: progress.balagha as unknown as Record<`${number}-${number}`, any[]> });
                useCommentsStore.setState({ data: progress.comments as unknown as Record<`${number}-${number}`, string> });

                alert("Progress loaded successfully.");
            } catch (error) {
                const message = error instanceof Error ? error.message : "Unable to load progress.";
                alert(`Failed to load progress: ${message}`);
            }
        };

        reader.onerror = () => {
            alert("Failed to read the selected file.");
        };

        reader.readAsText(file, "utf-8");
    };

    return (
        <AppShell bg={"background"} header={{ height: 60 }} aside={{ width: 400, breakpoint: "md", collapsed: { desktop: !desktopOpened, mobile: !mobileOpened } }}>
            <AppShellHeader bg={"background"}>
                <Group h="100%" px="md" justify="space-between">
                    <Avatar title="TAFSEEL" src={"logo_light.png"} size={"md"} radius={"sm"} />
                    <DesktopQuranNavigator />
                    <Group>
                        <ActionIcon title="Navigate the Quran" c={"accent"} bg={"button"} size={"lg"} onClick={toggleMobile} hiddenFrom="sm">
                            <IconDirectionsFilled />
                        </ActionIcon>
                        <ActionIcon title="Navigate the Quran" c={"accent"} bg={"button"} size={"lg"} onClick={toggleDesktop} visibleFrom="sm">
                            <IconDirectionsFilled />
                        </ActionIcon>
                        <ActionIcon size={"lg"} onClick={open} title="Change how the app looks" c={"accent"}>
                            <IconSettings size={"30"} />
                        </ActionIcon>
                    </Group>
                </Group>
            </AppShellHeader>
            <AppShellMain>
                <SettingsModal opened={opened} close={close} />
                <ScienceNavigator />
            </AppShellMain>
            <AppShellAside p="md" bg={"background"}>
                <Verse />
                <Group justify="center">
                    <ActionIcon
                        size={"xl"}
                        onClick={() => {
                            const randomVerse = randomiseVerse();
                            setLocation(randomVerse.surah, randomVerse.ayah);
                        }}
                        title="Land at a random verse"
                        c={"accent"}
                    >
                        <IconDice6 size={"30"} />
                    </ActionIcon>
                </Group>
            </AppShellAside>
            <Affix position={{ bottom: 5, left: 5 }}>
                <Group gap={5}>
                    <ActionIcon size={"xl"} onClick={saveAnalysis} title="Downlaod progress to a JSON file" c={"accent"} bg={""}>
                        <IconDownload />
                    </ActionIcon>
                    <FileButton accept="json" onChange={loadAnalysis}>
                        {(props) => (
                            <ActionIcon size={"xl"} c={"accent"} bg={""}>
                                <IconUpload {...props} />
                            </ActionIcon>
                        )}
                    </FileButton>
                </Group>
            </Affix>
        </AppShell>
    );
}

export default App;
