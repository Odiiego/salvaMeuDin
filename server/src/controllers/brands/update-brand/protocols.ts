import { IBrand } from "../../../models/brand";

export interface IUpdateBrandParams {
  name: string;
  quantity: number;
  price: number;
}

export interface IUpdateBrandRepository {
  updateBrand(
    productId: string,
    brandId: string,
    params: IUpdateBrandParams,
  ): Promise<IBrand>;
}
