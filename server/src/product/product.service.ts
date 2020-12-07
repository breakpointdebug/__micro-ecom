import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entity-gql-type/product';
import { CreateProduct } from './gql/dto/create-product.dto';
import { UpdateProduct } from './gql/dto/update-product.dto';
import { create_uuid_v4, format_uuid_v4 } from '../_utils/uuid-v4';

@Injectable()
export class ProductService {

  constructor(@InjectRepository(Product) private productRepository: Repository<Product>) {}

  async getAllActiveProducts(): Promise<Product[]> {
    const products = await this.productRepository.find({ isDeleted: false });
    if (!products) throw new NotFoundException(`No active products retrieved`);
    return products;
  }

  async findByProductId(productId: string): Promise<Product> {
    const product = await this.productRepository.findOne({ productId: format_uuid_v4(productId) });
    if (!product) throw new NotFoundException(`Product ${productId} not found!`);
    return product;
  }

  async findAllProductsBySellerId(sellerId: string): Promise<Product[]> {
    const products = await this.productRepository.find({ sellerId: format_uuid_v4(sellerId) });
    if (!products) throw new NotFoundException(`No products exist for sellerId: ${sellerId}`);
    return products;
  }

  async findProductsByName(name: string): Promise<Product[]> {
    const products = await this.productRepository.find({ where: { name: { $regex: `.*${name}.*`} } });
    if (!products) throw new NotFoundException(`No products exist containing name: ${name}`);
    return products;
  }

  async createProduct(createProductInput: CreateProduct): Promise<Product> {
    console.log({ ...createProductInput });
    const product = this.productRepository.create({ productId: create_uuid_v4(), ...createProductInput });
    return await this.productRepository.save(product);
  }

  async updateProduct(updateProductInput: UpdateProduct): Promise<Product> {
    const { productId } = updateProductInput;
    const product = await this.findByProductId(productId);
    if (product) {
      // TODO: is the product id the ownership of the currently logged in user?
      updateProductInput.productId = productId ? format_uuid_v4(productId) : null;
      // updateProductInput.productCategoryId = productCategoryId ? format_uuid_v4(productCategoryId) : null;
      return await this.productRepository.save({ ...product, ...updateProductInput });
    }
  }

  async deleteProduct(productId: string): Promise<Product> {
    // TODO: is the product id the ownership of the currently logged in user?
    // do not delete if product has currently an active order that is undelivered yet.
    return null;
  }
}