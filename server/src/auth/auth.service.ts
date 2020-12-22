import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Account } from '../account/account.type';
import { isPasswordCorrect, createJwtToken } from '../auth/auth.utilities';

@Injectable()
export class AuthService {

  constructor(@InjectRepository(Account) private accountRepo: Repository<Account> ) {}

  //#region Query
  async getAccountByUsername(username: string): Promise<Account> {
    const account = await this.accountRepo.findOne({ username });
    if (!account) throw new HttpException('Invalid account credentials', HttpStatus.UNAUTHORIZED);
    return account;
  }

  async login(username: string, password: string): Promise<String> {
    const account = await this.getAccountByUsername(username);
    if (account && isPasswordCorrect(password, account.salt, account.password)) {
      return await createJwtToken(account.accountId, account.accountType);
    } else {
      throw new HttpException('Invalid account credentials', HttpStatus.UNAUTHORIZED);
    }
  }
  //#endregion

  //#region Mutation
  //#endregion
}