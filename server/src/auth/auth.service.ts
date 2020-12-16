import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Account } from '../account/account.type';
import { isPasswordCorrect, createJwtToken } from '../auth/auth.utilities';

@Injectable()
export class AuthService {

  constructor(@InjectRepository(Account) private accountRepo: Repository<Account> ) { }

  async getAccountByUsername(username: string): Promise<Account> {
    const account = await this.accountRepo.findOne({ username });
    if (!account) throw new NotFoundException(`Account not found`);
    return account;
  }

  async login(username: string, password: string): Promise<String> {
    const account = await this.getAccountByUsername(username);
    if (account && isPasswordCorrect(password, account.salt, account.password)) {
      return await createJwtToken(account);
    } else {
      throw new NotFoundException(`Invalid account credentials`);
    }
  }
}