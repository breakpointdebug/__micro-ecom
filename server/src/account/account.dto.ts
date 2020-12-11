import { InputType, Field, PickType } from '@nestjs/graphql';
import { AccountType } from 'src/_enums/account-type.enum';
import { Account } from 'src/account/account.type';
import { IsEmail, IsOptional, Length } from 'class-validator';

@InputType()
export class CreateAccount extends
  PickType(Account, [
    'accountType',
    'username',
    'password',
    'email'
  ] as const) {};

@InputType()
export class UpdateAccount  {
  @Field()
  accountId: string;

  @Field(type => AccountType, { nullable: true, defaultValue: null })
  @IsOptional()
  accountType?: AccountType;

  @Field({ nullable: true, defaultValue: null })
  @Length(3, 50, { message: `Username should be between 3 and 50 characters.` })
  @IsOptional()
  username?: string;

  @Field({ nullable: true, defaultValue: null })
  @Length(8, 100, { message: `Password should be between 8 and 100 characters.` })
  @IsOptional()
  password?: string;

  @Field({ nullable: true, defaultValue: null })
  @IsEmail()
  @IsOptional()
  email?: string;
};