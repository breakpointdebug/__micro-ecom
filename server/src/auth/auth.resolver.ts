import { Args, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { AuthUser } from '../auth/auth.type';
import { AccountType } from '../account/account.enum';
import { UseGuards } from '@nestjs/common';
import { AuthorizationGuard, RolesGuard } from './auth.guard';
import { GetAuthUser, DefineRoles } from './auth.decorator';

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
  @UseGuards(AuthorizationGuard)
  async me(
    @GetAuthUser() user: AuthUser
  ) {
    console.log(user)
    return true;
  }

  @Query(returns => Boolean)
  @DefineRoles(AccountType.ADMIN, AccountType.BUYER_AND_SELLER)
  @UseGuards(AuthorizationGuard, RolesGuard)
  async me_admin(
    @GetAuthUser() user: AuthUser
  ) {
    console.log(user)
    return true;
  }
}
