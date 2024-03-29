import { IList } from "../../../models/list";

export interface IUpdateProductParams {
  quantity: number;
  name: string;
}

export interface IUpdateProductRepository {
  updateProduct(
    listId: string,
    productId: string,
    params: IUpdateProductParams,
  ): Promise<IList>;
}
