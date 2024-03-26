import { IBrand } from "../../../models/brand";
import { IList } from "../../../models/list";

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
  ): Promise<IList>;
}
