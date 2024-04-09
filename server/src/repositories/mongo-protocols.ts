import { IUser } from "../models/user";
import { IList } from "../models/list";

export type MongoUser = Omit<IUser, "id">;
export type MongoList = Omit<IList, "id">;
