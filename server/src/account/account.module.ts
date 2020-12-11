import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from './entity-gql-type/account';
import { AccountResolver } from './gql/account.resolver';
import { AccountService } from './account.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Account])
  ],
  providers: [
    AccountService,
    AccountResolver
  ]
})
export class AccountModule {}
