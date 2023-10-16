import React from 'react';
import { Text, Card, Image, Group } from '@mantine/core';
import { Spoiler } from '@mantine/core';
import './NoteCard.css';
import { NoteCardType } from '@/constants/cardData';

export default function NoteCard({ imageSrc, title, description, linkURL }: NoteCardType) {
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

      <Spoiler maxHeight={30} showLabel="Show more" hideLabel="Hide">
        {description}
      </Spoiler>
    </Card>
  );
}
