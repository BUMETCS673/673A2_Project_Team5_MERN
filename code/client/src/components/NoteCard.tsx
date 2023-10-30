import React, { useCallback, useState } from 'react';
import { Text, Card, Image, Group, Button, Modal } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import './NoteCard.css';
import { NoteCardType } from '@/constants/cardData';
import axios from 'axios';

export default function NoteCard({
  imageSrc,
  title,
  description,
  linkURL,
  _id,
  onCardDelete,
}: NoteCardType) {
  const [modalOpened, control1] = useDisclosure(false); //this modal is for summary
  const [modalOpened_delete, control2] = useDisclosure(false); //this modal is for delete
  const [isLoading = 'Loading..', setLoading] = useState(false);
  const [error = 'error occur', setError] = useState(false);

  const handleDoubleClick = () => {
    if (linkURL) {
      window.open(linkURL, '_blank');
    }
  };

  //delete card

  const handleDelete = useCallback(() => {
    isLoading;
    setLoading(true);
    axios
      .delete('http://localhost:8000/user/delete-doc')
      .then((response) => {
        if (response.status === 200) {
          // delete successful 200
          onCardDelete;
          control2.close();
        } else {
          console.error(error);
          setError(true);
        }
      })
      .catch((err) => {
        // delete
        console.error(err.message || 'error occur during delete');
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [onCardDelete]);

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
        <Button id="big-button-modal" radius="xl" onClick={control1.open}>
          Show Summary
        </Button>
        <Button id="delete" radius="xl" onClick={control2.open}>
          Delete
        </Button>
      </div>

      <Modal opened={modalOpened} onClose={control1.close} title={<h2>Summary</h2>} centered>
        {description}
      </Modal>
      <Modal
        opened={modalOpened_delete}
        onClose={control2.close}
        title={<h2>Delete your document?</h2>}
        centered
      >
        <Button id="delete_confirm" radius="xl" onClick={handleDelete}>
          Yes
        </Button>
        <Button id="delete_confirm" radius="xl" onClick={control2.close}>
          No
        </Button>
      </Modal>
    </Card>
  );
}
