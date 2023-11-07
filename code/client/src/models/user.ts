import { Document } from './document';

export interface User {
  user_name?: string;
  user_id?: string;
  user_pic?: string;
}

export interface UserDocument extends User {
  user: User;
  docs: Document[];
}
