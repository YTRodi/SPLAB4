import { User } from './user.interface';
import { Subject } from './subject.interface';

export interface Inscription {
  students: Array<User>;
  subject: Subject;
  createdAt?: string;
}
