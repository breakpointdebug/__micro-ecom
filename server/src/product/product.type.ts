import { BeforeInsert, Column, CreateDateColumn, Entity, ObjectID, ObjectIdColumn, PrimaryColumn, UpdateDateColumn } from 'typeorm';
import { Field, ID, InputType, ObjectType, registerEnumType } from '@nestjs/graphql';
import { ProductCategory } from './product.enum';
import { nullOrValue } from '../_utils/null.utilities';
import { IsPositive, Length } from 'class-validator';

registerEnumType(ProductCategory, { name: 'ProductCategory' });

/*
-- typeorm
-- @nestjs/graphql
-- class-validator
*/

@Entity('products')
@InputType('ProductInput')
@ObjectType('ProductType')
export class Product {

  // https://github.com/typeorm/typeorm/blob/master/docs/listeners-and-subscribers.md#beforeinsert
  @BeforeInsert()
  beforeInsertActions() {
    // during create/insert, defaults only work on dto if passed,
    // not on defaults as defined if entity
    this.avgReviewScore = this.avgReviewScore === null ? null : this.avgReviewScore;
    // this.isDeleted = this.isDeleted === true ? true : false; // false, undefined, or null then, false
    this.deleteReason = nullOrValue(this.deleteReason);
    this.deletedAt = nullOrValue(this.deletedAt);
  }

  @ObjectIdColumn()
  _productId: ObjectID;

  @PrimaryColumn()
  @Field(type => ID)
  productId: string;

  @Column()
  @Field(type => ProductCategory)
  productCategory: ProductCategory;

  @Column()
  @Field({ nullable: true, defaultValue: null }) // TODO: temporary nullable
  sellerId?: string; // TODO: temporary nullable

  @Column()
  @Field()
  @Length(3, 200, { message: `Product Name should be between 3 and 200 characters.` })
  name: string;

  @Column()
  @Field({ nullable: true, defaultValue: null })
  sku?: string;

  @Column()
  @Field({ nullable: true, defaultValue: null })
  image?: string;

  @Column()
  @Field({ nullable: true, defaultValue: null })
  description?: string;

  @Column()
  @Field({ defaultValue: 1 })
  @IsPositive({ message: `Selling Price needs to be greater than zero.`})
  sellingPrice: number;

  @Column()
  @Field({ nullable: true, defaultValue: null })
  avgReviewScore?: number;   // TODO: auto calculate average rating after new reviews left for this product.

  @Column()
  @Field({ nullable: true, defaultValue: null })
  deleteReason?: string;

  @Column({ type: 'timestamp' })
  @Field({ nullable: true, defaultValue: null })
  deletedAt?: Date;

  @CreateDateColumn({ type: 'timestamp' })
  @Field()
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  @Field()
  lastUpdatedAt: Date;
}