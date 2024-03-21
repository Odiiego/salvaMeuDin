import { ObjectId } from "mongodb";
import {
  IUpdateListParams,
  IUpdateListRepository,
} from "../../controllers/update-list/protocols";
import { MongoClient } from "../../database/mongo";
import { IList } from "../../models/list";

export class MongoUpdateListRepository implements IUpdateListRepository {
  async updateList(id: string, params: IUpdateListParams): Promise<IList> {
    await MongoClient.db
      .collection("lists")
      .updateOne({ _id: new ObjectId(id) }, { $set: { ...params } });
  }
}
