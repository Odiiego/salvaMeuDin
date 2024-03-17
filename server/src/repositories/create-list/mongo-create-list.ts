import {
  ICreatListRepository,
  ICreateListParams,
} from "../../controllers/create-list/protocols";
import { MongoClient } from "../../database/mongo";
import { IList } from "../../models/list";

export class MongoCreateListRepository implements ICreatListRepository {
  async createList(params: ICreateListParams): Promise<IList> {
    const { insertedId } = await MongoClient.db
      .collection("lists")
      .insertOne(params);

    const list = await MongoClient.db
      .collection<Omit<IList, "id">>("lists")
      .findOne({ _id: insertedId });

    if (!list) {
      throw new Error("List not created");
    }

    const { _id, ...rest } = list;

    return { id: _id.toHexString(), ...rest };
  }
}
