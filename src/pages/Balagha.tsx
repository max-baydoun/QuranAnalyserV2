import Entry from "@/components/balagha/Entry";
import PanelHeading from "@/components/PanelHeading";
import { Button, Divider, Group, Stack, Text, Title, Tooltip } from "@mantine/core";
import { useState } from "react";

const devices: Record<string, Record<string, string>> = {
    "علم البيان": {
        التشبية: "Simile: explicit comparison, often using a tool of comparison (like “as/like”).",
        الاستعارة: "Metaphor: describing something using language that belongs to something else, without an explicit “like/as”.",
        المجاز: "Figurative usage: a word/phrase used away from its literal meaning because context indicates a related, intended meaning.",
        الكناية: "Indirect expression (allusion): conveying a meaning through a hint or implication without stating it directly.",
    },
    "علم المعاني": {
        "الخبر والإنشاء": "Declarative vs. performative speech: whether wording is informational (statement) or doing an act (command, question, request, wish, prohibition).",
        الإيجاز: "Brevity/conciseness: packing rich meaning into few words for impact and memorability.",
        الإطناب: "Purposeful elaboration: adding wording for emphasis, clarity, reinforcement, or emotional/rhetorical effect.",
        "التقديم والتأير": "Fronting and postponement (word order shift): changing the usual order to create emphasis, focus, restriction, or rhythm.",
    },
    "علم البديع": {
        الجناس: "Paronomasia/wordplay: similar-sounding words with different meanings (or close letter patterns) to add beauty and punch.",
        السجع: "Rhymed prose: similar end-sounds across phrases/sentences (prose rhyme) for rhythm and elegance.",
        "الطباق والمقابلة": "Antithesis and contrast: bringing opposites (or sets of contrasting ideas) together to sharpen meaning and emphasis.",
        "أسلوب الحكيم": "“Wise redirection”: responding by steering to what matters more, correcting the premise, or answering more deeply than expected.",
        التهكم: "Irony/sarcasm: wording that appears positive/neutral on the surface but is intended as criticism, exposure, or warning.",
    },
};

export type BalaghaState = {
    id: number;
    device: string;
    text: string;
};

export default function Balagha() {
    const [entries, setEntries] = useState<BalaghaState[]>([]);

    const handleButtonClick = (device: string) => {
        setEntries((prev) => {
            return [...prev, { id: entries.length, device: device, text: "" }];
        });
    };

    const generateButtons = () => {
        const menus = Object.keys(devices).map((science) => (
            <Stack ta="center" key={science}>
                <Title>{science}</Title>
                <Group justify="center">
                    {Object.keys(devices[science]).map((device) => {
                        const english = devices[science][device];
                        return (
                            <Tooltip label={english} key={device}>
                                <Button h="fit-content" bg="secondary" variant="outline" p={10} onClick={() => handleButtonClick(device)}>
                                    <Text>{device}</Text>
                                </Button>
                            </Tooltip>
                        );
                    })}
                </Group>
            </Stack>
        ));
        return menus;
    };

    const updateText = (id: number, newText: string) => {
        setEntries((prevs) =>
            prevs.map(
                (entry) =>
                    entry.id === id
                        ? { ...entry, text: newText } // Create a new, updated object
                        : entry, // Return the original object if it's not the one
            ),
        );
    };

    const deleteEntry = (id: number) => {
        setEntries((prevs) => prevs.filter((prev) => prev.id !== id));
    };

    return (
        <Stack p={20} h={"80vh"} style={{ overflow: "auto" }}>
            <PanelHeading title="بلاغة الأية" id={5} />
            <Divider />
            <Stack>{generateButtons()}</Stack>
            <Divider />
            <Stack h="100%">
                {entries.map((entry, key) => {
                    return <Entry key={key} entryData={entry} updateText={updateText} deleteEntry={deleteEntry} />;
                })}
            </Stack>
        </Stack>
    );
}
