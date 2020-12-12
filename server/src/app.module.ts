import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProductModule } from './product/product.module';
import { AccountModule } from './account/account.module';

// import { SellerModule } from './seller/seller.module';
// import { BuyerModule } from './buyer/buyer.module';
// import { OrderModule } from './order/order.module';

import * as config from 'config';

import { Product } from './product/product.type';
import { Account } from './account/account.type';

const dbConf = config.get('config.db');
const gqlConf = config.get('config.gql');

// TODO: gql endpoint protection

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: dbConf.type,
      url: dbConf.url_remote,
      useUnifiedTopology: true,
      useNewUrlParser: true,
      synchronize: true,
      entities: [
        Product,
        Account
      ]
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: true,
      path: gqlConf.url,
      context: ({ req }) => ({ req }),
    }),
    ProductModule,
    AccountModule
  ]
})
export class AppModule {}
