import { BeforeInsert, Column, CreateDateColumn, Entity, ObjectID, ObjectIdColumn, PrimaryColumn } from 'typeorm';
import { Field, ID, ObjectType } from '@nestjs/graphql';

@Entity('accounts')
@ObjectType('Account')
export class Account {

}