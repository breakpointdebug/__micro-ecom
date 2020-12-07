import { InputType, PickType } from '@nestjs/graphql';
import { Product } from '../../entity-gql-type/product';

@InputType()
export class CreateProduct extends
  PickType(Product,
    [
      'sellerId',
      'productCategory',
      'name',
      'sku',
      'image',
      'description',
      'sellingPrice'
    ] as const) {
}