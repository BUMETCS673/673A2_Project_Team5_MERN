import { User } from './user';

export interface Document {
  title: string;
  document_id: number;
  content: string;
  summary: string;
  last_modified: Date;
  author: User;
  date_modified: Date;
}
