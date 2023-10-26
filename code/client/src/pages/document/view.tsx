import React from 'react';
import { RichTextEditor, Link } from '@mantine/tiptap';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import './view.css';
import Highlight from '@tiptap/extension-highlight';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Superscript from '@tiptap/extension-superscript';
import SubScript from '@tiptap/extension-subscript';
import {
  BackgroundImage,
  Card,
  Text,
  Button,
  Group,
  Box,
  ActionIcon,
  rem,
  Tooltip,
  CopyButton,
  List,
  ScrollArea,
} from '@mantine/core';
import { IconArrowLeft, IconCheck, IconDeviceFloppy } from '@tabler/icons-react';
import { useClipboard } from '@mantine/hooks';

const content =
  '<h2 style="text-align: center;">Welcome to Mantine rich text editor</h2><p><code>RichTextEditor</code> component focuses on usability and is designed to be as simple as possible to bring a familiar editing experience to regular users. <code>RichTextEditor</code> is based on <a href="https://tiptap.dev/" rel="noopener noreferrer" target="_blank">Tiptap.dev</a> and supports all of its features:</p><ul><li>General text formatting: <strong>bold</strong>, <em>italic</em>, <u>underline</u>, <s>strike-through</s> </li><li>Headings (h1-h6)</li><li>Sub and super scripts (<sup>&lt;sup /&gt;</sup> and <sub>&lt;sub /&gt;</sub> tags)</li><li>Ordered and bullet lists</li><li>Text align&nbsp;</li><li>And all <a href="https://tiptap.dev/extensions" target="_blank" rel="noopener noreferrer">other extensions</a></li></ul>';

export default function DocumentView() {
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
    content,
  });

  const docSaved = false;
  const afterGen = false;

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
                  <RichTextEditor.Content />
                </ScrollArea>
              </RichTextEditor>
            </div>
            <div>
              <Button
                className="savebutton"
                variant="filled"
                rightSection={
                  docSaved ? (
                    <IconCheck style={{ width: rem(20), height: rem(20) }} stroke={1.5} />
                  ) : (
                    <IconDeviceFloppy style={{ width: rem(20), height: rem(20) }} stroke={1.5} />
                  )
                }
                color={docSaved ? 'teal' : 'blue'}
                // onClick={}
                radius="xl"
                size="md"
              >
                {docSaved ? 'Saved!' : 'Save'}
              </Button>
            </div>
          </div>
          <div className="summary">
            {afterGen ? (
              <Card className="summary-card" padding="lg" radius="sm" withBorder>
                <div>
                  <ScrollArea h={700}>
                    <List size="md">
                      <List.Item>Clone or download repository from GitHub</List.Item>
                      <List.Item>Install dependencies with yarn</List.Item>
                      <List.Item>To start development server run npm start command</List.Item>
                      <List.Item>
                        Run tests to make sure your changes do not break the build
                      </List.Item>
                      <List.Item>Submit a pull request once you are done</List.Item>
                      <List.Item>Clone or download repository from GitHub</List.Item>
                      <List.Item>Install dependencies with yarn</List.Item>
                      <List.Item>To start development server run npm start command</List.Item>
                      <List.Item>
                        Run tests to make sure your changes do not break the build
                      </List.Item>
                      <List.Item>Submit a pull request once you are done</List.Item>
                      <List.Item>Clone or download repository from GitHub</List.Item>
                      <List.Item>Install dependencies with yarn</List.Item>
                      <List.Item>To start development server run npm start command</List.Item>
                      <List.Item>
                        Run tests to make sure your changes do not break the build
                      </List.Item>
                      <List.Item>Submit a pull request once you are done</List.Item>
                      <List.Item>Clone or download repository from GitHub</List.Item>
                      <List.Item>Install dependencies with yarn</List.Item>
                      <List.Item>To start development server run npm start command</List.Item>
                      <List.Item>
                        Run tests to make sure your changes do not break the build
                      </List.Item>
                      <List.Item>Submit a pull request once you are done</List.Item>
                    </List>
                  </ScrollArea>
                </div>
                <Button
                  className="generate-button"
                  variant="light"
                  color="blue"
                  fullWidth
                  mt="md"
                  radius="md"
                >
                  Generate
                </Button>
              </Card>
            ) : (
              <Card className="summary-card" padding="lg" radius="md" withBorder>
                <div>
                  <Text className="tip-head" fw={500}>
                    Tips to generate your summary!
                  </Text>
                  <Text size="sm" c="dimmed">
                    Use AI to boost your study!
                  </Text>
                </div>

                <Button
                  className="generate-button"
                  variant="light"
                  color="blue"
                  fullWidth
                  mt="md"
                  radius="md"
                >
                  Generate
                </Button>
              </Card>
            )}
          </div>
        </div>
      </ScrollArea>
    </>
  );
}
