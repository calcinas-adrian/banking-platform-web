export interface CreateUserRequest {
  email: string;
  password: string;
  name: string;
  lastName: string;
  gender: string;
  birthDate: Date | string;
  saldo?: number;
  type?: string;
}
