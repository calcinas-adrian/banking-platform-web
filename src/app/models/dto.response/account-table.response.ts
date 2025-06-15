import type { Account } from '../account.model';

export interface AccountTableResponse extends Account {
  userId: number;
  userEmail: string;
  userName: string;
  userLastName: string;
  totalTransactions: number;
  activeBeneficiaries: number;
  monthlyIncome?: number;
  monthlyExpenses?: number;
}
