import { Args, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { AuthUser } from '../auth/auth.type';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from './auth.guard';

import { GetAuthUser } from './get-auth-user.decorator';
import { DefineRoles } from './roles.decorator'
import { AccountType } from 'src/_enums/account-type.enum';
import { RolesGuard } from './roles.guard';

@Resolver(of => AuthUser)
export class AuthResolver {

  constructor(private authSvc: AuthService) {}

  @Query(returns => String)
  async login(
    @Args('username') username: string,
    @Args('password') password: string
  ) {
    return await this.authSvc.login(username, password);
  }

  /*
    HTTP HEADERS
    {
      "authorization": "Bearer ..."
    }

  */

  @Query(returns => Boolean)
  @UseGuards(new AuthGuard())
  async me(
    @GetAuthUser() user: AuthUser
  ) {
    console.log(user)
    return true;
  }

  @Query(returns => Boolean)
  @DefineRoles(AccountType.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  async me_admin(
    @GetAuthUser() user: AuthUser
  ) {
    console.log(user)
    return true;
  }
}
