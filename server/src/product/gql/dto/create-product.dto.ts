import { Field, InputType } from '@nestjs/graphql';
import { BaseProductDTO } from './product.dto';

@InputType()
export class CreateProduct extends BaseProductDTO {
  @Field({ nullable: true, defaultValue: null }) // TODO: temporary nullable
  sellerId?: string; // TODO: temporary nullable
}