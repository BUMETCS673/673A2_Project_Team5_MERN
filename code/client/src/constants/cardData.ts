import picture from '../images/picture.png';
import picture1 from '../images/picture.jpg';

export interface NoteCardType {
  imageSrc: string;
  userId: string;
  title: string;
  description: string;
  linkURL: string;
  _id: number;
  onCardDelete?: () => void; //define ?, prove it is can be choose
}

export const cardData: NoteCardType[] = [];
