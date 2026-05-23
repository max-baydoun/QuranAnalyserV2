import { Link, RichTextEditor } from "@mantine/tiptap";
import { useEditor } from "@tiptap/react";
import "@mantine/tiptap/styles.css";
import Highlight from "@tiptap/extension-highlight";
import Underline from "@tiptap/extension-underline";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import Superscript from "@tiptap/extension-superscript";
import SubScript from "@tiptap/extension-subscript";
import { Box } from "@mantine/core";
import { useEffect } from "react";
import { useCommentsStore } from "@/stores/useCommentsStore";
import { useLocationStore } from "@/stores/useLocationStore";
import { makeQuranicKey } from "@/stores/useNahwStore";

function Comments() {
    const location = useLocationStore((s) => s.location);
    const comment = useCommentsStore((state) => state.data[makeQuranicKey(location)] ?? "");
    const saveComment = useCommentsStore((state) => state.saveComment);
    const editor = useEditor({
        extensions: [StarterKit, Underline, Link, Superscript, SubScript, Highlight, TextAlign.configure({ types: ["heading", "paragraph"] })],
        content: comment,
        onUpdate: ({ editor }) => saveComment(editor.getHTML()),
    });

    useEffect(() => {
        if (!editor) return;
        const currentHtml = editor.getHTML();
        if (currentHtml !== comment) {
            editor.commands.setContent(comment);
        }
    }, [comment, editor]);

    return (
        <Box p={10}>
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
        </Box>
    );
}

export default Comments;
