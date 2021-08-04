import { User } from './user.interface';

export interface Subject {
  uid?: string;
  name: string;
  quarter: string;
  places: number;
  age: number;
  teacher: User;
  students: Array<User>;
  photo?: string;
}
