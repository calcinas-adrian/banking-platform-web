export interface UserListResponse {
  id: number;
  email: string;
  fullName: string;
  rolName: string;
  totalAccounts: number;
  status: string;
  addDate: Date;
  deleted: boolean;
}
