import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Products } from './product.entity';
import { ProductService } from './product.service';
import { CreateProduct, UpdateProduct, DeleteProduct } from './product.dto';
import { UsePipes, ValidationPipe } from '@nestjs/common';

@Resolver(of => Products)
export class ProductResolver {

  constructor(private productSvc: ProductService) { }

  @Query(returns => [Products])
  async getAllActiveProducts() {
    return await this.productSvc.getAllActiveProducts();
  }

  @Query(returns => Products)
  async getProductById(
    @Args('productId') productId: string
  ) {
    return await this.productSvc.getProductById(productId);
  }

  @Query(returns => [Products])
  async getAllProductsBySellerId(
    @Args('sellerId') sellerId: string
  ) {
    return await this.productSvc.getAllProductsBySellerId(sellerId);
  }

  @Query(returns => [Products])
  async getProductsByName(
    @Args('name') name: string
  ) {
    return await this.productSvc.getProductsByName(name);
  }

  @Mutation(returns => Products)
  @UsePipes(ValidationPipe)
  async createProduct(
    @Args('createProductInput') createProductInput: CreateProduct
  ) {
    return await this.productSvc.createProduct(createProductInput);
  }

  @Mutation(returns => Products)
  @UsePipes(ValidationPipe)
  async updateProduct(
    @Args('updateProductInput') updateProductInput: UpdateProduct
  ) {
    return await this.productSvc.updateProduct(updateProductInput);
  }

  @Mutation(returns => Products)
  async deleteProduct(
    @Args('deleteProductInput') deleteProductInput: DeleteProduct
  ) {
    return await this.productSvc.deleteProduct(deleteProductInput);
  }
}