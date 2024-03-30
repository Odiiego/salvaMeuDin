import { ObjectId } from "mongodb";
import { IDeleteProductRepository } from "../../../controllers/products/delete-product/protocols";
import { MongoClient } from "../../../database/mongo";
import { IProduct } from "../../../models/product";

export class MongoDeleteProductRepository implements IDeleteProductRepository {
  async deleteProduct(productId: string): Promise<IProduct> {
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

    await MongoClient.db.collection("lists").findOneAndUpdate(
      { "content.id": new ObjectId(productId) },
      {
        $pull: {
          content: data.content,
        },
      },
    );

    return data.content;
  }
}
