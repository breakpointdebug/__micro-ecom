import { InputType, Field, PickType } from '@nestjs/graphql';
import { AccountType } from './account.enum';
import { Account } from './account.type';
import { IsEmail, IsNotEmpty, IsOptional, Length } from 'class-validator';
import { Transform } from 'class-transformer';
import { trimAndLowerCase } from '../_utils/misc.utilities';

// @InputType()
// export class CreateAccount extends PickType(Account, ['accountType','password',] as const) {
//   @Field()
//   @IsNotEmpty()
//   @Transform(username => trimAndLowerCase(username))
//   @Length(3, 50, { message: `Username should be between 3 and 50 characters.` })
//   username: string;

//   @Field()
//   @IsNotEmpty()
//   @IsEmail()
//   @Transform(email => trimAndLowerCase(email))
//   email: string;
// }

// @InputType()
// export class UpdateAccount  {
//   @Field()
//   accountId: string;

//   @Field(type => AccountType, { nullable: true, defaultValue: null })
//   @IsOptional()
//   accountType?: AccountType;

//   @Field({ nullable: true, defaultValue: null })
//   @IsOptional()
//   @Transform(username => trimAndLowerCase(username))
//   @Length(3, 50, { message: `Username should be between 3 and 50 characters.` })
//   username?: string;

//   @Field({ nullable: true, defaultValue: null })
//   @Length(8, 100, { message: `Password should be between 8 and 100 characters.` })
//   @IsOptional()
//   password?: string;

//   @Field({ nullable: true, defaultValue: null })
//   @IsEmail()
//   @IsOptional()
//   @Transform(email => trimAndLowerCase(email))
//   email?: string;
// }