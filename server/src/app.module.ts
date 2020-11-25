import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AccountModule } from './account/account.module';
import { SellerModule } from './seller/seller.module';
import { BuyerModule } from './buyer/buyer.module';
import { ProductModule } from './product/product.module';
import { OrderModule } from './order/order.module';

import * as config from 'config';

import { Product } from './product/entity-gql-type/product';

const dbConf = config.get('config.db');

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: dbConf.type,
      url: dbConf.url,
      useUnifiedTopology: true,
      useNewUrlParser: true,
      synchronize: true,
      entities: [
        Product
      ]
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: true,
      path: '/api'
    }),
    ProductModule
  ]
})
export class AppModule {}
