import { InputType, PickType } from '@nestjs/graphql';
import { Product } from '../../entity-gql-type/product';

@InputType()
export class BaseProductDTO extends
  PickType(Product,
    [
      'productCategory',
      'name',
      'sku',
      'image',
      'description',
      'sellingPrice'
    ] as const) {
}