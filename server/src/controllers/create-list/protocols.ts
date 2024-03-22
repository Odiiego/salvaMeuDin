import { IList } from "../../models/list";
import { IProduct } from "../../models/product";

export interface ICreateListParams {
  name: string;
  description: string;
}

export interface IContentParam {
  content: IProduct[];
}

export interface ICreatListRepository {
  createList(params: ICreateListParams & IContentParam): Promise<IList>;
}
