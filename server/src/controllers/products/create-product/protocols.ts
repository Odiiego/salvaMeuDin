import { IBrand } from "../../../models/brand";
import { IProduct } from "../../../models/product";

export interface ICreateProductParams {
  quantity: number;
  name: string;
}

export interface IBrandsParam {
  brands: IBrand[];
}

export interface ICreateProductRepository {
  createProduct(
    id: string,
    params: ICreateProductParams & IBrandsParam,
  ): Promise<IProduct>;
}
