import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entity-gql-type/product';
import { CreateOrUpdateProduct } from './gql/cou-product.dto';
import { create_uuid_v4 } from '../_utils/uuid-v4';

@Injectable()
export class ProductService {

  constructor(@InjectRepository(Product) private productRepository: Repository<Product>) {}

  async getAllActiveProducts(): Promise<Product[]> {
    const products = await this.productRepository.find({ isDeleted: false });
    if (!products) throw new NotFoundException(`No active products retrieved`);
    return products;
  }

  async findByProductId(productId: string): Promise<Product> {
    const product = await this.productRepository.findOne({ productId });
    if (!product) throw new NotFoundException(`Product ${productId} not found!`);
    return product;
  }

  async findAllProductsBySellerId(sellerId: string): Promise<Product[]> {
    const products = await this.productRepository.find({ sellerId });
    if (!products) throw new NotFoundException(`No products exist for sellerId: ${sellerId}`);
    return products;
  }

  async findProductsByName(name: string): Promise<Product> {
    return null; // TODO: implementation
  }

  async createProduct(createProductInput: CreateOrUpdateProduct): Promise<Product> {
    const { productCategoryId, sellerId, name, sku, image, description, sellingPrice } = createProductInput;
    const product = this.productRepository.create({
      productId: create_uuid_v4(), productCategoryId, sellerId, name, sku, image, description, sellingPrice
    });
    return await this.productRepository.save(product);
  }



  // https://stackoverflow.com/questions/47792808/typeorm-update-item-and-return-it
  // https://stackoverflow.com/questions/60645944/typeorm-hooks-not-being-triggered-minimal-project-included

  // TODO: fix this.
//   async updateProduct(_productId: string, updateProductInput: CreateOrUpdateProduct): Promise<Product> {

//     const product = this.productRepository.findOne({ _productId });
//     if (product) {
//       return await this.productRepository
//         .update({ _productId }, { ...updateProductInput })
//         .then(res => {
//           if (res.raw && res.raw.length >= 0) {
//             return res.raw[0]
//           } else {
//             return product;
//           }
//         });
//     } else {
//       throw new NotFoundException(`Product not found!`);
//     }
//   }
// }
}