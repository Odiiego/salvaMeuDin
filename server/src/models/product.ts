import { IBrand } from "./brand";

export interface IProduct {
  id: string;
  quantity: number;
  name: string;
  brands: IBrand[];
}
