import { InputType, PickType } from '@nestjs/graphql';
import { Account } from '../../entity-gql-type/account';

@InputType()
export class BaseAccountDTO extends
  PickType(Account,
    [
      'accountType',
      'username',
      'password',
      'salt',
      'email'
    ] as const) {
}