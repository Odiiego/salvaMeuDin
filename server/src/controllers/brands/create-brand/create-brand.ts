import { IBrand } from "../../../models/brand";
import {
  badRequest,
  checkCreateBrandParams,
  ok,
  serverError,
} from "../../helpers";
import { HttpRequest, HttpResponse, IController } from "../../protocols";
import { ICreateBrandParams, ICreateBrandRepository } from "./protocols";

export class CreateBrandController implements IController {
  constructor(private readonly createBrandRepository: ICreateBrandRepository) {}

  async handle(
    httpRequest: HttpRequest<ICreateBrandParams>,
  ): Promise<HttpResponse<IBrand | string>> {
    try {
      const id = httpRequest?.params?.id;
      const body = httpRequest?.body;

      if (!id) return badRequest("Please specify an id");
      if (!body) return badRequest("Please specify a body");
      if (!checkCreateBrandParams(body))
        return badRequest("One or more of the parameters is invalid");

      const brand = await this.createBrandRepository.createBrand(id, body);

      return ok<IBrand>(brand);
    } catch (error) {
      return serverError();
    }
  }
}
