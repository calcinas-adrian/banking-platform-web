export interface AccountsAndBalancesResponse {
  addDate: Date;
  addUser: string;
  changeDate: Date;
  changeUser: null | string;
  deleted: boolean;
  id: number;
  accountNumber: string;
  currency: string;
  type: string;
  balance: number;
  status: string;
}
