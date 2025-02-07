import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Highlight from "@tiptap/extension-highlight";
import Underline from "@tiptap/extension-underline";
import Placeholder from "@tiptap/extension-placeholder";
import { RichTextEditor as MantineRichTextEditor } from "@mantine/tiptap";
import { errorRedColor } from "@/global/styles/app.css";
import { useDispatch } from "react-redux";
import { setFocusedInput } from "@/global/states/view.slice";
import { RootState } from "@/global/states/store";
import { useSelector } from "react-redux";
import { Text } from "@mantine/core";
import {
  errorFontSize,
  getRichTextEditorStyles,
} from "@/global/styles/global.styles";

interface RichTextEditorProps {
  form: any;
}

export function RichTextEditor({ form }: RichTextEditorProps) {
  const dispatch = useDispatch();
  const { focusedInput } = useSelector((state: RootState) => state.view);

  const placeholder = `What did you think about this package?`;

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Highlight,
      Placeholder.configure({ placeholder }),
    ],
    content: form.values.body || "",
    onUpdate: ({ editor }) => {
      form.setFieldValue("body", editor.getHTML());
    },
  });

  const handleFocus = (id: string) => dispatch(setFocusedInput(id));
  const handleBlur = () => dispatch(setFocusedInput(""));

  return (
    <>
      <MantineRichTextEditor
        editor={editor}
        styles={getRichTextEditorStyles(focusedInput === "body")}
        wrapperProps={{
          onFocus: () => handleFocus("body"),
          onBlur: handleBlur,
        }}
        key={form.key("body")}
        {...form.getInputProps("body")}>
        <MantineRichTextEditor.Toolbar sticky stickyOffset={60}>
          <MantineRichTextEditor.ControlsGroup>
            <MantineRichTextEditor.Bold />
            <MantineRichTextEditor.Italic />
            <MantineRichTextEditor.Underline />
            <MantineRichTextEditor.Strikethrough />
            <MantineRichTextEditor.Highlight />
            <MantineRichTextEditor.Code />
            <MantineRichTextEditor.ClearFormatting />
          </MantineRichTextEditor.ControlsGroup>

          <MantineRichTextEditor.ControlsGroup>
            <MantineRichTextEditor.Link />
            <MantineRichTextEditor.Unlink />
          </MantineRichTextEditor.ControlsGroup>

          <MantineRichTextEditor.ControlsGroup>
            <MantineRichTextEditor.Undo />
            <MantineRichTextEditor.Redo />
          </MantineRichTextEditor.ControlsGroup>
        </MantineRichTextEditor.Toolbar>

        <MantineRichTextEditor.Content />
      </MantineRichTextEditor>

      {form.errors.body && (
        <Text fz={errorFontSize} c={errorRedColor}>
          {form.errors.body}
        </Text>
      )}
    </>
  );
}
