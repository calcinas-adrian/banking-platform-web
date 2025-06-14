import type { BaseEntity } from './base-entity.model';

export interface Rol extends BaseEntity {
  id?: number;
  name: string;
  description?: string;
}