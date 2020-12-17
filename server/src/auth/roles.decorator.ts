import { SetMetadata } from '@nestjs/common';
import { AccountType } from '../account/account.enum';

export const DefineRoles = (...roles: AccountType[]) => SetMetadata('roles', roles);