import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, ObjectIdColumn, PrimaryColumn } from 'typeorm';
import { Field, ID, ObjectType } from '@nestjs/graphql';

@Entity('products')
@ObjectType('Product')
export class Product {

  private defaultsFromNull<T>(value: T) {
    return value === null ? null : value;
  }

  @BeforeInsert()
  beforeInsertActions() {
    this._sellerId = this.defaultsFromNull<string>(this._sellerId);

    // this._productCategoryId = ''; // temporary
    // this._sellerId = '';  // temporary

    // this.sku = this.sku ? this.sku : '';
    // this.image = this.image ? this.image : '';
    // this.description = this.description ? this.description : '';
    // this.sellingPrice = this.sellingPrice ? this.sellingPrice : 0;
    // this.avgReviewScore = this.avgReviewScore ? this.avgReviewScore : 0;
    // this.isDeleted = this.isDeleted ? this.isDeleted : false;
    // this.deleteReason = '';
    // this.deletedAt = null;
  }

  // @BeforeUpdate()
  // beforeUpdateActions() {

  // }

  // what?! defaults don't work for typeorm if linking with mongodb,
  // in case of graphql objectypes, you gotta specify if its nullable if you are lazy in passing all arguments on resolvers
  // your DTO can provide defaults

  @ObjectIdColumn()
  _productId: string;

  @PrimaryColumn()
  @Field(type => ID)
  productId: string;

  @Column()
  @Field({ nullable: true })
  _productCategoryId?: string;

  @Column()
  @Field({ nullable: true})
  _sellerId?: string;

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
  @Field({ defaultValue: 0.0 })
  sellingPrice: number;

  @Column()
  @Field({ defaultValue: 0.0 })
  avgReviewScore: number;   // TODO: auto calculate average rating after new reviews left for this product.

  @Column()
  @Field({ defaultValue: true })
  isDeleted: boolean;

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