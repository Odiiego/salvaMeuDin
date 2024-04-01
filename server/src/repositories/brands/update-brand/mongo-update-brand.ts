import { ObjectId } from "mongodb";
import {
  IUpdateBrandParams,
  IUpdateBrandRepository,
} from "../../../controllers/brands/update-brand/protocols";
import { IBrand } from "../../../models/brand";
import { MongoClient } from "../../../database/mongo";

export class MongoUpdateBrandRepository implements IUpdateBrandRepository {
  async updateBrand(
    productId: string,
    brandId: string,
    params: IUpdateBrandParams,
  ): Promise<IBrand> {
    const [data] = await MongoClient.db
      .collection("lists")
      .aggregate([
        {
          $match: {
            "content.brands.id": new ObjectId(brandId),
          },
        },
        { $unwind: "$content" },
        { $unwind: "$content.brands" },
        {
          $match: {
            "content.brands.id": new ObjectId(brandId),
          },
        },
      ])
      .toArray();

    await MongoClient.db.collection("lists").updateOne(
      { "content.brands.id": new ObjectId(brandId) },
      {
        $set: { "content.$[].brands.$": { ...data.content.brands, ...params } },
      },
    );

    const [newData] = await MongoClient.db
      .collection("lists")
      .aggregate([
        {
          $match: {
            "content.brands.id": new ObjectId(brandId),
          },
        },
        { $unwind: "$content" },
        { $unwind: "$content.brands" },
        {
          $match: {
            "content.brands.id": new ObjectId(brandId),
          },
        },
      ])
      .toArray();

    return newData.content.brands;
  }
}
