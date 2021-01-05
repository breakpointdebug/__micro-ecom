import { EntityRepository, Repository } from "@mikro-orm/core";
import { Products } from "./product.entity";

@Repository(Products)
export class ProductsRepository extends EntityRepository<Products> { }