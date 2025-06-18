export interface CreateUserRequest {
  // Campos obligatorios
  email: string;
  password: string;
  name: string;
  lastName: string;
  ci: string;

  // Campos opcionales
  mobile?: string;
  address?: string;
  saldoInicial?: number;
  tipoCuenta?: string;
  moneda?: string;
}
