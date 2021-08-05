import { Subject } from './subject.interface';
import { User } from './user.interface';

export interface Exam {
  date: string | Date;
  subject: Subject;
  student: User;
  score: number;
}
