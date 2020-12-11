import { Field, InputType } from '@nestjs/graphql';
import { BaseProductDTO } from './product.dto';

@InputType()
export class UpdateProduct extends BaseProductDTO {
  @Field()
  productId: string;
}