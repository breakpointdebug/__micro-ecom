import { BeforeInsert, Column, CreateDateColumn, Entity, ObjectID, ObjectIdColumn, PrimaryColumn } from 'typeorm';
import { Field, ID, InputType, ObjectType, registerEnumType } from '@nestjs/graphql';
import { AccountType } from 'src/_enums/account-type';
import { nullOrValue } from '../../_utils/null-or-value';
import { IsEmail, MaxLength, MinLength } from 'class-validator';

registerEnumType(AccountType, { name: 'AccountType' });

@Entity('accounts')
@InputType('AccountInput')
@ObjectType('Account')
export class Account {

  @BeforeInsert()
  beforeInsertActions() {
    this.isVerified = this.isVerified === true ? true : false;
    this.verifiedAt = nullOrValue(this.verifiedAt);
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
  @MaxLength(50, { message: `50 characters max length for Username.` })
  @MinLength(3, { message: `3 characters minimum for Username.` })
  username: string;

  @Column()
  @Field()
  @MaxLength(100, { message: `100 characters max length for Password.` })
  @MinLength(8, { message: `8 characters minimum length for Password.` })
  password: string;

  @Column()
  @Field()
  salt: string;

  @Column({ unique: true })
  @Field()
  @IsEmail()
  email: string;

  @Column()
  @Field()
  isVerified: boolean;

  @Column({ type: 'timestamp' })
  @Field({ nullable: true, defaultValue: null })
  verifiedAt?: Date;

  @CreateDateColumn({ type: 'timestamp' })
  @Field()
  createdAt: Date;
}