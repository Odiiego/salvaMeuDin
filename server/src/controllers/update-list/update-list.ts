import { IList } from "../../models/list";
import checkUpdateListParams from "../../utils/checkUpdateListParams";
import { HttpRequest, HttpResponse, IController } from "../protocols";
import { IUpdateListParams, IUpdateListRepository } from "./protocols";

export class UpdateListController implements IController {
  constructor(private readonly updateListRepository: IUpdateListRepository) {}
  async handle(
    httpRequest: HttpRequest<IUpdateListParams>,
  ): Promise<HttpResponse<IList>> {
    try {
      const id = httpRequest?.params?.id;
      const body = httpRequest?.body;

      if (!body) {
        return {
          statusCode: 400,
          body: "Please specify a body",
        };
      }

      if (!id) {
        return {
          statusCode: 400,
          body: "Missing user id",
        };
      }

      if (!checkUpdateListParams(body)) {
        return {
          statusCode: 403,
          body: "Invalid parameter",
        };
      }

      const list = await this.updateListRepository.updateList(id, body);

      return {
        statusCode: 200,
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
