import { IList } from "../../../models/list";
import {
  badRequest,
  checkCreateListParams,
  created,
  serverError,
} from "../../helpers";
import { HttpRequest, HttpResponse, IController } from "../protocols";
import { ICreatListRepository, ICreateListParams } from "./protocols";

export class CreateListController implements IController {
  constructor(private readonly createListRepository: ICreatListRepository) {}

  async handle(
    httpRequest: HttpRequest<ICreateListParams>,
  ): Promise<HttpResponse<IList | string>> {
    try {
      if (!httpRequest.body) return badRequest("Please specify a body");

      if (!checkCreateListParams(httpRequest.body))
        return badRequest("Invalid parameter");

      const list = await this.createListRepository.createList({
        ...httpRequest.body,
        content: [],
      });

      return created<IList>(list);
    } catch (error) {
      return serverError();
    }
  }
}
