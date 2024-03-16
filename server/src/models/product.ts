import { IBrand } from "./brand";

export interface IProduct {
  quantity: number;
  name: string;
  brands: IBrand[];
}
