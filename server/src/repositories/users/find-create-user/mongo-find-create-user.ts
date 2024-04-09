// import { ObjectId } from "mongodb";
import { IFindCreateUserRepository } from "../../../controllers/users/find-or-create/protocols";
import { MongoClient } from "../../../database/mongo";
import { IUser } from "../../../models/user";
import { MongoUser } from "../../mongo-protocols";

export class MongoFindOrCreateUserRepository
  implements IFindCreateUserRepository
{
  async findOrCreateUser(user: MongoUser): Promise<IUser> {
    let newUser = await MongoClient.db
      .collection<MongoUser>("users")
      .findOne({ googleId: user.googleId });

    if (!newUser) {
      const { insertedId } = await MongoClient.db
        .collection("users")
        .insertOne(user);

      newUser = await MongoClient.db
        .collection<MongoUser>("users")
        .findOne({ _id: insertedId });
    }

    if (!newUser) {
      throw new Error("List not created");
    }

    const { _id, ...rest } = newUser;

    return { ...rest, id: _id.toHexString() };
  }
}
