import type { User } from './user.model';
import type { Account } from './account.model';
import type { BaseEntity } from './base-entity.model';

export interface Beneficiary extends BaseEntity {
  id?: number;
  alias: string;
  description: string;
  user?: User;
  account?: Account;
}