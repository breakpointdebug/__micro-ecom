import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
import { Account, AccountVerificationResponse } from './account.type';
// import { CreateAccount, UpdateAccount } from './account.dto';
import { create_uuid_v4, format_uuid_v4 } from '../_utils/uuid-v4.utilities';
// import { removeNullProperty } from '../_utils/null.utilities';
import { giveSaltAndSaltedPassword } from '../auth/auth.utilities';

@Injectable()
export class AccountService {

  // constructor(@InjectRepository(Account) private accountRepo: Repository<Account>) {}

  // //#region Query
  // async getAccountById(accountId: string): Promise<Account> {
  //   const account = await this.accountRepo.findOne({ accountId: format_uuid_v4(accountId) });
  //   if (!account) throw new NotFoundException(`Account "${accountId}" not found`);
  //   return account;
  // }
  // //#endregion

  // //#region Mutation
  // async createAccount(createAccountInput: CreateAccount): Promise<Account> {
  //   const account = this.accountRepo.create({ accountId: create_uuid_v4(), ...createAccountInput });

  //   const { salt, saltedPassword } = await giveSaltAndSaltedPassword(account.password);
  //   account.salt = salt;
  //   account.password = saltedPassword;

  //   const accountCreated = await this.accountRepo.save(account)

  //   // proceed with sending for verification (mailer)

  //   return accountCreated;
  // }

  // async updateAccount(updateAccountInput: UpdateAccount): Promise<Account> {
  //   const { accountId } = updateAccountInput;
  //   if (!accountId) throw new BadRequestException(`accountId required`);
  //   const account = await this.getAccountById(accountId);
  //   if (account) {

  //     delete updateAccountInput.accountId;

  //     if (updateAccountInput.password) {
  //       const { salt, saltedPassword } = await giveSaltAndSaltedPassword(account.password);
  //       account.salt = salt;
  //       account.password = saltedPassword;
  //     }

  //     removeNullProperty<UpdateAccount>(updateAccountInput);

  //     return await this.accountRepo.save({ ...account, ...updateAccountInput });
  //   }
  // }

  // async verifyAccount(verificationhash: string): Promise<AccountVerificationResponse> {
  //   // if already verified, do not do another verification logic
  //   // on each resend of verification hash, overwrite the already existing (to invalidate the previous ones)
  //   return null;
  // }
  // //#endregion
}
