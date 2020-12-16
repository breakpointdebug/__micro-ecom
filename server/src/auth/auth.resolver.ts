import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { AuthUser } from '../auth/auth.type';

@Resolver(of => AuthUser)
export class AuthResolver {

  constructor(private authSvc: AuthService) {}

  @Mutation(returns => String)
  async login(
    @Args('username') username: string,
    @Args('password') password: string
  ) {
    return await this.authSvc.login(username, password);
  }
}
