import { SetMetadata } from '@nestjs/common';
import { Roles } from '../enum/roles';

export const ROLES_KEY = Roles;
export const hasRoles = (...hasRoles: Roles[]) => SetMetadata(ROLES_KEY,  hasRoles );