import picture from '../images/picture.png';
import picture1 from '../images/picture.jpg';
import { Document } from '../models/document';

export interface NoteCardType extends Document {
  onCardDelete: () => void; //define ?, prove it is can be choose
}

export const cardData: NoteCardType[] = [
  {
    imageSrc: picture,
    title: 'Card 1',
    description:
      'Hello, This is Card Data! Hello, This is Card Data! Hello, This is Card Data!Hello, This is Card Data! Hello, This is Card Data! Hello, This is Card Data! Hello, This is Card Data!',
    linkURL: '../pages/document/view',
    _id: 1,
  },
  {
    imageSrc: picture1,
    title: 'Card 1',
    description:
      'Hello, This is Card Data! Hello, This is Card Data! Hello, This is Card Data!Hello, This is Card Data! Hello, This is Card Data! Hello, This is Card Data! Hello, This is Card Data!',
    linkURL: 'https://www.google.com/',
    _id: 2,
  },
  {
    imageSrc: picture1,
    title: 'Card 1',
    description:
      'Hello, This is Card Data! Hello, This is Card Data! Hello, This is Card Data!Hello, This is Card Data! Hello, This is Card Data! Hello, This is Card Data! Hello, This is Card Data!',
    linkURL: 'https://www.google.com/',
    _id: 3,
  },
  {
    imageSrc: picture1,
    title: 'Card 1',
    description:
      'Hello, This is Card Data! Hello, This is Card Data! Hello, This is Card Data!Hello, This is Card Data! Hello, This is Card Data! Hello, This is Card Data! Hello, This is Card Data!',
    linkURL: 'https://www.google.com/',
    _id: 4,
  },
  {
    imageSrc: picture1,
    title: 'Card 1',
    description:
      'Hello, This is Card Data! Hello, This is Card Data! Hello, This is Card Data!Hello, This is Card Data! Hello, This is Card Data! Hello, This is Card Data! Hello, This is Card Data!',
    linkURL: 'https://www.google.com/',
    _id: 5,
  },
  {
    imageSrc: picture1,
    title: 'Card 2',
    description:
      'Hello, This is Card Data! Hello, This is Card Data! Hello, This is Card Data!Hello, This is Card Data! Hello, This is Card Data! Hello, This is Card Data! Hello, This is Card Data!',
    linkURL: 'https://www.google.com/',
    _id: 6,
  },
  {
    imageSrc: picture1,
    title: 'Card 1',
    description:
      'Hello, This is Card Data! Hello, This is Card Data! Hello, This is Card Data!Hello, This is Card Data! Hello, This is Card Data! Hello, This is Card Data! Hello, This is Card Data!',
    linkURL: 'https://www.google.com/',
    _id: 7,
  },
  {
    imageSrc: picture1,
    title: 'Card 1',
    description: 'Description for Card 1',
    linkURL: 'https://www.google.com/',
    _id: 8,
  },
  // Card Data, how to connect to backend
];
