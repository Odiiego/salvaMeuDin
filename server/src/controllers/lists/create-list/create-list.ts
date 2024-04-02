import { IList } from "../../../models/list";
import {
  badRequest,
  checkCreateListParams,
  created,
  serverError,
} from "../../helpers";
import { HttpRequest, HttpResponse, IController } from "../../protocols";
import { ICreatListRepository, ICreateListParams } from "./protocols";

export class CreateListController implements IController {
  constructor(private readonly createListRepository: ICreatListRepository) {}

  async handle(
    httpRequest: HttpRequest<ICreateListParams>,
  ): Promise<HttpResponse<IList | string>> {
    try {
      const body = httpRequest?.body;

      if (!body) return badRequest("Please specify a body");
      if (!checkCreateListParams(body)) return badRequest("Invalid parameter");

      const list = await this.createListRepository.createList({
        ...body,
        content: [],
      });

      return created<IList>(list);
    } catch (error) {
      return serverError();
    }
  }
}
