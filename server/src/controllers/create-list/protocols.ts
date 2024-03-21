import { IList } from "../../models/list";
import { HttpResponse, HttpRequest } from "../protocols";

export interface ICreateListController {
  handle(
    HttpRequest: HttpRequest<ICreateListParams>,
  ): Promise<HttpResponse<IList>>;
}

export interface ICreateListParams {
  name: string;
  description: string;
}

export interface IContentParam {
  content: IList[];
}

export interface ICreatListRepository {
  createList(params: ICreateListParams & IContentParam): Promise<IList>;
}
