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
    @Args('sellerId') sellerId: string
  ) {
    return this.productService.findAllProductsBySellerId(sellerId);
  }

  @Query(returns => [Product])
  async findProductsByName(
    @Args('name') name: string
  ) {
    return this.productService.findProductsByName(name);
  }

  @Mutation(returns => Product)
  async createProduct(
    @Args('createProductInput') createProductInput: CreateProduct
  ) {
    return this.productService.createProduct(createProductInput);
  }

  @Mutation(returns => Product)
  async updateProduct(
    @Args('updateProductInput') updateProductInput: UpdateProduct
  ) {
    return this.productService.updateProduct(updateProductInput);
  }

  @Mutation(returns => Product)
  async deleteProduct(
    @Args('productId') productId: string
  ) {
    return this.productService.deleteProduct(productId);
  }
}