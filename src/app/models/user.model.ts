import type { Profile } from './profile.model';
import type { Account } from './account.model';

export interface User {
  id?: number;
  email: string;
  password: string;
  profile?: Profile;
  accounts?: Account[];
}
