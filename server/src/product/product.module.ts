import { Module } from '@nestjs/common';
import { Products } from './product.entity';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { ProductResolver } from './product.resolver';
import { ProductService } from './product.service';

@Module({
  imports: [
    MikroOrmModule.forFeature([Products])
  ],
  providers: [
    ProductService,
    ProductResolver
  ]
})
export class ProductModule { }
