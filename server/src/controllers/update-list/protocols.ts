import { IList } from "../../models/list";
import { IProduct } from "../../models/product";

export interface IUpdateListParams {
  name?: string;
  description?: string;
  content?: IProduct[];
}

export interface IUpdateListRepository {
  updateList(id: string, params: IUpdateListParams): Promise<IList>;
}
