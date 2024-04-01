import { IBrand } from "../../../models/brand";
import {
  badRequest,
  checkUpdateBrandParams,
  ok,
  serverError,
} from "../../helpers";
import { HttpRequest, HttpResponse, IController } from "../../protocols";
import { IUpdateBrandParams, IUpdateBrandRepository } from "./protocols";

export class UpdateBrandController implements IController {
  constructor(private readonly updateBrandRepository: IUpdateBrandRepository) {}

  async handle(
    httpRequest: HttpRequest<IUpdateBrandParams>,
  ): Promise<HttpResponse<IBrand | string>> {
    try {
      const productId = httpRequest.params?.productId;
      const brandId = httpRequest.params?.brandId;
      const body = httpRequest.body;

      if (!productId) return badRequest("Missing product id");
      if (!brandId) return badRequest("Missing brand id");
      if (!body) return badRequest("Missing parameters");

      if (!checkUpdateBrandParams(body)) return badRequest("Invalid parameter");

      const brand = await this.updateBrandRepository.updateBrand(
        productId,
        brandId,
        body,
      );

      return ok<IBrand>(brand);
    } catch (error) {
      console.log(error);
      return serverError();
    }
  }
}
