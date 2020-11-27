import { Field, InputType } from '@nestjs/graphql';
import { MinLength } from 'class-validator';
import { ICreateOrUpdateProduct } from './cou-product.interface'

@InputType()
export class CreateProduct implements ICreateOrUpdateProduct {

  @Field({ nullable: true, defaultValue: null }) // TODO: temporary nullable
  productCategoryId?: string; // TODO: temporary nullable

  @Field({ nullable: true, defaultValue: null }) // TODO: temporary nullable
  sellerId?: string; // TODO: temporary nullable

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