import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Account } from './entity-gql-type/account';
import { CreateAccount } from './gql/dto/create-account.dto';
import { UpdateAccount } from './gql/dto/update-account.dto';

@Injectable()
export class AccountService {

  constructor(@InjectRepository(Account) private accountRepository: Repository<Account>) {}

  async getAccountById(accountId: string): Promise<Account[]> {
    const account = this.accountRepository.find({ accountId });
    if (!account) throw new NotFoundException(`Account "${accountId}" not found`);
    return account;
  }

  async createAccount(createAccountInput: CreateAccount): Promise<Account> {
    // TODO: implemetation
    return null;
  }

  async updateAccount(updateAccountInput: UpdateAccount): Promise<Account> {
    // TODO: implemetation
    return null;
  }

  async deleteAccount(accountId: string): Promise<Account> {
    // TODO: implemetation
    return null;
  }
}
