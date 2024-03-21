import { IList } from "../../models/list";
import { IProduct } from "../../models/product";
import { HttpRequest, HttpResponse } from "../protocols";

export interface IUpdateListParams {
  name?: string;
  description?: string;
  content?: IProduct[];
}

export interface IUpdateListController {
  handle(httpRequest: HttpRequest<unknown>): Promise<HttpResponse<IList>>;
}

export interface IUpdateListRepository {
  updateList(id: string, params: IUpdateListParams): Promise<IList>;
}
