import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Account } from './entity-gql-type/account';
import { CreateAccount } from './gql/dto/create-account.dto';
import { UpdateAccount } from './gql/dto/update-account.dto';
import { create_uuid_v4, format_uuid_v4 } from '../_utils/uuid-v4';
import { removeNullProperty } from '../_utils/null-utilities';
import { giveSaltAndHash } from '../_utils/account-utilities';

@Injectable()
export class AccountService {

  constructor(@InjectRepository(Account) private accountRepository: Repository<Account>) {}

  async getAccountById(accountId: string): Promise<Account> {
    const account = await this.accountRepository.findOne({ accountId: format_uuid_v4(accountId) });
    if (!account) throw new NotFoundException(`Account "${accountId}" not found`);
    return account;
  }

  async createAccount(createAccountInput: CreateAccount): Promise<Account> {
    const account = this.accountRepository.create({ accountId: create_uuid_v4(), ...createAccountInput });

    const { salt, saltedPassword } = await giveSaltAndHash(account.password);
    account.salt = salt;
    account.password = saltedPassword;

    return await this.accountRepository.save(account);
  }

  async updateAccount(updateAccountInput: UpdateAccount): Promise<Account> {
    const { accountId } = updateAccountInput;
    if (!accountId) throw new BadRequestException(`accountId required`);
    const account = await this.getAccountById(accountId);
    if (account) {

      delete updateAccountInput.accountId;

      if (updateAccountInput.password) {
        const { salt, saltedPassword } = await giveSaltAndHash(account.password);
        account.salt = salt;
        account.password = saltedPassword;
      }

      removeNullProperty<UpdateAccount>(updateAccountInput);

      return await this.accountRepository.save({ ...account, ...updateAccountInput });
    }
  }
}
