import { IList } from "./list";

export interface IUser {
  id: string;
  googleId: string;
  email: string;
  name: string;
  lists: IList[];
}
