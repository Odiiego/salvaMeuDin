import { ObjectId } from "mongodb";
import {
  IUpdateBrandParams,
  IUpdateBrandRepository,
} from "../../../controllers/brands/update-brand/protocols";
import { IBrand } from "../../../models/brand";
import { MongoClient } from "../../../database/mongo";
import { fetchMongoBrand } from "../helpers";

export class MongoUpdateBrandRepository implements IUpdateBrandRepository {
  async updateBrand(id: string, params: IUpdateBrandParams): Promise<IBrand> {
    const brand = await fetchMongoBrand(id);

    await MongoClient.db.collection("lists").updateOne(
      { "content.brands.id": new ObjectId(id) },
      {
        $set: {
          "content.$.brands.$[x]": { ...brand, ...params },
        },
      },
      { arrayFilters: [{ "x.id": new ObjectId(id) }] },
    );

    const updatedBrand = await fetchMongoBrand(id);

    return updatedBrand;
  }
}
