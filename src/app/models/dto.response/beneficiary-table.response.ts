import type { Beneficiary } from '../beneficiary.model';

export interface BeneficiaryTableResponse extends Beneficiary {
  userId: number;
  userEmail: string;
  accountId: number;
  accountNumber: string;
  accountType: string;
  accountCurrency: string;
  accountStatus: string;
}
