import type { BaseEntity } from './base-entity.model';

export interface Profile extends BaseEntity {
  id?: number;
  name: string;
  lastName: string;
  ci: string;
  mobile?: string;
  address?: string;
  status?: string;
}
