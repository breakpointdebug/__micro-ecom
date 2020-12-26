import { Module } from '@nestjs/common';
import { Product } from './product.type';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { ProductResolver } from './product.resolver';
import { ProductService } from './product.service';

@Module({
  imports: [
    MikroOrmModule.forFeature([Product])
  ],
  providers: [
    ProductService,
    ProductResolver
  ]
})
export class ProductModule {}
