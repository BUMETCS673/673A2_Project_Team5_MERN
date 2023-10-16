import picture from '../images/picture.png';
import picture1 from '../images/picture.jpg';

export interface NoteCardType {
  imageSrc: string;
  title: string;
  description: string;
  linkURL: string;
}

export const cardData: NoteCardType[] = [
  {
    imageSrc: picture,
    title: 'Card 1',
    description:
      'I am the world coolest boy. I am the world coolest boy. I am the world coolest boy.',
    linkURL: 'https://www.google.com/',
  },
  {
    imageSrc: picture1,
    title: 'Card 1',
    description:
      'I am the world coolest boy. I am the world coolest boy. I am the world coolest boy.',
    linkURL: 'https://www.google.com/',
  },
  {
    imageSrc: picture1,
    title: 'Card 1',
    description:
      'I am the world coolest boy. I am the world coolest boy. I am the world coolest boy.',
    linkURL: 'https://www.google.com/',
  },
  {
    imageSrc: picture1,
    title: 'Card 1',
    description:
      'I am the world coolest boy. I am the world coolest boy. I am the world coolest boy.',
    linkURL: 'https://www.google.com/',
  },
  {
    imageSrc: picture1,
    title: 'Card 1',
    description:
      'I am the world coolest boy. I am the world coolest boy. I am the world coolest boy.',
    linkURL: 'https://www.google.com/',
  },
  {
    imageSrc: picture1,
    title: 'Card 2',
    description:
      'I am the world coolest boy. I am the world coolest boy. I am the world coolest boy.',
    linkURL: 'https://www.google.com/',
  },
  {
    imageSrc: picture1,
    title: 'Card 1',
    description:
      'I am the world coolest boy. I am the world coolest boy. I am the world coolest boy.',
    linkURL: 'https://www.google.com/',
  },
  {
    imageSrc: picture1,
    title: 'Card 1',
    description: 'Description for Card 1',
    linkURL: 'https://www.google.com/',
  },
  // Card Data, how to connect to backend
];
