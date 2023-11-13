import React, { useEffect, useState } from 'react';
import { RichTextEditor, Link } from '@mantine/tiptap';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Highlight from '@tiptap/extension-highlight';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Superscript from '@tiptap/extension-superscript';
import SubScript from '@tiptap/extension-subscript';
import { Button, ScrollArea } from '@mantine/core';

interface DocumentEditorProps {
  content: string;
  onSaveClick: (contentData: string) => void;
}

export const DocumentEditor = ({ content, onSaveClick }: DocumentEditorProps) => {
  const [docContent, setDocContent] = useState<string>(content);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link,
      Superscript,
      SubScript,
      Highlight,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
    ],
    content: docContent,
    onUpdate({ editor }) {
      setDocContent(editor.getText());
    },
  });

  useEffect(() => {
    editor?.commands.setContent(docContent);
  }, [docContent]);

  return (
    <>
      <div>
        <RichTextEditor editor={editor} style={{ width: '800px' }}>
          <RichTextEditor.Toolbar sticky stickyOffset={1}>
            <RichTextEditor.ControlsGroup>
              <RichTextEditor.Bold />
              <RichTextEditor.Italic />
              <RichTextEditor.Underline />
              <RichTextEditor.Strikethrough />
              <RichTextEditor.ClearFormatting />
              <RichTextEditor.Highlight />
              <RichTextEditor.Code />
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
              <RichTextEditor.Subscript />
              <RichTextEditor.Superscript />
            </RichTextEditor.ControlsGroup>

            <RichTextEditor.ControlsGroup>
              <RichTextEditor.Link />
              <RichTextEditor.Unlink />
            </RichTextEditor.ControlsGroup>

            <RichTextEditor.ControlsGroup>
              <RichTextEditor.AlignLeft />
              <RichTextEditor.AlignCenter />
              <RichTextEditor.AlignJustify />
              <RichTextEditor.AlignRight />
            </RichTextEditor.ControlsGroup>
          </RichTextEditor.Toolbar>

          <ScrollArea h={700}>
            {/* updateContentError{updateContentError} ? () */}
            <RichTextEditor.Content />
          </ScrollArea>
        </RichTextEditor>
      </div>
      <div>
        <Button
          // loading={updateContentLoading}
          className="savebutton"
          variant="filled"
          disabled={docContent === ''}
          // rightSection={
          //   updateContentFinished ? (
          //     <IconCheck style={{ width: rem(20), height: rem(20) }} stroke={1.5} />
          //   ) : (
          //     <IconDeviceFloppy style={{ width: rem(20), height: rem(20) }} stroke={1.5} />
          //   )
          // }
          // color={updateContentFinished ? 'teal' : 'blue'}
          radius="xl"
          size="md"
          onClick={() => onSaveClick(docContent)}
        >
          {/* {updateContentFinished === false ? 'Saved!' : 'Save'} */}
          Save
        </Button>
      </div>
    </>
  );
};
