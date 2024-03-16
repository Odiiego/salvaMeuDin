import { IList } from "../../models/list";
import { HttpResponse } from "../protocols";

export interface IGetListsController {
  handle(): Promise<HttpResponse<IList[]>>;
}

export interface IGetListsRepository {
  getLists(): Promise<IList[]>;
}
