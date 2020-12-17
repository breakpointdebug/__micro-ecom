import { Field, InputType, PickType } from '@nestjs/graphql';
import { IsOptional, Length } from 'class-validator';
import { ProductCategory } from './product.enum';
import { Product } from './product.type';

@InputType()
class ProductBaseDTO extends
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

@InputType()
export class CreateProduct extends ProductBaseDTO {
  @Field({ nullable: true, defaultValue: null }) // TODO: temporary nullable
  sellerId?: string; // TODO: temporary nullable
}

@InputType()
export class UpdateProduct extends ProductBaseDTO {
  @Field()
  productId: string;
}

@InputType()
export class DeleteProduct {
  @Field()
  productId: string;

  @Field({ nullable: true, defaultValue: null })
  deleteReason?: string;
}