import { IProduct } from "../../../models/product";
import {
  badRequest,
  checkCreateProductParams,
  ok,
  serverError,
} from "../../helpers";
import { HttpRequest, HttpResponse, IController } from "../../protocols";
import { ICreateProductParams, ICreateProductRepository } from "./protocols";

export class CreateProductController implements IController {
  constructor(
    private readonly createProductRepository: ICreateProductRepository,
  ) {}

  async handle(
    httpRequest: HttpRequest<ICreateProductParams>,
  ): Promise<HttpResponse<IProduct | string>> {
    try {
      const id = httpRequest?.params?.id;
      const body = httpRequest?.body;

      if (!id) return badRequest("Please specify an id");
      if (!body) return badRequest("Please specify a body");
      if (!checkCreateProductParams(body))
        return badRequest("One or more of the parameters is invalid");

      const product = await this.createProductRepository.createProduct(id, {
        ...body,
        brands: [],
      });

      return ok<IProduct>(product);
    } catch (error) {
      return serverError();
    }
  }
}
