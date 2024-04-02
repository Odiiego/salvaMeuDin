import { ObjectId } from "mongodb";
import { IDeleteProductRepository } from "../../../controllers/products/delete-product/protocols";
import { MongoClient } from "../../../database/mongo";
import { IProduct } from "../../../models/product";
import { fetchMongoProduct } from "../helpers";

export class MongoDeleteProductRepository implements IDeleteProductRepository {
  async deleteProduct(id: string): Promise<IProduct> {
    const product = await fetchMongoProduct(id);

    await MongoClient.db.collection("lists").findOneAndUpdate(
      { "content.id": new ObjectId(id) },
      {
        $pull: {
          content: product,
        },
      },
    );

    return product;
  }
}
