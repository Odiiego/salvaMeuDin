import { IProduct } from "../../../models/product";
import { badRequest, ok, serverError } from "../../helpers";
import { HttpRequest, HttpResponse, IController } from "../../protocols";
import { IDeleteProductRepository } from "./protocols";

export class DeleteProductController implements IController {
  constructor(
    private readonly deleteProductRepository: IDeleteProductRepository,
  ) {}

  async handle(
    httpRequest: HttpRequest<unknown>,
  ): Promise<HttpResponse<IProduct | string>> {
    try {
      const id = httpRequest?.params?.id;

      if (!id) return badRequest("Please specify an id");

      const product = await this.deleteProductRepository.deleteProduct(id);

      return ok<IProduct>(product);
    } catch (error) {
      return serverError();
    }
  }
}
