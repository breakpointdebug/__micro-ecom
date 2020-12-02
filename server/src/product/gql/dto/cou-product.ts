import { Field, InputType } from '@nestjs/graphql';
import { MinLength } from 'class-validator';

@InputType()
export class CreateOrUpdateProduct {
  @Field({ defaultValue: null }) // TODO: temporary nullable
  productCategoryId?: string; // TODO: temporary nullable

  @MinLength(1)
  @Field()
  name: string;

  @Field({ defaultValue: null })
  sku?: string;

  @Field({ defaultValue: null })
  image?: string;

  @Field({ defaultValue: null })
  description?: string;

  @Field({ defaultValue: 0 })
  sellingPrice: number;
}