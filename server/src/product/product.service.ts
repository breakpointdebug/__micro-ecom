import { BadRequestException, Injectable, NotFoundException, } from '@nestjs/common';
import { Products } from './product.entity';
import { CreateProduct, UpdateProduct, DeleteProduct } from './product.dto';
import { create_uuid_v4, format_uuid_v4 } from '../_utils/uuid-v4.utilities';
import { removeNullOrUndefinedProperty } from '../_utils/misc.utilities';
import { ProductsRepository } from './product.repository';


// https://www.npmjs.com/package/@mikro-orm/mongodb
// https://github.com/mikro-orm/express-ts-example-app/tree/master/app
// https://mikro-orm.io/docs/usage-with-nestjs/
// https://mikro-orm.github.io/docs/v3/usage-with-mongo/

@Injectable()
export class ProductService {

  // problem with EntityRepository? does not retrieve the specific data

  constructor(private readonly productRepo: ProductsRepository) { }

  //#region Query
  async getAllActiveProducts(): Promise<Products[]> {
    const products = null;


    console.log(await this.productRepo.findOne({ productId: "DADEE3895CD04E619F5F005816D16786" }));
    console.log(await this.productRepo.findOne({ productId: "7692438B807047B7AA72E0EED22F294E" }));


    // // returns first element, but provides the correct count
    // const fc = await this.productRepo.findAndCount({});
    // this.productRepo.flush();
    // console.log(fc);


    if (!products) throw new NotFoundException(`No active products retrieved`);
    return products;
  }

  async getProductById(productId: string): Promise<Products> {
    const product = await this.productRepo.findOne({ productId: format_uuid_v4(productId) });
    if (!product) throw new NotFoundException(`Product ${productId} not found!`);
    return product;
  }

  async getAllProductsBySellerId(sellerId: string): Promise<Products[]> {
    const products = await this.productRepo.findAll({ sellerId: format_uuid_v4(sellerId) });
    if (!products) throw new NotFoundException(`No products exist for sellerId: ${sellerId}`);
    return products;
  }

  async getProductsByName(name: string): Promise<Products[]> {
    const products = await this.productRepo.findAll({ name: `.*${name}.*` });
    if (!products) throw new NotFoundException(`No products exist containing name: ${name}`);
    return products;
  }
  //#endregion

  //#region Mutation
  async createProduct(createProductInput: CreateProduct): Promise<Products> {
    const product = this.productRepo.create({
      productId: create_uuid_v4(),
      ...createProductInput,
      avgReviewScore: null,
      deleteReason: null,
      deletedAt: null
    });
    await this.productRepo.persist(product).flush();
    return product;
  }

  async updateProduct(updateProductInput: UpdateProduct): Promise<Products> {
    const { productId } = updateProductInput;
    if (!productId) throw new BadRequestException(`productId required`);
    const product = await this.getProductById(productId);
    if (product) {

      delete updateProductInput.productId;

      removeNullOrUndefinedProperty<UpdateProduct>(updateProductInput);

      const updatedProduct = this.productRepo.create({ ...product, ...updateProductInput })

      await this.productRepo.persist(updatedProduct).flush();

      return updatedProduct;
    }
  }

  async deleteProduct(deleteProductInput: DeleteProduct): Promise<Products> {
    // TODO: delete reason
    // TODO: is the product id the ownership of the currently logged in user?
    // TODO: do not delete if product has currently an active order that is undelivered yet.
    const { productId, deleteReason } = deleteProductInput;
    const product = await this.getProductById(productId);
    if (product) {
      await this.productRepo.persist({ ...product, isDeleted: true, deleteReason, deletedAt: new Date() }).flush();
      return product;
    }
  }
  //#endregion
}