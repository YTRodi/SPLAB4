import { User } from './user.interface';
import { Subject } from './subject.interface';

export interface Inscription {
  student: User;
  subject: Subject;
  createdAt?: string;
}
