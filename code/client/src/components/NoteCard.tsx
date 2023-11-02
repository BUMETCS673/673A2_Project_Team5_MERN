import React, { useCallback, useState } from 'react';
import { Text, Card, Image, Group, Button, Modal, ActionIcon } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import './NoteCard.css';
import { NoteCardType } from '@/constants/cardData';
import { IconTrash } from '@tabler/icons-react';

export default function NoteCard({
  imageSrc,
  title,
  description,
  linkURL,
  _id,
  onCardDelete,
}: NoteCardType) {
  const [modalOpened, control1] = useDisclosure(false); //this modal is for summary
  const [modalOpenedDelete, control2] = useDisclosure(false); //this modal is for delete

  const handleDoubleClick = () => {
    if (linkURL) {
      window.open('/document');
    }
  };

  // const handleDelete = async () => {
  //   onCardDelete;
  // };
  return (
    <Card onDoubleClick={handleDoubleClick} shadow="xs" padding="xs" radius="md" withBorder>
      <Card.Section>
        <Image src={imageSrc} height={160} alt={title} />
      </Card.Section>

      <Group justify="space-between" mt="md" mb="xs">
        <Text fw={500}>
          {title}
          {_id}
        </Text>
      </Group>

      {/* <Spoiler maxHeight={30} showLabel="Show more" hideLabel="Hide">
        {description}
      </Spoiler> */}
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
        title={<h4>Delete Document</h4>}
      >
        Are you sure you want delete your document??
        <div id="yes_no">
          <Button
            id="delete_confirm"
            variant="filled"
            color="rgba(191, 191, 191, 1)"
            onClick={control2.close}
          >
            Cancel
          </Button>
          <Button id="delete_confirm" variant="filled" color="red" onClick={onCardDelete}>
            Delete
          </Button>
        </div>
      </Modal>
    </Card>
  );
}
