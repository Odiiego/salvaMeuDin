import { ObjectId } from "mongodb";
import { MongoClient } from "../../database/mongo";

export async function fetchMongoProduct(id: string) {
  const [product] = await MongoClient.db
    .collection("lists")
    .aggregate([
      {
        $match: {
          "content.id": new ObjectId(id),
        },
      },
      { $unwind: "$content" },
      {
        $match: {
          "content.id": new ObjectId(id),
        },
      },
    ])
    .toArray();

  return product.content;
}
