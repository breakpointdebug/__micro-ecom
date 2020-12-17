import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

// used to know who will update a specific document
export const GetAuthUser = createParamDecorator((data, context: ExecutionContext)  => {
  const ctx = GqlExecutionContext.create(context).getContext();
  return ctx.user;
});