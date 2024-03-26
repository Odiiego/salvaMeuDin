import { ObjectId, PushOperator } from "mongodb";
import {
  IBrandsParam,
  ICreateProductParams,
  ICreateProductRepository,
} from "../../../controllers/products/create-product/protocols";
import { MongoClient } from "../../../database/mongo";
import { IList } from "../../../models/list";
import { MongoList } from "../../mongo-protocols";

export class MongoCreateProductRepository implements ICreateProductRepository {
  async createProduct(
    id: string,
    params: ICreateProductParams & IBrandsParam,
  ): Promise<IList> {
    await MongoClient.db.collection("lists").findOneAndUpdate(
      { _id: new ObjectId(id) },
      {
        $push: {
          content: { id: new ObjectId(), ...params },
        } as unknown as PushOperator<Document>,
      },
    );

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
