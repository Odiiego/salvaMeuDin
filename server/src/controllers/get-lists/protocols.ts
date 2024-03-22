import { IList } from "../../models/list";

export interface IGetListsRepository {
  getLists(): Promise<IList[]>;
}
