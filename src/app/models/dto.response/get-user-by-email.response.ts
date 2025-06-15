export interface GetUserByEmailResponse {
  id: number;
  email: string;
  profile: Profile;
  rol: Rol;
  accounts: any[];
  totalAccounts: number;
  status: string;
  addDate: Date;
  changeDate: Date;
  deleted: boolean;
}

export interface Profile {
  id: number;
  fullName: string;
  ci: string;
  status: string;
  mobile: string;
  active: boolean;
}

export interface Rol {
  id: number;
  name: string;
  description: string;
  active: boolean;
}
