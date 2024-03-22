import { IList } from "../../models/list";
import { badRequest, ok, serverError } from "../helpers";
import { HttpRequest, HttpResponse, IController } from "../protocols";
import { IDeleteListRepository } from "./protocols";

export class DeleteListController implements IController {
  constructor(private readonly deleteListRepository: IDeleteListRepository) {}

  async handle(
    httpRequest: HttpRequest<string>,
  ): Promise<HttpResponse<IList | string>> {
    try {
      const id = httpRequest?.params?.id;

      if (!id) return badRequest("Missing list id");

      const list = await this.deleteListRepository.deleteList(id);

      return ok(list);
    } catch (error) {
      return serverError();
    }
  }
}
