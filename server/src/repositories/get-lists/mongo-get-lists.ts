import { ObjectId } from "mongodb";
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
