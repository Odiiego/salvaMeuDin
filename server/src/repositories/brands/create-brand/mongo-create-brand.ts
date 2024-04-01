import { ObjectId, PushOperator } from "mongodb";
import {
  ICreateBrandParams,
  ICreateBrandRepository,
} from "../../../controllers/brands/create-brand/protocols";
import { MongoClient } from "../../../database/mongo";
import { IBrand } from "../../../models/brand";

export class MongoCreateBrandRepository implements ICreateBrandRepository {
  async createBrand(id: string, params: ICreateBrandParams): Promise<IBrand> {
    const brand = { id: new ObjectId(), ...params };

    await MongoClient.db
      .collection("lists")
      .updateOne({ "content.id": new ObjectId(id) }, {
        $push: { "content.$.brands": brand },
      } as unknown as PushOperator<Document>);

    return { ...brand, id: brand.id.toHexString() };
  }
}
