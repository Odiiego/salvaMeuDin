import { IUser } from "../../../models/user";
import { MongoUser } from "../../../repositories/mongo-protocols";

export interface IGoogleOauthUser {
  id: string;
  displayName: string;
  emails: [{ value: string; verified: true | false }];
}

export interface IFindCreateUserRepository {
  findOrCreateUser(user: MongoUser): Promise<IUser>;
}
