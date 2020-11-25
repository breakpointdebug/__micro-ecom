import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entity-gql-type/product';
import { ProductResolver } from './gql/product.resolver';
import { ProductService } from './product.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product])
  ],
  providers: [
    ProductService,
    ProductResolver
  ]
})
export class ProductModule {}
