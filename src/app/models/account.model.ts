import type { User } from './user.model';

export interface Account {
  id?: number;
  number: number;
  saldo: number;
  type: string;
  user?: User;
}
