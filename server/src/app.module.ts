import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { MongoHighlighter } from '@mikro-orm/mongo-highlighter';

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

// TODO: SAFE auto-migrations
// https://mikro-orm.io/docs/migrations
// TODO: staging setup
@Module({
  imports: [
    MikroOrmModule.forRoot({
      type: dbConf.type,
      dbName: dbConf.name,
      clientUrl: dbConf.url_remote,
      entities: [ Product ],
      highlighter: new MongoHighlighter(),  // temporary
      debug: true,  // temporary
      // migrations: {
      //   tableName: dbConf.migrations,
      //   path: './migrations',
      //   pattern: /^[\w-]+\d+\.ts$/,
      //   transactional: true,
      //   disableForeignKeys: true,
      //   allOrNothing: true,
      //   dropTables: true,
      //   safe: false,
      //   emit: 'ts'
      // }
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: true,
      path: gqlConf.url,
      context: ({ req }) => ({ req }),
    }),
    ProductModule //,
    // AccountModule,
    // AuthModule,
    // MailerModule
  ]
})
export class AppModule {}
