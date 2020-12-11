import { InputType, PickType } from '@nestjs/graphql';
import { Account } from 'src/account/entity-gql-type/account';

@InputType()
export class CreateAccount extends
  PickType(Account, [
    'accountType',
    'username',
    'password',
    'email'
  ] as const) {};