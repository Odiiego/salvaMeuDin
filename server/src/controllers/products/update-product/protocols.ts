import { IProduct } from "../../../models/product";

export interface IUpdateProductParams {
  quantity: number;
  name: string;
}

export interface IUpdateProductRepository {
  updateProduct(id: string, params: IUpdateProductParams): Promise<IProduct>;
}
