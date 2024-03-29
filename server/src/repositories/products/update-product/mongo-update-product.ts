import { ObjectId } from "mongodb";
import {
  IUpdateProductParams,
  IUpdateProductRepository,
} from "../../../controllers/products/update-product/protocols";
import { IList } from "../../../models/list";
import { MongoList } from "../../mongo-protocols";
import { MongoClient } from "../../../database/mongo";

export class MongoUpdateProductRepository implements IUpdateProductRepository {
  async updateProduct(
    listId: string,
    productId: string,
    params: IUpdateProductParams,
  ): Promise<IList> {
    const [data] = await MongoClient.db
      .collection("lists")
      .aggregate([
        {
          $match: {
            "content.id": new ObjectId(productId),
          },
        },
        { $unwind: "$content" },
        {
          $match: {
            "content.id": new ObjectId(productId),
          },
        },
      ])
      .toArray();

    await MongoClient.db
      .collection("lists")
      .updateOne(
        { "content.id": new ObjectId(productId) },
        { $set: { "content.$": { ...data.content, ...params } } },
      );

    const list = await MongoClient.db
      .collection<MongoList>("lists")
      .findOne({ _id: new ObjectId(listId) });

    if (!list) {
      throw new Error("List not updated");
    }

    const { _id, ...rest } = list;
    return { id: _id.toHexString(), ...rest };
  }
}
