import { User } from './user.interface';

export interface Subject {
  name: string;
  quarter: string;
  places: number;
  age: number;
  teacher: User;
}
