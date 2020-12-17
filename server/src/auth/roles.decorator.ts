import { SetMetadata } from '@nestjs/common';
import { AccountType } from '../_enums/account-type.enum';

export const DefineRoles = (...roles: AccountType[]) => SetMetadata('roles', roles);