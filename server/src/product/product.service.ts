import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.type';
import { CreateProduct, UpdateProduct, DeleteProduct } from './product.dto';
import { create_uuid_v4, format_uuid_v4 } from '../_utils/uuid-v4.utilities';
import { removeNullProperty } from '../_utils/null.utilities';

@Injectable()
export class ProductService {

  constructor(@InjectRepository(Product) private productRepo: Repository<Product>) {}

  //#region Query
  async getAllActiveProducts(): Promise<Product[]> {
    const products = await this.productRepo.find({ isDeleted: false });
    if (!products) throw new NotFoundException(`No active products retrieved`);
    return products;
  }

  async getProductById(productId: string): Promise<Product> {
    const product = await this.productRepo.findOne({ productId: format_uuid_v4(productId) });
    if (!product) throw new NotFoundException(`Product ${productId} not found!`);
    return product;
  }

  async getAllProductsBySellerId(sellerId: string): Promise<Product[]> {
    const products = await this.productRepo.find({ sellerId: format_uuid_v4(sellerId) });
    if (!products) throw new NotFoundException(`No products exist for sellerId: ${sellerId}`);
    return products;
  }

  async getProductsByName(name: string): Promise<Product[]> {
    const products = await this.productRepo.find({ where: { name: { $regex: `.*${name}.*`} } });
    if (!products) throw new NotFoundException(`No products exist containing name: ${name}`);
    return products;
  }
  //#endregion

  //#region Mutation
  async createProduct(createProductInput: CreateProduct): Promise<Product> {
    const product = this.productRepo.create({ productId: create_uuid_v4(), ...createProductInput });
    return await this.productRepo.save(product);
  }

  async updateProduct(updateProductInput: UpdateProduct): Promise<Product> {
    const { productId } = updateProductInput;
    if (!productId) throw new BadRequestException(`productId required`);
    const product = await this.getProductById(productId);
    if (product) {

      delete updateProductInput.productId;

      removeNullProperty<UpdateProduct>(updateProductInput);

      return await this.productRepo.save({ ...product, ...updateProductInput });
    }
  }

  async deleteProduct(deleteProductInput: DeleteProduct): Promise<Product> {
    // TODO: delete reason
    // TODO: is the product id the ownership of the currently logged in user?
    // TODO: do not delete if product has currently an active order that is undelivered yet.
    const { productId, deleteReason } = deleteProductInput;
    const product = await this.getProductById(productId);
    if (product) {
      return await this.productRepo.save({ ...product, isDeleted: true, deleteReason, deletedAt: new Date() });
    }
  }
  //#endregion
}