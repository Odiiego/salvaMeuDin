import { IProduct } from "./product";

export interface IList {
  id: string;
  name: string;
  description: string;
  content: IProduct[];
}
