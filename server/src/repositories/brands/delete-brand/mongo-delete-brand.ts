import { ObjectId } from "mongodb";
import { IDeleteBrandRepository } from "../../../controllers/brands/delete-brand/protocols";
import { MongoClient } from "../../../database/mongo";
import { IBrand } from "../../../models/brand";

export class MongoDeleteBrandRepository implements IDeleteBrandRepository {
  async deleteBrand(id: string): Promise<IBrand> {
    const [data] = await MongoClient.db
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

    if (!data) {
      throw new Error("Brand not found");
    }

    await MongoClient.db.collection("lists").findOneAndUpdate(
      { "content.brands.id": new ObjectId(id) },
      {
        $pull: {
          "content.$.brands": data.content.brands,
        },
      },
    );

    return data.content.brands;
  }
}
