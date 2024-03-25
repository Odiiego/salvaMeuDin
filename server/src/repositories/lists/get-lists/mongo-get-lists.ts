import { ObjectId } from "mongodb";
import { MongoClient } from "../../../database/mongo";
import { MongoList } from "../../mongo-protocols";
import { IGetListsRepository } from "../../../controllers/lists/get-lists/protocols";
import { IList } from "../../../models/list";

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

  async getList(id: string): Promise<IList> {
    const list = await MongoClient.db
      .collection<MongoList>("lists")
      .findOne({ _id: new ObjectId(id) });

    if (!list) {
      throw new Error("List not found");
    }

    const { _id, ...rest } = list;
    return { id: _id.toHexString(), ...rest };
  }
}
