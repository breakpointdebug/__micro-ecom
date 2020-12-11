import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entity-gql-type/product';
import { CreateProduct } from './gql/dto/create-product.dto';
import { UpdateProduct } from './gql/dto/update-product.dto';
import { create_uuid_v4, format_uuid_v4 } from '../_utils/uuid-v4';
import { removeNullProperty } from '../_utils/null-utilities';

@Injectable()
export class ProductService {

  constructor(@InjectRepository(Product) private productRepository: Repository<Product>) {}

  async getAllActiveProducts(): Promise<Product[]> {
    const products = await this.productRepository.find({ isDeleted: false });
    if (!products) throw new NotFoundException(`No active products retrieved`);
    return products;
  }

  async getProductById(productId: string): Promise<Product> {
    const product = await this.productRepository.findOne({ productId: format_uuid_v4(productId) });
    if (!product) throw new NotFoundException(`Product ${productId} not found!`);
    return product;
  }

  async getAllProductsBySellerId(sellerId: string): Promise<Product[]> {
    const products = await this.productRepository.find({ sellerId: format_uuid_v4(sellerId) });
    if (!products) throw new NotFoundException(`No products exist for sellerId: ${sellerId}`);
    return products;
  }

  async getProductsByName(name: string): Promise<Product[]> {
    const products = await this.productRepository.find({ where: { name: { $regex: `.*${name}.*`} } });
    if (!products) throw new NotFoundException(`No products exist containing name: ${name}`);
    return products;
  }

  async createProduct(createProductInput: CreateProduct): Promise<Product> {
    const product = this.productRepository.create({ productId: create_uuid_v4(), ...createProductInput });
    return await this.productRepository.save(product);
  }

  async updateProduct(updateProductInput: UpdateProduct): Promise<Product> {
    const { productId } = updateProductInput;
    if (!productId) throw new BadRequestException(`productId required`);
    const product = await this.getProductById(productId);
    if (product) {

      delete updateProductInput.productId;

      removeNullProperty<UpdateProduct>(updateProductInput);

      return await this.productRepository.save({ ...product, ...updateProductInput });
    }
  }

  async deleteProduct(productId: string): Promise<Product> {
    // TODO: delete reason
    // TODO: is the product id the ownership of the currently logged in user?
    // TODO: do not delete if product has currently an active order that is undelivered yet.
    const product = await this.getProductById(productId);
    if (product) {
      return await this.productRepository.save({ ...product, isDeleted: true, deletedAt: new Date() });
    }
  }
}