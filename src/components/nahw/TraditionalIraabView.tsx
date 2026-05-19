import { Card, CardSection, Divider, Stack, Textarea, Text } from "@mantine/core";
import type { Word } from "@/types/quran";
import PanelHeading from "@/components/PanelHeading";
import { useLocationStore } from "@/stores/useLocationStore";
import { useNahwStore } from "@/stores/useNahwStore";
import { useEffect } from "react";
import { useShallow } from "zustand/react/shallow";

export default function TraditionalIraabView({ words }: { words: Word[] }) {
    const location = useLocationStore((s) => s.location);

    //https://www.reddit.com/r/reactjs/comments/1jz5m7i/i_am_stuck_in_this_wierd_zustand_bug_which_is/
    const iraab = useNahwStore(useShallow((s) => s.getIraab()));
    const saveIraabItem = useNahwStore((s) => s.saveIraabItem);
    useEffect(() => {
        if (iraab.length === 0 && words.length > 0) {
            words.forEach((word, i) => saveIraabItem({ id: i, word: word.word, text: "" }));
        }
    }, [iraab.length, words, location, saveIraabItem]);
    return (
        <Stack p={20} style={{ overflowY: "auto", height: "100%" }}>
            <PanelHeading title="الإعراب" id={3} />
            <Divider />
            <Stack>
                {[...iraab].reverse().map((word) => {
                    return (
                        <Card key={word.id} dir="rtl" p={20} bg={"none"}>
                            <CardSection display={"flex"}>
                                <Text size="xs" pr={5} pl={5} pt={10}>
                                    {word.word}:
                                </Text>

                                <Textarea onChange={(e) => saveIraabItem({ ...word, text: e.target.value })} value={word.text} />
                            </CardSection>
                        </Card>
                    );
                })}
            </Stack>
        </Stack>
    );
}
