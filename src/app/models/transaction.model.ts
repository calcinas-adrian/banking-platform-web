import type { Account } from './account.model';
import type { BaseEntity } from './base-entity.model';

export interface Transaction extends BaseEntity {
  id?: number;
  sourceAccount?: Account;
  targetAccount?: Account;
  transactionType: string;
  amount: number;
  date: Date;
  description?: string;
  reference?: string;
  notes?: string;
  status: string;
  currency: string;
}