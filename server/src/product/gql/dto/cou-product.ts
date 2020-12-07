import { Field, InputType, registerEnumType } from '@nestjs/graphql';
import { MinLength } from 'class-validator';
import { ProductCategory } from '../../../_enums/product-category';

registerEnumType(ProductCategory, {
  name:'ProductCategory'
});

@InputType()
export class CreateOrUpdateProduct {

  // can be replaced by Id instead, but in our portfolio, we would like to
  // skip crud for product category to simplify code and shorten development time
  @Field(type => ProductCategory)
  productCategory: ProductCategory;

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