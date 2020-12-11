import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Account } from './entity-gql-type/account';
import { CreateAccount } from './gql/dto/create-account.dto';
import { UpdateAccount } from './gql/dto/update-account.dto';
import { create_uuid_v4, format_uuid_v4 } from '../_utils/uuid-v4';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AccountService {

  constructor(@InjectRepository(Account) private accountRepository: Repository<Account>) {}

  async getAccountById(accountId: string): Promise<Account> {
    const account = await this.accountRepository.findOne({ accountId: format_uuid_v4(accountId) });
    if (!account) throw new NotFoundException(`Account "${accountId}" not found`);
    return account;
  }

  async createAccount(createAccountInput: CreateAccount): Promise<Account> {
    const account = this.accountRepository.create({
      accountId: create_uuid_v4(),
      ...createAccountInput
    });
    const saltUsed = await bcrypt.genSalt();
    account.salt = saltUsed;
    account.password = await bcrypt.hash(createAccountInput.password, saltUsed);
    return await this.accountRepository.save(account);
  }

  // TODO: proper validation for logical errors
  async updateAccount(updateAccountInput: UpdateAccount): Promise<Account> {
    const { accountId } = updateAccountInput;
    if (!accountId) throw new BadRequestException(`accountId required`);
    const account = await this.getAccountById(accountId);
    if (account) {

      delete updateAccountInput.accountId;

      if (updateAccountInput.username === null) {
        delete updateAccountInput.username;
      }

      if (updateAccountInput.password === null) {
        delete updateAccountInput.password;
      }

      if (updateAccountInput.email === null) {
        delete updateAccountInput.email;
      }

      return await this.accountRepository.save({ ...account, ...updateAccountInput });
    }
  }

  async deleteAccount(accountId: string): Promise<Account> {
    // TODO: implemetation
    return null;
  }
}
