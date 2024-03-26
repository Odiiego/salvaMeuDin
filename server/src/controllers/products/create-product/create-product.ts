import { IList } from "../../../models/list";
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
  ): Promise<HttpResponse<IList | string>> {
    try {
      const id = httpRequest?.params?.id;
      const body = httpRequest?.body;

      if (!id) return badRequest("Missing list id");
      if (!body) return badRequest("Please specify a body");

      if (!checkCreateProductParams(body))
        return badRequest("Invalid parameter");

      const list = await this.createProductRepository.createProduct(id, {
        ...body,
        brands: [],
      });

      return ok<IList>(list);
    } catch (error) {
      return serverError();
    }
  }
}
