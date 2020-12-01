import { Column, CreateDateColumn, Entity, ObjectID, ObjectIdColumn, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { Field, ID, ObjectType } from '@nestjs/graphql';

@Entity('products')
@ObjectType('Product')
export class Product {

  @ObjectIdColumn()
  _productId: ObjectID;

  @PrimaryColumn()
  @Field(type => ID)
  productId: string;

  @Column()
  @Field({ nullable: true, defaultValue: null }) // TODO: temporary nullable
  productCategoryId?: string; // TODO: temporary nullable

  @Column()
  @Field({ nullable: true, defaultValue: null }) // TODO: temporary nullable
  sellerId?: string; // TODO: temporary nullable

  @Column()
  @Field()
  name: string;

  @Column()
  @Field({ nullable: true, defaultValue: null })
  sku?: string;

  @Column()
  @Field({ nullable: true, defaultValue: null })
  image?: string;

  @Column()
  @Field({ nullable: true })
  description?: string;

  @Column()
  @Field({ defaultValue: 0 })
  sellingPrice: number;

  @Column()
  @Field({ nullable: true, defaultValue: null })
  avgReviewScore?: number;   // TODO: auto calculate average rating after new reviews left for this product.

  @Column()
  @Field({ nullable: true, defaultValue: false})
  isDeleted?: boolean;

  @Column()
  @Field({ nullable: true, defaultValue: null })
  deleteReason?: string;

  @Column({ type: 'timestamp' })
  @Field({ nullable: true, defaultValue: null })
  deletedAt?: Date;

  @CreateDateColumn({ type: 'timestamp'})
  @Field()
  createdAt: Date;
}