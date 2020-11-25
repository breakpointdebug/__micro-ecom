import { Field, InputType } from '@nestjs/graphql';
import { MinLength } from 'class-validator';

@InputType()
export class CreateOrUpdateProduct {

  @Field({ nullable: true })
  _productCategoryId?: string;

  @MinLength(1)
  @Field()
  name: string;

  @Field({ nullable: true})
  sku?: string;

  @Field({ nullable: true })
  image?: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ defaultValue: 0.0 })
  sellingPrice: number;
}