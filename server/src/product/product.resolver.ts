import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Product } from './product.type';
import { ProductService } from './product.service';
import { CreateProduct, UpdateProduct, DeleteProduct } from './product.dto';
import { UsePipes, ValidationPipe } from '@nestjs/common';

@Resolver(of => Product)
export class ProductResolver {

  constructor(private productService: ProductService) {}

  // TODO: remove this gql endpoint
  @Query(returns => String)
  async test() {
    return "done, you can test quick code here upon running";
  }

  @Query(returns => [Product])
  async getAllActiveProducts() {
    return await this.productService.getAllActiveProducts();
  }

  @Query(returns => Product)
  async getProductById(
    @Args('productId') productId: string
  ) {
    return await this.productService.getProductById(productId);
  }

  @Query(returns => [Product])
  async getAllProductsBySellerId(
    @Args('sellerId') sellerId: string
  ) {
    return await this.productService.getAllProductsBySellerId(sellerId);
  }

  @Query(returns => [Product])
  async getProductsByName(
    @Args('name') name: string
  ) {
    return await this.productService.getProductsByName(name);
  }

  @Mutation(returns => Product)
  @UsePipes(ValidationPipe)
  async createProduct(
    @Args('createProductInput') createProductInput: CreateProduct
  ) {
    return await this.productService.createProduct(createProductInput);
  }

  @Mutation(returns => Product)
  @UsePipes(ValidationPipe)
  async updateProduct(
    @Args('updateProductInput') updateProductInput: UpdateProduct
  ) {
    return await this.productService.updateProduct(updateProductInput);
  }

  @Mutation(returns => Product)
  async deleteProduct(
    @Args('deleteProductInput') deleteProductInput: DeleteProduct
  ) {
    return await this.productService.deleteProduct(deleteProductInput);
  }
}