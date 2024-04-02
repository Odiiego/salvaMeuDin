import { ObjectId } from "mongodb";
import { IDeleteBrandRepository } from "../../../controllers/brands/delete-brand/protocols";
import { MongoClient } from "../../../database/mongo";
import { IBrand } from "../../../models/brand";
import { fetchMongoBrand } from "../helpers";

export class MongoDeleteBrandRepository implements IDeleteBrandRepository {
  async deleteBrand(id: string): Promise<IBrand> {
    const brand = await fetchMongoBrand(id);

    await MongoClient.db.collection("lists").findOneAndUpdate(
      { "content.brands.id": new ObjectId(id) },
      {
        $pull: {
          "content.$.brands": brand,
        },
      },
    );

    return brand;
  }
}
