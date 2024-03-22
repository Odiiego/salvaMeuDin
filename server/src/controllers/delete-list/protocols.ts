import { IList } from "../../models/list";
import { HttpRequest, HttpResponse } from "../protocols";

export interface IDeleteListController {
  handle(HttpRequest: HttpRequest<string>): Promise<HttpResponse<IList>>;
}

export interface IDeleteListRepository {
  deleteList(id: string): Promise<IList>;
}
