export interface ICreateOrUpdateProduct {
  name: string;

  sku?: string;

  image?: string;

  description?: string;

  sellingPrice: number;
}
