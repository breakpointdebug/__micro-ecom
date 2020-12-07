import { BeforeInsert, Column, CreateDateColumn, Entity, ObjectID, ObjectIdColumn, PrimaryColumn } from 'typeorm';
import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';
import { ProductCategory } from '../../_enums/product-category';
import { nullOrValue } from '../../_utils/null-or-value';

registerEnumType(ProductCategory, { name: 'ProductCategory' });

@Entity('products')
@ObjectType('Product')
export class Product {

  @BeforeInsert()
  beforeInsertActions() {
    // defaults only work on dto if passed, not on defaults as defined if entity.
    this.avgReviewScore = nullOrValue(this.avgReviewScore);
    this.isDeleted = this.isDeleted === true ? true : false; // false, undefined, or null then, false
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
  @Field()
  sellerId?: string; // TODO: temporary nullable

  @Column()
  @Field()
  name: string;

  @Column()
  @Field()
  sku?: string;

  @Column()
  @Field()
  image?: string;

  @Column()
  @Field()
  description?: string;

  @Column()
  @Field()
  sellingPrice: number;

  @Column()
  @Field()
  avgReviewScore?: number;   // TODO: auto calculate average rating after new reviews left for this product.

  @Column()
  @Field()
  isDeleted?: boolean;

  @Column()
  @Field()
  deleteReason?: string;

  @Column({ type: 'timestamp' })
  @Field({ nullable: true, defaultValue: null }) // dates needs nullable indicated
  deletedAt?: Date;

  @CreateDateColumn({ type: 'timestamp' })
  @Field()
  createdAt: Date;
}