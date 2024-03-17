import { IList } from "../../models/list";

export interface ICreateListParams {
  name: string;
  description: string;
}

export interface ICreatListRepository {
  createList(params: ICreateListParams): Promise<IList>;
}
