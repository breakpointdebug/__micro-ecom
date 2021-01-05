import { Injectable, CanActivate, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Reflector } from '@nestjs/core';
import { AccountType } from '../account/account.enum';

import * as jwt from 'jsonwebtoken';
import * as config from 'config';

const jwtConf = config.get('config.jwt');

@Injectable()
export class AuthorizationGuard implements CanActivate {

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context).getContext();

    if (!ctx.req.headers.authorization) {
      return false;
    }

    ctx.user = await this.validateToken(ctx.req.headers.authorization);

    return true;
  }

  async validateToken(auth: string) {
    if (auth.split(' ')[0] !== 'Bearer') {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }
    try {
      return jwt.verify(auth.split(' ')[1], jwtConf.secret);
    } catch (e) {
      throw new HttpException(`Token error: ${e.message || e.name}`, HttpStatus.UNAUTHORIZED);
    }
  }
}

@Injectable()
export class RolesGuard implements CanActivate {

  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<AccountType[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }

    const ctx = GqlExecutionContext.create(context).getContext();

    if (!ctx.user) {
      return false;
    }

    return roles.includes(ctx.user.accountType);
  }
}