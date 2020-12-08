import { Column, CreateDateColumn, Entity, ObjectID, ObjectIdColumn, PrimaryColumn } from 'typeorm';
import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';
import { AccountType } from 'src/_enums/account-type';

registerEnumType(AccountType, { name: 'AccountType' });

@Entity('accounts')
@ObjectType('Account')
export class Account {

  @ObjectIdColumn()
  _accountId: ObjectID;

  @PrimaryColumn()
  @Field(type => ID)
  accountId: string;

  @Column()
  @Field(type => AccountType)
  accountType: AccountType;

  @Column()
  @Field()
  username: string;

  @Column()
  @Field()
  password: string;

  @Column()
  @Field()
  salt: string;

  @Column()
  @Field()
  email: string;

  @Column()
  @Field()
  isVerified: boolean;

  @Column({ type: 'timestamp' })
  @Field({ nullable: true, defaultValue: null }) // dates needs nullable indicated
  verifiedAt: Date;

  @CreateDateColumn({ type: 'timestamp' })
  @Field()
  createdAt: Date;
}