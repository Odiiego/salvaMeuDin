import { IList } from "../../models/list";
import checkUpdateListParams from "../../utils/checkUpdateListParams";
import { HttpRequest, HttpResponse } from "../protocols";
import {
  IUpdateListController,
  IUpdateListParams,
  IUpdateListRepository,
} from "./protocols";

export class UpdateListController implements IUpdateListController {
  constructor(private readonly updateListRepository: IUpdateListRepository) {}
  async handle(
    HttpRequest: HttpRequest<IUpdateListParams>,
  ): Promise<HttpResponse<IList>> {
    try {
      const id = HttpRequest?.params?.id;
      const body = HttpRequest?.body;

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
