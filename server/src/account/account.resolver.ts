import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { Account, AccountVerificationResponse } from './account.type';
import { AccountService } from './account.service';
import { CreateAccount, UpdateAccount } from './account.dto';
import { AuthGuard } from '../auth/auth.guard';
import { GetUser } from '../auth/get-user.decorator';
import { AuthUser } from '../auth/auth.type';

@Resolver(of => Account)
export class AccountResolver {

  constructor(private accountSvc: AccountService) {}

  // TODO: remove this gql endpoint
  @Query(returns => String)
  async test() {
    return "done, you can test quick code here upon running";
  }

  @Query(returns => Account)
  async getAccountById(
    @Args('accountId') accountId: string
  ) {
    return await this.accountSvc.getAccountById(accountId);
  }

  @Mutation(returns => Account)
  @UsePipes(ValidationPipe)
  async createAccount(
    @Args('createAccountInput') createAccountInput: CreateAccount
  ) {
    return await this.accountSvc.createAccount(createAccountInput);
  }

  // TODO: remove accountType if not admin type.

  @Mutation(returns => Account)
  @UseGuards(new AuthGuard())
  @UsePipes(ValidationPipe)
  async updateAccount(
    @Args('updateAccountInput') updateAccountInput: UpdateAccount,
    @GetUser() user: AuthUser
  ) {
    return await this.accountSvc.updateAccount(updateAccountInput);
  }

  @Mutation(returns => AccountVerificationResponse)
  async verifyAccount(
    @Args('verificationHash') verificationHash: string
  ) {
    return await this.accountSvc.verifyAccount(verificationHash);
  }
}