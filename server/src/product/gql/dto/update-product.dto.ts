import { Field, InputType } from '@nestjs/graphql';
import { CreateOrUpdateProduct } from './cou-product'

@InputType()
export class UpdateProduct extends CreateOrUpdateProduct {
  @Field({ nullable: true, defaultValue: null }) // TODO: temporary nullable
  productId?: string; // TODO: temporary nullable
}