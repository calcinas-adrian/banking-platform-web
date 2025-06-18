export interface TransactionResponse {
  id: number;
  transactionType: string;
  amount: number;
  date: string;
  description?: string;
  status: string;
  currency: string;
  sourceAccount: {
    id: number;
    accountNumber: string;
    type: string;
    ownerName: string;
  };
  targetAccount?: {
    id: number;
    accountNumber: string;
    type: string;
    ownerName: string;
  };
  reference?: string;
  notes?: string;
}
