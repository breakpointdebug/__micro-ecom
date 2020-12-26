import { BeforeInsert, Column, CreateDateColumn, Entity, ObjectID, ObjectIdColumn, PrimaryColumn, UpdateDateColumn } from 'typeorm';
import { Field, ID, InputType, ObjectType, registerEnumType } from '@nestjs/graphql';
import { AccountType } from './account.enum';
import { nullOrValue } from '../_utils/null.utilities';
import { IsEmail, Length } from 'class-validator';

registerEnumType(AccountType, { name: 'AccountType' });

@Entity('accounts')
@InputType('AccountInput')
@ObjectType('Account')
export class Account {

  @BeforeInsert()
  beforeInsertActions() {
    this.verifiedAt = nullOrValue(this.verifiedAt);
    this.verificationHash = nullOrValue(this.verificationHash);
    this.forgotAccountHash = nullOrValue(this.forgotAccountHash);
  }

  @ObjectIdColumn()
  _accountId: ObjectID;

  @PrimaryColumn()
  @Field(type => ID)
  accountId: string;

  @Column()
  @Field(type => AccountType)
  accountType: AccountType;

  @Column({ unique: true })
  @Field()
  @Length(3, 50, { message: `Username should be between 3 and 50 characters.` })
  username: string;

  @Column()
  @Field()
  @Length(8, 100, { message: `Password should be between 8 and 100 characters.` })
  password: string;

  @Column()
  @Field()
  salt: string;

  @Column({ unique: true })
  @Field()
  @IsEmail()
  email: string;

  @Column({ type: 'timestamp' })
  @Field({ nullable: true, defaultValue: null })
  verifiedAt?: Date;

  @Column()
  @Field({ nullable: true, defaultValue: null })
  verificationHash?: string; // expiring hash, 10minutes, if verified then delete, else check validity

  @Column()
  @Field({ nullable: true, defaultValue: null })
  forgotAccountHash?: string; // expiring hash, 10minutes, if verified then delete, else check validity

  @CreateDateColumn({ type: 'timestamp' })
  @Field()
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  @Field()
  lastUpdatedAt: Date;
}

@ObjectType('AccountVerificationResponse')
export class AccountVerificationResponse {

  @Field()
  isAccepted: boolean

  @Field()
  resultMessage: string
}