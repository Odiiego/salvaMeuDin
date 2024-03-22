import { ObjectId } from "mongodb";
import { IDeleteListRepository } from "../../controllers/delete-list/protocols";
import { IList } from "../../models/list";
import { MongoClient } from "../../database/mongo";

export class MongoDeleteListRepository implements IDeleteListRepository {
  async deleteList(id: string): Promise<IList> {
    const list = await MongoClient.db
      .collection<Omit<IList, "id">>("lists")
      .findOne({ _id: new ObjectId(id) });

    if (!list) {
      throw new Error("List not found");
    }

    const { deletedCount } = await MongoClient.db
      .collection("lists")
      .deleteOne({ _id: new ObjectId(id) });

    if (!deletedCount) {
      throw new Error("User not deleted");
    }

    const { _id, ...rest } = list;

    return { id: _id.toHexString(), ...rest };
  }
}
