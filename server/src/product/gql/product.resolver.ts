import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Product } from '../entity-gql-type/product';
import { ProductService } from '../product.service';
import { CreateOrUpdateProduct } from './cou-product.dto';

@Resolver(of => Product)
export class ProductResolver {

  constructor(private productService: ProductService) {}

  @Query(returns => [Product])
  async getAllActiveProducts() {
    return this.productService.getAllActiveProducts();
  }

  @Query(returns => Product)
  async findByProductId(
    @Args('productId') productId: string
  ) {
    return this.productService.findByProductId(productId);
  }

  @Query(returns => [Product])
  async findAllProductsBySellerId(
    @Args('_sellerId') _sellerId: string
  ) {
    return this.productService.findAllProductsBySellerId(_sellerId);
  }

  @Mutation(returns => Product)
  async createProduct(
    @Args('createProductInput') createProductInput: CreateOrUpdateProduct
  ) {
    return this.productService.createProduct(createProductInput);
  }

  // @Mutation(returns => Product)
  // async updateProduct(
  //   @Args('updateProductInput') updateProductInput: CreateOrUpdateProduct
  // ) {
  //   return this.productService.updateProduct("5fbee23c2654811a4017e3b7", updateProductInput);
  // }
}