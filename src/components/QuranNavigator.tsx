import { ActionIcon, Group, Select } from "@mantine/core";
import { IconArrowBadgeLeftFilled, IconArrowBadgeRightFilled, IconArrowNarrowLeft, IconArrowNarrowRight } from "@tabler/icons-react";
import { quran } from "@/utils/quranData";
import { useLocationStore } from "@/stores/useLocationStore";

export function DesktopQuranNavigator() {
    const surah = useLocationStore((s) => s.location.surah);
    const ayah = useLocationStore((s) => s.location.ayah);
    const setLocation = useLocationStore((s) => s.setLocation);
    return (
        <Group wrap="nowrap" visibleFrom="md" justify="center">
            <ActionIcon size="xl" variant="default" radius="sm" onClick={() => setLocation(Math.max(surah - 1, 1), 1)} c={"accent"}>
                <IconArrowBadgeLeftFilled />
            </ActionIcon>
            <ActionIcon size="xl" variant="default" radius="sm" onClick={() => setLocation(surah, Math.max(ayah - 1, 1))} c={"accent"}>
                <IconArrowNarrowLeft />
            </ActionIcon>

            <Select
                bd={"1px solid divider"}
                data={quran.map((surah: { name: string }, index: number) => ({
                    value: (index + 1).toString(),
                    label: `${index + 1} - ${surah.name}`,
                }))}
                value={surah.toString()}
                onChange={(value) => {
                    if (value) setLocation(parseInt(value), 1);
                }}
                w={"180px"}
                radius={0}
                size="md"
                styles={{
                    input: {
                        textAlign: "left",
                        fontSize: "1.5rem",
                    },
                }}
            />
            <Select
                bd={"1px solid divider"}
                data={quran[surah - 1].verses.map((verse) => ({
                    value: verse.id.toString(),
                    label: `${verse.id} - ${verse.text}`,
                }))}
                value={ayah.toString()}
                onChange={(value) => {
                    if (value) setLocation(surah, parseInt(value));
                }}
                radius={0}
                size="md"
                w={"180px"}
                styles={{
                    input: {
                        fontSize: "1.5rem",
                        paddingLeft: 50, // Add space for icon on left (RTL)
                        paddingRight: 50, // Add space for balance
                    },
                }}
            />

            <ActionIcon size="xl" variant="default" radius="sm" onClick={() => setLocation(surah, Math.min(ayah + 1, quran[surah - 1].verses.length))} c={"accent"}>
                <IconArrowNarrowRight />
            </ActionIcon>
            <ActionIcon size="xl" variant="default" radius="sm" onClick={() => setLocation(Math.min(surah + 1, quran.length), 1)} c={"accent"}>
                <IconArrowBadgeRightFilled />
            </ActionIcon>
        </Group>
    );
}

export function MobileQuranNavigator() {
    const surah = useLocationStore((s) => s.location.surah);
    const ayah = useLocationStore((s) => s.location.ayah);
    const setLocation = useLocationStore((s) => s.setLocation);
    return (
        <Group hiddenFrom="md" justify="center">
            <Select
                bd={"1px solid divider"}
                checkIconPosition="right"
                data={quran.map((_, index: number) => ({
                    value: (index + 1).toString(),
                    label: `${index + 1}`,
                }))}
                value={surah.toString()}
                onChange={(value) => {
                    if (value) setLocation(parseInt(value), 1);
                }}
                size="xs"
                comboboxProps={{ width: "fit-content" }}
                w={"80px"}
                styles={{
                    input: {
                        textAlign: "left",
                        fontSize: "1.5rem",
                    },
                }}
            />
            <Select
                bd={"1px solid divider"}
                checkIconPosition="right"
                data={quran[surah - 1].verses.map((verse) => ({
                    value: verse.id.toString(),
                    label: `${verse.id}`,
                }))}
                value={ayah.toString()}
                onChange={(value) => {
                    if (value) setLocation(surah, parseInt(value));
                }}
                size="xs"
                comboboxProps={{ width: "fit-content" }}
                w={"80px"}
                styles={{
                    input: {
                        textAlign: "left",
                        fontSize: "1.5rem",
                    },
                }}
            />
        </Group>
    );
}
