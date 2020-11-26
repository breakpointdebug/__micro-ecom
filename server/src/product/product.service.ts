import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entity-gql-type/product';
import { CreateOrUpdateProduct } from './gql/cou-product.dto';
import { v4 as uuid } from 'uuid';

@Injectable()
export class ProductService {

  constructor(@InjectRepository(Product) private productRepository: Repository<Product>) {}

  async createProduct(createProductInput: CreateOrUpdateProduct): Promise<Product> {
    const { _productCategoryId, name, sku, image, description, sellingPrice } = createProductInput;
    const product = this.productRepository.create({
      _productCategoryId, productId: uuid(), name, sku, image, description, sellingPrice
    });
    return this.productRepository.save(product);
  }

  // https://stackoverflow.com/questions/47792808/typeorm-update-item-and-return-it
  // https://stackoverflow.com/questions/60645944/typeorm-hooks-not-being-triggered-minimal-project-included

  // TODO: fix this.
  async updateProduct(_productId: string, updateProductInput: CreateOrUpdateProduct): Promise<Product> {
    const product = this.productRepository.findOne({ _productId });
    if (product) {
      return await this.productRepository
        .update({ _productId }, { ...updateProductInput })
        .then(res => {
          if (res.raw && res.raw.length >= 0) {
            return res.raw[0]
          } else {
            return product;
          }
        });
    } else {
      throw new NotFoundException(`Product not found!`);
    }
  }
}
