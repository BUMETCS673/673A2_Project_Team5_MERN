import React from 'react';
import { Text, Card, Image, Group, Button, Modal, ActionIcon } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import './NoteCard.css';
import { NoteCardType } from '@/constants/cardData';
import { IconTrash } from '@tabler/icons-react';
import { IconAlertCircleFilled } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';

export default function NoteCard({
  imageSrc,
  title,
  userId,
  description,
  linkURL,
  _id,
  onCardDelete,
}: NoteCardType) {
  const navigate = useNavigate();
  const [modalOpened, control1] = useDisclosure(false); //this modal is for summary
  const [modalOpenedDelete, control2] = useDisclosure(false); //this modal is for delete

  const handleDoubleClick = (docId: number) => {
    if (linkURL) {
      navigate(`/document/${docId}`);
    }
  };

  return (
    <Card
      onDoubleClick={() => handleDoubleClick(_id)}
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
          id="big-button-modal"
          variant="light"
          radius="md"
          onClick={control1.open}
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
          onClick={control2.open}
        >
          <IconTrash style={{ width: '80%', height: '80%' }} stroke={1.5} />
        </ActionIcon>
      </div>

      <Modal opened={modalOpened} onClose={control1.close} title={<h2>Summary</h2>} centered>
        {description}
      </Modal>
      <Modal
        id="delete-modal"
        opened={modalOpenedDelete}
        onClose={control2.close}
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
            onClick={control2.close}
            style={{ margin: '10px' }}
          >
            Cancel
          </Button>
          <Button
            id="delete_confirm"
            variant="filled"
            color="red"
            onClick={onCardDelete}
            style={{ margin: '10px' }}
          >
            Delete
          </Button>
        </div>
      </Modal>
    </Card>
  );
}
