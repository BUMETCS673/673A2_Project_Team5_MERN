import React, { useState } from 'react'; // import useState
import { NoteCardProps } from '@/components/NoteCard';
import HomeView from './view';

export default function Home() {
  const cardData: NoteCardProps[] = [
    {
      imageSrc: 'https://example.com/image1.jpg',
      title: 'Card 1',
      description: 'Description for Card 1',
      linkURL: 'https://www.google.com/',
    },
    {
      imageSrc: 'https://example.com/image1.jpg',
      title: 'Card 1',
      description: 'Description for Card 1',
      linkURL: 'https://www.google.com/',
    },
    {
      imageSrc: 'https://example.com/image1.jpg',
      title: 'Card 1',
      description: 'Description for Card 1',
      linkURL: 'https://www.google.com/',
    },
    {
      imageSrc: 'https://example.com/image1.jpg',
      title: 'Card 1',
      description: 'Description for Card 1',
      linkURL: 'https://www.google.com/',
    },
    {
      imageSrc: 'https://example.com/image1.jpg',
      title: 'Card 1',
      description: 'Description for Card 1',
      linkURL: 'https://www.google.com/',
    },
    {
      imageSrc: 'https://example.com/image1.jpg',
      title: 'Card 1',
      description: 'Description for Card 1',
      linkURL: 'https://www.google.com/',
    },
    {
      imageSrc: 'https://example.com/image1.jpg',
      title: 'Card 1',
      description: 'Description for Card 1',
      linkURL: 'https://www.google.com/',
    },
    {
      imageSrc: 'https://example.com/image1.jpg',
      title: 'Card 1',
      description: 'Description for Card 1',
      linkURL: 'https://www.google.com/',
    },
    // Card Data, how to connect to backend
  ];

  const [burgerOpened, setBurgerOpened] = useState(false);

  // Toggle function for burger
  const toggleBurger = () => {
    setBurgerOpened(!burgerOpened);
  };

  return <HomeView cardData={cardData} burgerOpened={burgerOpened} toggleBurger={toggleBurger} />;
}
