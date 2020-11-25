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
}