import { DateType, Entity, Enum, PrimaryKey, Property, SerializedPrimaryKey, Unique } from '@mikro-orm/core';
import { Field, ID, InputType, ObjectType, registerEnumType } from '@nestjs/graphql';
import { ProductCategory } from './product.enum';
import { IsPositive, Length } from 'class-validator';
import { ObjectID } from 'mongodb';

registerEnumType(ProductCategory, { name: 'ProductCategory' });

/*
-- @mikro-orm/core
-- @nestjs/graphql
-- class-validator
*/

@Entity({ tableName: 'products' })
@InputType('ProductInput')
@ObjectType('ProductType')
export class Product {

  @PrimaryKey()
  _productId: ObjectID;

  @SerializedPrimaryKey()
  @Field(type => ID)
  productId: string;

  @Enum(() => ProductCategory)
  @Field(type => ProductCategory)
  productCategory: ProductCategory;

  @Property({ nullable: true })
  @Field({ nullable: true }) // TODO: temporary nullable
  sellerId?: string; // TODO: temporary nullable, TODO: relationships based on mikro-orm

  @Property({ unique: true })
  @Field()
  @Length(3, 200, { message: `Product Name should be between 3 and 200 characters.` })
  name: string;

  @Property()
  @Field({ nullable: true, defaultValue: null }) // we define default value if used on dto if nullable
  sku?: string;

  @Property()
  @Field({ nullable: true, defaultValue: null })
  image?: string;

  @Property()
  @Field({ nullable: true, defaultValue: null })
  description?: string;

  @Property({ default: 1 })
  @Field({ defaultValue: 1 })
  @IsPositive({ message: `Selling Price needs to be greater than zero.`})
  sellingPrice: number;

  @Property()
  @Field({ nullable: true })
  avgReviewScore?: number;   // TODO: auto calculate average rating after new reviews left for this product.

  @Property()
  @Field({ nullable: true })
  deleteReason?: string;

  @Property({ type: DateType })
  @Field({ nullable: true })
  deletedAt?: Date;

  @Property({ type: DateType, onCreate: () => new Date() })
  @Field()
  createdAt: Date;

  @Property({ type: DateType, onCreate: () => new Date(), onUpdate: () => new Date() })
  @Field()
  lastUpdatedAt: Date;
}