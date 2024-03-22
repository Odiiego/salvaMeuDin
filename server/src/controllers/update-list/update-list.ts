import { IList } from "../../models/list";
import { badRequest, checkUpdateListParams, ok, serverError } from "../helpers";
import { HttpRequest, HttpResponse, IController } from "../protocols";
import { IUpdateListParams, IUpdateListRepository } from "./protocols";

export class UpdateListController implements IController {
  constructor(private readonly updateListRepository: IUpdateListRepository) {}
  async handle(
    httpRequest: HttpRequest<IUpdateListParams>,
  ): Promise<HttpResponse<IList | string>> {
    try {
      const id = httpRequest?.params?.id;
      const body = httpRequest?.body;

      if (!id) return badRequest("Missing user id");
      if (!body) return badRequest("Please specify a body");
      if (!checkUpdateListParams(body)) return badRequest("Invalid parameter");

      const list = await this.updateListRepository.updateList(id, body);
      return ok(list);
    } catch (error) {
      return serverError();
    }
  }
}
