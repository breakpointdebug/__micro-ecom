import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import * as config from 'config';

import { AccountType } from '../account/account.enum';

const jwtConf = config.get('config.jwt');

export const giveSaltAndSaltedPassword = async (password: string) => {
  const salt = await bcrypt.genSalt();
  const saltedPassword = await bcrypt.hash(password, salt);
  return { salt, saltedPassword };
}

export const isPasswordCorrect = async (providedPassword: string, existingSalt: string, saltedPassword: string): Promise<boolean> => {
  const calculated = await bcrypt.hash(providedPassword, existingSalt);
  return calculated === saltedPassword;
}

export const createJwtToken = async (accountId: string, accountType: AccountType) => {
  return jwt.sign({ accountId, accountType }, jwtConf.secret);
}
