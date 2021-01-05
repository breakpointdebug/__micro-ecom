import { Module } from '@nestjs/common';
// import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from '../account/account.type';
import { AuthResolver } from './auth.resolver';
// import { AuthService } from './auth.service';

@Module({
  imports: [
    // TypeOrmModule.forFeature([Account])
  ],
  providers: [
    AuthResolver,
    // AuthService
  ]
})
export class AuthModule {}
