import { Injectable } from '@nestjs/common';
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
}
