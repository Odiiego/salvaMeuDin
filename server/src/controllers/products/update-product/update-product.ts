import { IList } from "../../../models/list";
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
  ): Promise<HttpResponse<IList | string>> {
    try {
      const listId = httpRequest?.params?.listId;
      const productId = httpRequest?.params?.productId;
      const body = httpRequest?.body;

      if (!listId) return badRequest("Missing list id");
      if (!productId) return badRequest("Missing product id");
      if (!body) return badRequest("Please specify a body");

      if (!checkUpdateProductParams(body))
        return badRequest("Invalid parameter");

      const list = await this.updateProductRepository.updateProduct(
        listId,
        productId,
        { ...body },
      );

      return ok<IList>(list);
    } catch (error) {
      return serverError();
    }
  }
}
