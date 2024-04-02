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
      const id = httpRequest?.params?.id;
      const body = httpRequest?.body;

      if (!id) return badRequest("Please specify an id");
      if (!body) return badRequest("Please specify a body");
      if (!checkUpdateBrandParams(body))
        return badRequest("One or more of the parameters is invalid");

      const brand = await this.updateBrandRepository.updateBrand(id, body);

      return ok<IBrand>(brand);
    } catch (error) {
      return serverError();
    }
  }
}
