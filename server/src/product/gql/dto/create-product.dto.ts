import { Field, InputType } from '@nestjs/graphql';
import { CreateOrUpdateProduct } from './cou-product'

@InputType()
export class CreateProduct extends CreateOrUpdateProduct {
  @Field({ defaultValue: null }) // TODO: temporary nullable
  sellerId?: string; // TODO: temporary nullable
}