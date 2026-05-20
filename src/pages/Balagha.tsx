import Entry from "@/components/balagha/Entry";
import PanelHeading from "@/components/PanelHeading";
import { DEVICES } from "@/constants/balaghaConstants";
import { useBalaghaStore } from "@/stores/useBalaghaStore";
import type { BalaghaState } from "@/types/balagha";
import { Button, Divider, Group, Stack, Text, Title, Tooltip } from "@mantine/core";

export default function Balagha() {
    const entries = useBalaghaStore().getBalagha();
    const { saveEntry, deleteEntry } = useBalaghaStore();

    const handleClick = (type: "save" | "delete", entry: BalaghaState) => {
        type === "save" ? saveEntry(entry) : deleteEntry(entry);
    };

    const generateButtons = Object.keys(DEVICES).map((science) => (
        <Stack ta="center" key={science}>
            <Title>{science}</Title>
            <Group justify="center">
                {Object.keys(DEVICES[science]).map((device) => {
                    const english = DEVICES[science][device];
                    return (
                        <Tooltip label={english} key={device}>
                            <Button h="fit-content" bg="secondary" variant="outline" p={10} onClick={() => handleClick("save", { id: entries.length, device: device, text: "" })}>
                                <Text>{device}</Text>
                            </Button>
                        </Tooltip>
                    );
                })}
            </Group>
        </Stack>
    ));

    return (
        <Stack p={20} h={"80vh"} style={{ overflow: "auto" }}>
            <PanelHeading title="بلاغة الأية" id={5} />
            <Divider />
            <Stack>{generateButtons}</Stack>
            <Divider />
            <Stack h="100%">
                {entries.map((entry, key) => (
                    <Entry key={key} entryData={entry} handleClick={handleClick} />
                ))}
            </Stack>
        </Stack>
    );
}
