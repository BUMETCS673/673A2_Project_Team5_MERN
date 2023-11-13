import { User } from './user';

export interface Document {
  title: string;
  document_id: string;
  content: string;
  imageSrc: string;
  summary: string;
  last_modified: Date;
  author: User;
  date_modified: Date;
}
