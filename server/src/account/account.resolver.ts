import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { Account, AccountVerificationResponse } from './account.type';
import { AccountService } from './account.service';
// import { CreateAccount, UpdateAccount } from './account.dto';
import { AuthorizationGuard } from '../auth/auth.guard';
import { GetAuthUser } from '../auth/auth.decorator';
import { AuthUser } from '../auth/auth.type';


@Resolver(of => Account)
export class AccountResolver {

  constructor(private accountSvc: AccountService) {}

  // TODO: remove this gql endpoint
  @Query(returns => String)
  async test_account() {
    return "done, you can test quick code here upon running";
  }

  @Query(returns => Account)
  async getAccountById(
    @Args('accountId') accountId: string
  ) {
    return null; // await this.accountSvc.getAccountById(accountId);
  }

  // @Mutation(returns => Account)
  // @UsePipes(new ValidationPipe({ transform: true }))
  // async createAccount(
  //   @Args('createAccountInput') createAccountInput: CreateAccount
  // ) {
  //   return null; // await this.accountSvc.createAccount(createAccountInput);
  // }

  // @Mutation(returns => Account)
  // @UseGuards(AuthorizationGuard)
  // @UsePipes(new ValidationPipe({ transform: true }))
  // async updateAccount(
  //   @Args('updateAccountInput') updateAccountInput: UpdateAccount,
  //   @GetAuthUser() user: AuthUser
  // ) {
  //   return null; // await this.accountSvc.updateAccount(updateAccountInput);
  // }

  @Mutation(returns => AccountVerificationResponse)
  async verifyAccount(
    @Args('verificationHash') verificationHash: string
  ) {
    return null; // await this.accountSvc.verifyAccount(verificationHash);
  }
}