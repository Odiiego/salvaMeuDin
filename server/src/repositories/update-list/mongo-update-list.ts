import { ObjectId } from "mongodb";
import {
  IUpdateListParams,
  IUpdateListRepository,
} from "../../controllers/update-list/protocols";
import { MongoClient } from "../../database/mongo";
import { IList } from "../../models/list";
import { MongoList } from "../mongo-protocols";

export class MongoUpdateListRepository implements IUpdateListRepository {
  async updateList(id: string, params: IUpdateListParams): Promise<IList> {
    await MongoClient.db
      .collection("lists")
      .updateOne({ _id: new ObjectId(id) }, { $set: { ...params } });

    const list = await MongoClient.db
      .collection<MongoList>("lists")
      .findOne({ _id: new ObjectId(id) });

    if (!list) {
      throw new Error("List not updated");
    }

    const { _id, ...rest } = list;
    return { id: _id.toHexString(), ...rest };
  }
}
