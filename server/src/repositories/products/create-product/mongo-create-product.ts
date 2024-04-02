import { ObjectId, PushOperator } from "mongodb";
import {
  IBrandsParam,
  ICreateProductParams,
  ICreateProductRepository,
} from "../../../controllers/products/create-product/protocols";
import { MongoClient } from "../../../database/mongo";
import { IProduct } from "../../../models/product";
import { fetchMongoProduct } from "../helpers";

export class MongoCreateProductRepository implements ICreateProductRepository {
  async createProduct(
    id: string,
    params: ICreateProductParams & IBrandsParam,
  ): Promise<IProduct> {
    const newProduct = { id: new ObjectId(), ...params };

    await MongoClient.db.collection("lists").findOneAndUpdate(
      { _id: new ObjectId(id) },
      {
        $push: {
          content: newProduct,
        } as unknown as PushOperator<Document>,
      },
    );

    const product = await fetchMongoProduct(newProduct.id.toHexString());
    return product;
  }
}
