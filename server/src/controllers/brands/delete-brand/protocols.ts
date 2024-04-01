import { IBrand } from "../../../models/brand";

export interface IDeleteBrandRepository {
  deleteBrand(id: string): Promise<IBrand>;
}
