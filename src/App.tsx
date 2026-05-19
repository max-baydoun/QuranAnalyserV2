import { ActionIcon, AppShell, AppShellHeader, Avatar, AppShellMain, AppShellAside, Button, Affix } from "@mantine/core";
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

function App() {
    const setLocation = useLocationStore((s) => s.setLocation);
    const [opened, { open, close }] = useDisclosure(false);
    const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
    const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure();

    const saveAnalysis = () => {
        const nahwData = useNahwStore.getState().data;
        const sarfData = useSarfStore.getState().data;
        const balaghaData = {};
        const commentsData = {};
        const combinedData = {
            nahw: nahwData,
            sarf: sarfData,
            balagha: balaghaData,
            comments: commentsData,
        };
        const fileName = "testJSON";
        // Convert the object to a pretty-printed JSON string
        const jsonString = JSON.stringify(combinedData, null, 2);

        // Create a Blob from the JSON string
        const blob = new Blob([jsonString], { type: "application/json" });

        // Create an object URL for the Blob
        const url = URL.createObjectURL(blob);

        // Create a temporary anchor element
        const link = document.createElement("a");
        link.href = url;
        link.download = `${fileName}.json`;

        // Trigger the click and clean up
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // Release the object URL to free up memory
        URL.revokeObjectURL(url);
    };

    return (
        <AppShell bg={"background"} header={{ height: 60 }} aside={{ width: 400, breakpoint: "md", collapsed: { desktop: !desktopOpened, mobile: !mobileOpened } }}>
            <AppShellHeader bg={"background"}>
                <Group h="100%" px="md" justify="space-between">
                    <Avatar title="TAFSEEL" src={"../logo_light.png"} size={"md"} radius={"sm"} />
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
                <Button onClick={saveAnalysis}>Save analysis</Button>
            </Affix>
        </AppShell>
    );
}

export default App;
