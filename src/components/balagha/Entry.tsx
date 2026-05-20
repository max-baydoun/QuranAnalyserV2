import { ActionIcon, Group, Stack, Title } from "@mantine/core";
import "@mantine/tiptap/styles.css";
import { RichTextEditor, Link } from "@mantine/tiptap";
import { useEditor } from "@tiptap/react";
import Highlight from "@tiptap/extension-highlight";
import Underline from "@tiptap/extension-underline";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import Superscript from "@tiptap/extension-superscript";
import SubScript from "@tiptap/extension-subscript";
import { IconX } from "@tabler/icons-react";
import type { BalaghaState } from "@/types/balagha";

export default function Entry({ entryData, handleClick }: { entryData: BalaghaState; handleClick: (type: "save" | "delete", entry: BalaghaState) => void }) {
    const editor = useEditor({
        extensions: [StarterKit, Underline, Link, Superscript, SubScript, Highlight, TextAlign.configure({ types: ["heading", "paragraph"] })],
        content: entryData.text,
        onUpdate: ({ editor }) => handleClick("save", { ...entryData, text: editor.getHTML() }),
    });
    return (
        <Stack ta={"right"}>
            <Group style={{ display: "flex", alignItems: "center" }} dir="rtl">
                <Title>{entryData.device}</Title>
                <ActionIcon c={"accent"} onClick={() => handleClick("delete", entryData)}>
                    <IconX />
                </ActionIcon>
            </Group>
            <RichTextEditor editor={editor} variant="subtle">
                <RichTextEditor.Toolbar bg={"graphBackground"}>
                    <RichTextEditor.ControlsGroup>
                        <RichTextEditor.Bold />
                        <RichTextEditor.Italic />
                        <RichTextEditor.Underline />
                        <RichTextEditor.Strikethrough />
                        <RichTextEditor.ClearFormatting />
                        <RichTextEditor.Highlight />
                    </RichTextEditor.ControlsGroup>

                    <RichTextEditor.ControlsGroup>
                        <RichTextEditor.H1 />
                        <RichTextEditor.H2 />
                        <RichTextEditor.H3 />
                        <RichTextEditor.H4 />
                    </RichTextEditor.ControlsGroup>

                    <RichTextEditor.ControlsGroup>
                        <RichTextEditor.Blockquote />
                        <RichTextEditor.Hr />
                        <RichTextEditor.BulletList />
                        <RichTextEditor.OrderedList />
                    </RichTextEditor.ControlsGroup>

                    <RichTextEditor.ControlsGroup>
                        <RichTextEditor.AlignLeft />
                        <RichTextEditor.AlignCenter />
                        <RichTextEditor.AlignJustify />
                        <RichTextEditor.AlignRight />
                    </RichTextEditor.ControlsGroup>

                    <RichTextEditor.ControlsGroup>
                        <RichTextEditor.Undo />
                        <RichTextEditor.Redo />
                    </RichTextEditor.ControlsGroup>
                </RichTextEditor.Toolbar>

                <RichTextEditor.Content />
            </RichTextEditor>
        </Stack>
    );
}
