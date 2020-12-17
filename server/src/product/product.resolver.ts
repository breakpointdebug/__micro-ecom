import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Product } from './product.type';
import { ProductService } from './product.service';
import { CreateProduct, UpdateProduct, DeleteProduct } from './product.dto';
import { UsePipes, ValidationPipe } from '@nestjs/common';

@Resolver(of => Product)
export class ProductResolver {

  constructor(private productSvc: ProductService) {}

  @Query(returns => [Product])
  async getAllActiveProducts() {
    return await this.productSvc.getAllActiveProducts();
  }

  @Query(returns => Product)
  async getProductById(
    @Args('productId') productId: string
  ) {
    return await this.productSvc.getProductById(productId);
  }

  @Query(returns => [Product])
  async getAllProductsBySellerId(
    @Args('sellerId') sellerId: string
  ) {
    return await this.productSvc.getAllProductsBySellerId(sellerId);
  }

  @Query(returns => [Product])
  async getProductsByName(
    @Args('name') name: string
  ) {
    return await this.productSvc.getProductsByName(name);
  }

  @Mutation(returns => Product)
  @UsePipes(ValidationPipe)
  async createProduct(
    @Args('createProductInput') createProductInput: CreateProduct
  ) {
    return await this.productSvc.createProduct(createProductInput);
  }

  @Mutation(returns => Product)
  @UsePipes(ValidationPipe)
  async updateProduct(
    @Args('updateProductInput') updateProductInput: UpdateProduct
  ) {
    return await this.productSvc.updateProduct(updateProductInput);
  }

  @Mutation(returns => Product)
  async deleteProduct(
    @Args('deleteProductInput') deleteProductInput: DeleteProduct
  ) {
    return await this.productSvc.deleteProduct(deleteProductInput);
  }
}