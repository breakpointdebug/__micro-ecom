import { BeforeInsert, Column, CreateDateColumn, Entity, ObjectID, ObjectIdColumn, PrimaryColumn, UpdateDateColumn } from 'typeorm';
import { Field, ID, InputType, ObjectType, registerEnumType } from '@nestjs/graphql';
import { AccountType } from 'src/_enums/account-type';
import { nullOrValue } from '../../_utils/null-utilities';
import { IsEmail, Length } from 'class-validator';

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

  @Column()
  @Field()
  isVerified: boolean;

  @Column({ type: 'timestamp' })
  @Field({ nullable: true, defaultValue: null })
  verifiedAt?: Date;

  @CreateDateColumn({ type: 'timestamp' })
  @Field()
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  @Field()
  lastUpdatedAt: Date;
}