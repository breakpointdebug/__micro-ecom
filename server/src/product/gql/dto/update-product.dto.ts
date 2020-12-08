import { Field, InputType, PickType } from '@nestjs/graphql';
import { Product } from '../../entity-gql-type/product';

@InputType()
export class UpdateProduct extends
  PickType(Product,
    [
      'productCategory',
      'name',
      'sku',
      'image',
      'description',
      'sellingPrice'
    ]) {

  @Field()
  productId: string;
}