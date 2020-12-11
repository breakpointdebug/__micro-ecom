import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Account } from '../entity-gql-type/account';
import { AccountService } from '../account.service';
import { CreateAccount } from './dto/create-account.dto';
import { UpdateAccount } from './dto/update-account.dto';
import { UsePipes, ValidationPipe } from '@nestjs/common';

@Resolver(of => Account)
export class AccountResolver {

  constructor(private accountService: AccountService) {}

  @Query(returns => Account)
  async getAccountById(
    @Args('accountId') accountId: string
  ) {
    return await this.accountService.getAccountById(accountId);
  }

  @Mutation(returns => Account)
  @UsePipes(ValidationPipe)
  async createAccount(
    @Args('createAccountInput') createAccountInput: CreateAccount
  ) {
    return await this.accountService.createAccount(createAccountInput);
  }

  // TODO: remove accountType if not admin type.
  @Mutation(returns => Account)
  @UsePipes(ValidationPipe)
  async updateAccount(
    @Args('updateAccountInput') updateAccountInput: UpdateAccount
  ) {
    return await this.accountService.updateAccount(updateAccountInput);
  }

  @Mutation(returns => Account)
  async deleteAccount(
    @Args('accountId') accountId: string
  ) {
    return await this.accountService.deleteAccount(accountId);
  }
}