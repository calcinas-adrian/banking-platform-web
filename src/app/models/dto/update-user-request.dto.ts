export interface UpdateUserRequest {
  id: number;
  email: string;
  name: string;
  lastName: string;
  ci: string;
  mobile?: string;
  address?: string;
}
