import { Injectable, CanActivate, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

import * as jwt from 'jsonwebtoken';
import * as config from 'config';

const jwtConf = config.get('config.jwt');

// TODO: https://stackoverflow.com/questions/55269777/nestjs-get-current-user-in-graphql-resolver-authenticated-with-jwt
// TODO: https://blog.logrocket.com/complete-guide-to-graphql-playground/

@Injectable()
export class AuthGuard implements CanActivate {

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context).getContext();

    if (!ctx.headers.Authorization) {
      return false;
    }

    ctx.user = await this.validateToken(ctx.headers.authorization);

    return true;
  }

  async validateToken(auth: string) {
    if (auth.split(' ')[0] !== 'Bearer') {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }

    const token = auth.split(' ')[1];

    try {
      return jwt.verify(token, jwtConf.secret);
    } catch (err) {
      const message = 'Token error: ' + (err.message || err.name);
      throw new HttpException(message, HttpStatus.UNAUTHORIZED);
    }
  }
}