import type { User } from './user.model';
import type { BaseEntity } from './base-entity.model';
import type { Transaction } from './transaction.model';
import type { Beneficiary } from './beneficiary.model';

export interface Account extends BaseEntity {
  id?: number;
  accountNumber: string;
  currency: string;
  type: string;
  balance: number;
  status: string;
  user?: User;
  outgoingTransactions?: Transaction[];
  incomingTransactions?: Transaction[];
  accountBeneficiaries?: Beneficiary[];
}
