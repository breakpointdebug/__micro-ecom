import { Field, InputType, PickType } from '@nestjs/graphql';
import { Product } from '../../entity-gql-type/product';

// TODO: logic problem on passing optional parameters,
// to use the previous value if not passed?

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

  // we need to pass productId as a string

  @Field({ defaultValue: null }) // TODO: temporary nullable
  productId?: string; // TODO: temporary nullable
}