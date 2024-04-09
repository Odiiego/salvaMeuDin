import { IProduct } from "./product";

export interface IList {
  id: string;
  userId: string;
  name: string;
  description: string;
  content: IProduct[];
}
