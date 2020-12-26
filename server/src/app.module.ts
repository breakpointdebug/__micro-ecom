import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MikroOrmModule } from '@mikro-orm/nestjs';

import { ProductModule } from './product/product.module';
import { AccountModule } from './account/account.module';
import { AuthModule } from './auth/auth.module';

// import { SellerModule } from './seller/seller.module';
// import { BuyerModule } from './buyer/buyer.module';
// import { OrderModule } from './order/order.module';

import * as config from 'config';

import { Product } from './product/product.type';
import { Account } from './account/account.type';
import { MailerModule } from './mailer/mailer.module';

const dbConf = config.get('config.db');
const gqlConf = config.get('config.gql');

@Module({
  imports: [
    MikroOrmModule.forRoot({
      entities: [ Product, Account ],
      dbName: dbConf.name,
      type: dbConf.type
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: true,
      path: gqlConf.url,
      context: ({ req }) => ({ req }),
    }),
    ProductModule,
    AccountModule,
    AuthModule,
    MailerModule
  ]
})
export class AppModule {}
