import { IList } from "../../models/list";
import checkCreateListParams from "../../utils/checkCreateListParams";
import { HttpRequest, HttpResponse, IController } from "../protocols";
import { ICreatListRepository, ICreateListParams } from "./protocols";

export class CreateListController implements IController {
  constructor(private readonly createListRepository: ICreatListRepository) {}

  async handle(
    httpRequest: HttpRequest<ICreateListParams>,
  ): Promise<HttpResponse<IList>> {
    try {
      if (!httpRequest.body) {
        return {
          statusCode: 400,
          body: "Please specify a body",
        };
      }

      if (!checkCreateListParams(httpRequest.body)) {
        return {
          statusCode: 403,
          body: "Invalid parameter",
        };
      }

      const list = await this.createListRepository.createList({
        ...httpRequest.body,
        content: [],
      });

      return {
        statusCode: 201,
        body: list,
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: "Something went wrong",
      };
    }
  }
}
