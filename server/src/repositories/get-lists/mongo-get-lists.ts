import { IGetListsRepository } from "../../controllers/get-lists/protocols";
import { IList } from "../../models/list";

export class MongoGetListsRepository implements IGetListsRepository {
  async getLists(): Promise<IList[]> {
    return [
      {
        name: "Nome da Lista",
        description: "Essa é uma lista de teste",
        content: [],
      },
    ];
  }
}
