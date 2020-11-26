import { BeforeInsert, Column, CreateDateColumn, Entity, ObjectID, ObjectIdColumn, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { Field, ID, ObjectType } from '@nestjs/graphql';

@Entity('products')
@ObjectType('Product')
export class Product {

  private nullOrValue(value) {
    return value === null ? null : value;
  }

  @BeforeInsert()
  beforeInsertActions() {
    // did not include nullable properties from DTO
    // productCategoryId, sellerId, sku, image, description
    // so that we also create columns on mongodb
    this.avgReviewScore = this.nullOrValue(this.avgReviewScore);
    this.isDeleted = this.isDeleted === true ? true : false;
    this.deleteReason = this.nullOrValue(this.deleteReason);
    this.deletedAt = this.nullOrValue(this.deletedAt);
  }

  // what?! defaults don't work for typeorm if linking with mongodb,
  // in case of graphql objectypes, you gotta specify if its nullable if you are lazy in passing all arguments on resolvers
  // your DTO can provide defaults

  @ObjectIdColumn()
  _productId: ObjectID;

  @PrimaryColumn()
  @Field(type => ID)
  productId: string;

  @Column()
  @Field({ nullable: true }) // TODO: temporary nullable
  productCategoryId?: string; // TODO: temporary nullable

  @Column()
  @Field({ nullable: true }) // TODO: temporary nullable
  sellerId?: string; // TODO: temporary nullable

  @Column()
  @Field()
  name: string;

  @Column()
  @Field({ nullable: true })
  sku?: string;

  @Column()
  @Field({ nullable: true })
  image?: string;

  @Column()
  @Field({ nullable: true })
  description?: string;

  @Column()
  @Field()
  sellingPrice: number;

  @Column()
  @Field({ nullable: true })
  avgReviewScore?: number;   // TODO: auto calculate average rating after new reviews left for this product.

  @Column()
  @Field()
  isDeleted?: boolean;

  @Column()
  @Field({ nullable: true })
  deleteReason?: string;

  @Column({ type: 'timestamp' })
  @Field({ nullable: true })
  deletedAt?: Date;

  @CreateDateColumn({ type: 'timestamp'})
  @Field()
  createdAt: Date;
}