import React from 'react';
import {
  Text,
  Card,
  Image,
  Group,
  Button,
  Modal,
  ActionIcon,
  List,
  ScrollArea,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import './NoteCard.css';
import { NoteCardType } from '@/constants/cardData';
import { IconTrash } from '@tabler/icons-react';
import { IconAlertCircleFilled } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { listSummary } from '../functions/parsers';

export default function NoteCard({
  title,
  document_id,
  summary,
  imageSrc,
  onCardDelete,
}: NoteCardType) {
  const navigate = useNavigate();
  const [modalOpened, { open: openSummaryModal, close: closeSummaryModal }] = useDisclosure(false); //this modal is for summary
  const [modalOpenedDelete, { open: openDeleteModal, close: closeDeleteModal }] =
    useDisclosure(false); //this modal is for delete

  const handleDoubleClick = (docId: string) => {
    if (docId) {
      navigate(`/document/${docId}`);
    }
  };

  const handleDelete = () => {
    onCardDelete();
    closeDeleteModal();
  };

  const summaryList = listSummary(summary);

  return (
    <Card
      id="general-card"
      onDoubleClick={() => handleDoubleClick(document_id)}
      shadow="xs"
      padding="xs"
      radius="md"
      withBorder
    >
      <Card.Section>
        <Image src={imageSrc} height={160} alt={title} />
      </Card.Section>

      <Group justify="space-between" mt="md" mb="xs">
        <Text fw={500}>{title}</Text>
      </Group>

      <div id="button-father">
        <Button
          id="big-button-summary"
          variant="light"
          radius="md"
          onClick={openSummaryModal}
          style={{ width: '120%' }}
        >
          Show Summary
        </Button>
        <ActionIcon
          id="action-icon"
          variant="light"
          color="red"
          size="lg"
          radius="md"
          aria-label="Settings"
          onClick={openDeleteModal}
        >
          <IconTrash id="delete" style={{ width: '80%', height: '80%' }} stroke={1.5} />
        </ActionIcon>
      </div>

      <Modal
        id="summary-modal"
        opened={modalOpened}
        onClose={closeSummaryModal}
        title={<h2>Summary</h2>}
        centered
      >
        <List size="md">
          {summaryList.map((summary: string) => (
            <List.Item>{summary}</List.Item>
          ))}
        </List>
      </Modal>
      <Modal
        id="delete-modal"
        opened={modalOpenedDelete}
        onClose={closeDeleteModal}
        withCloseButton={false}
        centered
      >
        <div id="modal-head">
          <IconAlertCircleFilled
            style={{ width: '11%', height: '11%', color: '#FA5252' }}
            stroke={1.5}
          />
          <h3 style={{ marginLeft: '20px', display: 'flex', alignItems: 'center' }}>
            Delete Document
          </h3>
        </div>
        <div
          style={{
            fontSize: '15px',
            color: 'grey',
            width: '100%',
            paddingLeft: '64.88px',
            paddingRight: '30px',
            textAlign: 'justify',
          }}
        >
          Are you sure you want to delete your document？ All of your data will be permanently
          removed from our servers forever. This action cannot be undone.
        </div>
        <div id="yes_no">
          <Button
            id="delete_confirm"
            variant="light"
            color="rgba(0, 0, 0, 1)"
            onClick={closeDeleteModal}
            style={{ margin: '10px' }}
          >
            Cancel
          </Button>
          <Button
            id="delete_confirm"
            variant="filled"
            color="red"
            onClick={handleDelete}
            style={{ margin: '10px' }}
          >
            Delete
          </Button>
        </div>
      </Modal>
    </Card>
  );
}
