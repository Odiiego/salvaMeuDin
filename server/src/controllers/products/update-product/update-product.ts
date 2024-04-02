import { IProduct } from "../../../models/product";
import {
  badRequest,
  checkUpdateProductParams,
  ok,
  serverError,
} from "../../helpers";
import { HttpRequest, HttpResponse, IController } from "../../protocols";
import { IUpdateProductParams, IUpdateProductRepository } from "./protocols";

export class UpdateProductController implements IController {
  constructor(
    private readonly updateProductRepository: IUpdateProductRepository,
  ) {}

  async handle(
    httpRequest: HttpRequest<IUpdateProductParams>,
  ): Promise<HttpResponse<IProduct | string>> {
    try {
      const id = httpRequest?.params?.id;
      const body = httpRequest?.body;

      if (!id) return badRequest("Please specify an id");
      if (!body) return badRequest("Please specify a body");
      if (!checkUpdateProductParams(body))
        return badRequest("One or more of the parameters is invalid");

      const product = await this.updateProductRepository.updateProduct(id, {
        ...body,
      });

      return ok<IProduct>(product);
    } catch (error) {
      return serverError();
    }
  }
}
