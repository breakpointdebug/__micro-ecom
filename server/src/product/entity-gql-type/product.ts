import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, ObjectIdColumn, PrimaryColumn, UpdateDateColumn } from 'typeorm';
import { Field, ID, ObjectType } from '@nestjs/graphql';

@Entity('products')
@ObjectType('Product')
export class Product {

  @BeforeInsert()
  @BeforeUpdate()
  beforeInsertActions() {
    // this._productCategoryId = ''; // temporary
    // this._sellerId = '';  // temporary
    this.sku = '';
    this.image = '';
    this.description = '';
    this.sellingPrice = 0.0;
    this.avgReviewScore = 0.0;
    this.isDeleted = false;
    this.deleteReason = '';
    this.deletedAt = null;
  }

  @ObjectIdColumn()
  _productId: string;

  @PrimaryColumn()
  @Field(type => ID)
  productId: string;

  @Column()
  @Field({ nullable: true })
  _productCategoryId?: string;

  @Column()
  @Field({ nullable: true })
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
  avgReviewScore: number;

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