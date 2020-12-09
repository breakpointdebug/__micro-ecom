import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Product } from '../entity-gql-type/product';
import { ProductService } from '../product.service';
import { CreateProduct } from './dto/create-product.dto';
import { UpdateProduct } from './dto/update-product.dto';

@Resolver(of => Product)
export class ProductResolver {

  constructor(private productService: ProductService) {}

  @Query(returns => String)
  async test() {
    return "done";
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
  async createProduct(
    @Args('createProductInput') createProductInput: CreateProduct
  ) {
    return await this.productService.createProduct(createProductInput);
  }

  @Mutation(returns => Product)
  async updateProduct(
    @Args('updateProductInput') updateProductInput: UpdateProduct
  ) {
    return await this.productService.updateProduct(updateProductInput);
  }

  @Mutation(returns => Product)
  async deleteProduct(
    @Args('productId') productId: string
  ) {
    return await this.productService.deleteProduct(productId);
  }
}