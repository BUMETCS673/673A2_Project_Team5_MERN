import React from 'react';
import { Text, Card, Image, Group, Button, Modal } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import './NoteCard.css';
import { NoteCardType } from '@/constants/cardData';

export default function NoteCard({ imageSrc, title, description, linkURL }: NoteCardType) {
  const [modalOpened, { open, close }] = useDisclosure(false);
  const handleDoubleClick = () => {
    if (linkURL) {
      window.open(linkURL, '_blank');
    }
  };

  return (
    <Card onDoubleClick={handleDoubleClick} shadow="xs" padding="xs" radius="md" withBorder>
      <Card.Section>
        <Image src={imageSrc} height={160} alt={title} />
      </Card.Section>

      <Group justify="space-between" mt="md" mb="xs">
        <Text fw={500}>{title}</Text>
      </Group>

      {/* <Spoiler maxHeight={30} showLabel="Show more" hideLabel="Hide">
        {description}
      </Spoiler> */}
      <div id="button-father">
        <Button id="big-button-modal" radius="xl" onClick={open}>
          Show Summary
        </Button>
      </div>

      <Modal opened={modalOpened} onClose={close} title={<h2>Summary</h2>} centered>
        {description}
      </Modal>
    </Card>
  );
}
