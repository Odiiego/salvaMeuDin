import { IBrand } from "../../../models/brand";
import { badRequest, ok, serverError } from "../../helpers";
import { HttpRequest, HttpResponse, IController } from "../../protocols";
import { IDeleteBrandRepository } from "./protocols";

export class DeleteBrandController implements IController {
  constructor(private readonly deleteBrandRepository: IDeleteBrandRepository) {}

  async handle(
    httpRequest: HttpRequest<unknown>,
  ): Promise<HttpResponse<unknown>> {
    try {
      const id = httpRequest.params?.id;

      if (!id) return badRequest("Missing brand id");

      const brand = await this.deleteBrandRepository.deleteBrand(id);
      return ok<IBrand>(brand);
    } catch (error) {
      return serverError();
    }
  }
}
