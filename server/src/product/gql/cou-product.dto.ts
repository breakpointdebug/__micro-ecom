import { Field, InputType } from '@nestjs/graphql';
import { MinLength } from 'class-validator';

@InputType()
export class CreateOrUpdateProduct {

  @Field({ nullable: true, defaultValue: null })
  _productCategoryId?: string;

  @MinLength(1)
  @Field()
  name: string;

  @Field({ nullable: true, defaultValue: null })
  sku?: string;

  @Field({ nullable: true, defaultValue: null })
  image?: string;

  @Field({ nullable: true, defaultValue: null })
  description?: string;

  @Field({ defaultValue: 0 })
  sellingPrice: number;
}