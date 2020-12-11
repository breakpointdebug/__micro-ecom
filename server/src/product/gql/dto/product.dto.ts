import { Field, InputType, PickType } from '@nestjs/graphql';
import { IsOptional, Length } from 'class-validator';
import { ProductCategory } from 'src/_enums/product-category';
import { Product } from '../../entity-gql-type/product';

@InputType()
export class BaseProductDTO extends
  PickType(Product,
    [
      'sku',
      'image',
      'description',
      'sellingPrice'
    ] as const) {

  @Field(type => ProductCategory, { nullable: true, defaultValue: null })
  @IsOptional()
  productCategory?: ProductCategory;

  @Field({ nullable: true, defaultValue: null })
  @Length(3, 200, { message: `Product Name should be between 3 and 200 characters.` })
  @IsOptional() // only validate with class-validator if property has value
  name?: string;
}