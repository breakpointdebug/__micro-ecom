import { Account } from '../account/account.type';

import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import * as config from 'config';

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

export const createJwtToken = async ({ accountId, email }: Account) => {
  return jwt.sign({ accountId, email }, jwtConf.secret);
}

// create a hash to be sent via email,
export const createVerificationLink = async () => {

}

export const sendVerificationLink = async () => {

}

// when visited by the user,
// then will activate their account and discard that hash (link)
export const verifyAccount = async () => {
  // note: input sanitation with encodeuri
}
