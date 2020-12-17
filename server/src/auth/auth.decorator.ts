import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { SetMetadata } from '@nestjs/common';
import { AccountType } from '../account/account.enum';

// used to know who will update a specific document
export const GetAuthUser = createParamDecorator((data, context: ExecutionContext)  => {
  const ctx = GqlExecutionContext.create(context).getContext();
  return ctx.user;
});

export const DefineRoles = (...roles: AccountType[]) => SetMetadata('roles', roles);
