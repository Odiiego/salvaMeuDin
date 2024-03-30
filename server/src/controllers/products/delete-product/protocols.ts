import { IProduct } from "../../../models/product";

export interface IDeleteProductRepository {
  deleteProduct(id: string): Promise<IProduct>;
}
