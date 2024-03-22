import { IList } from "../models/list";

export type MongoList = Omit<IList, "id">;
