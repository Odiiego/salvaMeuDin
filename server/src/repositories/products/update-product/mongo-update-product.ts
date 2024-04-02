import { ObjectId } from "mongodb";
import {
  IUpdateProductParams,
  IUpdateProductRepository,
} from "../../../controllers/products/update-product/protocols";
import { MongoClient } from "../../../database/mongo";
import { fetchMongoProduct } from "../helpers";
import { IProduct } from "../../../models/product";

export class MongoUpdateProductRepository implements IUpdateProductRepository {
  async updateProduct(
    id: string,
    params: IUpdateProductParams,
  ): Promise<IProduct> {
    const product = await fetchMongoProduct(id);

    await MongoClient.db
      .collection("lists")
      .updateOne(
        { "content.id": new ObjectId(id) },
        { $set: { "content.$": { ...product, ...params } } },
      );

    const updatedProduct = await fetchMongoProduct(id);
    return updatedProduct;
  }
}
