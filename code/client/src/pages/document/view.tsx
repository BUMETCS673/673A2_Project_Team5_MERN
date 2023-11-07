import React, { useEffect, useState } from 'react';
import { RichTextEditor, Link } from '@mantine/tiptap';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import './view.css';
import Highlight from '@tiptap/extension-highlight';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Superscript from '@tiptap/extension-superscript';
import SubScript from '@tiptap/extension-subscript';
import { Card, Text, Button, rem, List, ScrollArea } from '@mantine/core';
import { IconArrowLeft, IconCheck, IconDeviceFloppy } from '@tabler/icons-react';
// import { useClipboard } from '@mantine/hooks';

interface DocumentViewProps {
  contentData: string;
  summaryData: string;
  onPageLoading: boolean;
  onPageError: boolean;
  updateContentLoading: boolean;
  updateContentError: boolean;
  updateContentFinished: boolean;
  updateSummaryLoading: boolean;
  updateSummaryError: boolean;
  updateSummaryFinished: boolean;
  onSaveClick: ({
    userId,
    documentId,
    contentData,
  }: {
    userId: string;
    documentId: string;
    contentData: string;
  }) => void;
  onGenerateClick: ({ userId, documentId }: { userId: string; documentId: string }) => void;
}

export default function DocumentView({
  contentData,
  summaryData,
  onPageLoading,
  onPageError,
  updateContentLoading,
  updateContentError,
  updateContentFinished,
  updateSummaryLoading,
  updateSummaryError,
  updateSummaryFinished,
  onSaveClick,
  onGenerateClick,
}: DocumentViewProps) {
  const [docContent, setDocContent] = useState<string>(contentData);

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
    content: contentData,
    onUpdate({ editor }) {
      setDocContent(editor.getText());
    },
  });

  useEffect(() => {
    editor?.commands.setContent(contentData);
  }, [contentData]);

  return (
    <>
      <div>
        <Button
          variant="transparent"
          leftSection={<IconArrowLeft style={{ width: rem(20), height: rem(20) }} stroke={1.5} />}
          radius="xl"
          size="md"
        >
          Back
        </Button>
        <div className="doc-title">DocumentTitle</div>
      </div>

      <ScrollArea w={1548}>
        <div className="layout">
          <div className="document-editor">
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
                loading={updateContentLoading}
                className="savebutton"
                variant="filled"
                disabled={docContent === ''}
                rightSection={
                  updateContentFinished ? (
                    <IconCheck style={{ width: rem(20), height: rem(20) }} stroke={1.5} />
                  ) : (
                    <IconDeviceFloppy style={{ width: rem(20), height: rem(20) }} stroke={1.5} />
                  )
                }
                color={updateContentFinished ? 'teal' : 'blue'}
                radius="xl"
                size="md"
                onClick={() => onSaveClick({ userId: '', documentId: '', contentData: docContent })}
              >
                {updateContentFinished === false ? 'Saved!' : 'Save'}
              </Button>
            </div>
          </div>
          <div className="summary">
            <Card className="summary-card" padding="lg" radius="sm" withBorder>
              {summaryData ? (
                <div>
                <ScrollArea h={700}>
                  <List size="md">
                    {summaryData}
                  </List>
                </ScrollArea>
              </div>
              ) : (
                <div>
                  <Text className="tip-head" fw={500}>
                    Tips to generate your summary!
                  </Text>
                  <Text size="sm" c="dimmed">
                    Use AI to boost your study!
                  </Text>
                </div>
              )}
              <Button
                className="generate-button"
                variant="light"
                color="blue"
                loading={updateSummaryLoading}
                disabled={docContent === ''}
                fullWidth
                mt="md"
                radius="md"
                onClick={() => onGenerateClick({ userId: '', documentId: '' })}
              >
                {updateSummaryFinished === false ? 'Generate New!' : 'Generate'}
              </Button>
            </Card>
          </div>
        </div>
      </ScrollArea>
    </>
  );
}
