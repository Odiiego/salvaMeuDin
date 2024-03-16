import { IProduct } from "./product";

export interface IList {
  name: string;
  description: string;
  content: IProduct[];
}
