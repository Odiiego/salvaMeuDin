import { ObjectId } from "mongodb";
import { MongoClient } from "../../database/mongo";

export const fetchMongoBrand = async (id: string) => {
  const [brand] = await MongoClient.db
    .collection("lists")
    .aggregate([
      {
        $match: {
          "content.brands.id": new ObjectId(id),
        },
      },
      { $unwind: "$content" },
      { $unwind: "$content.brands" },
      {
        $match: {
          "content.brands.id": new ObjectId(id),
        },
      },
    ])
    .toArray();

  return brand.content.brands;
};
