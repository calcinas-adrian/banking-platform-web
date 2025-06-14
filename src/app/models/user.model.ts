import type { Profile } from './profile.model';
import type { Account } from './account.model';
import type { BaseEntity } from './base-entity.model';
import type { Rol } from './rol.model';
import type { Beneficiary } from './beneficiary.model';

export interface User extends BaseEntity {
  id?: number;
  email: string;
  password?: string;
  profile?: Profile;
  rol?: Rol;
  accounts?: Account[];
  beneficiaries?: Beneficiary[];
}
