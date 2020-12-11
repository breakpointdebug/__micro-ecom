import * as bcrypt from 'bcryptjs';

export const giveSaltAndHash = async (password: string) => {
  const salt = await bcrypt.genSalt();
  const saltedPassword = await bcrypt.hash(password, salt);
  return { salt, saltedPassword };
}