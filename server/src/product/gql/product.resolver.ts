import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Product } from '../entity-gql-type/product';
import { ProductService } from '../product.service';
import { CreateOrUpdateProduct } from './cou-product.dto';

@Resolver(of => Product)
export class ProductResolver {

  constructor(private productService: ProductService) {}

  @Query(returns => String)
  async test() {
    return "hey";
  }

  @Mutation(returns => Product)
  async createProduct(
    @Args('createProductInput') createProductInput: CreateOrUpdateProduct
  ) {
    return this.productService.createProduct(createProductInput);
  }

  @Mutation(returns => Product)
  async updateProduct(
    @Args('updateProductInput') updateProductInput: CreateOrUpdateProduct
  ) {
    return this.productService.updateProduct("5fbee23c2654811a4017e3b7", updateProductInput);
  }
}