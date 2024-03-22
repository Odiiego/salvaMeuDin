import { IGetListsRepository } from "../../controllers/get-lists/protocols";
import { MongoClient } from "../../database/mongo";
import { IList } from "../../models/list";
import { MongoList } from "../mongo-protocols";

export class MongoGetListsRepository implements IGetListsRepository {
  async getLists(): Promise<IList[]> {
    const lists = await MongoClient.db
      .collection<MongoList>("lists")
      .find({})
      .toArray();

    return lists.map(({ _id, ...rest }) => ({
      ...rest,
      id: _id.toHexString(),
    }));
  }
}
