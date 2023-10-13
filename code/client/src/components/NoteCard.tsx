import React from 'react';
import { Text, Card, Image, Group } from '@mantine/core';
import './NoteCard.css';

export interface NoteCardProps {
  imageSrc: string;
  title: string;
  description: string;
  linkURL: string;
}

export default function NoteCard({ imageSrc, title, description, linkURL }: NoteCardProps) {
  //const [searchTerm, setSearchTerm] = useState(''); // for search box

  const handleDoubleClick = () => {
    if (linkURL) {
      window.open(linkURL, '_blank');
    }
  };

  return (
    <Card onDoubleClick={handleDoubleClick} shadow="xs" padding="xs" radius="md" withBorder>
      <Card.Section>
        <Image src={imageSrc} height={140} alt={title} />
      </Card.Section>

      <Group justify="space-between" mt="md" mb="xs">
        <Text fw={500}>{title}</Text>
      </Group>

      <Text size="sm" c="dimmed">
        {description}
      </Text>
    </Card>
  );
}
