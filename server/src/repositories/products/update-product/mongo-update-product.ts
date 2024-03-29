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
    const query =
      params.name && params.quantity
        ? {
            "content.$.name": params.name,
            "content.$.quantity": params.quantity,
          }
        : params.name
          ? {
              "content.$.name": params.name,
            }
          : {
              "content.$.quantity": params.quantity,
            };

    await MongoClient.db
      .collection("lists")
      .updateOne(
        { "content.id": new ObjectId(productId) },
        { $set: { ...query } },
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
