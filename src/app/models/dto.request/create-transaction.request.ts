export interface CreateTransactionRequest {
  sourceAccountId: number;
  targetAccountId?: number;
  transactionType: string;
  amount: number;
  description?: string;
  reference?: string;
}
