import { IBrand } from "../../../models/brand";

export interface ICreateBrandParams {
  quantity: number;
  name: string;
  price: number;
}

export interface ICreateBrandRepository {
  createBrand(id: string, params: ICreateBrandParams): Promise<IBrand>;
}
