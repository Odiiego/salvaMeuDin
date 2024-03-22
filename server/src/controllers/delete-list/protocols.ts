import { IList } from "../../models/list";

export interface IDeleteListRepository {
  deleteList(id: string): Promise<IList>;
}
