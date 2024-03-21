import { IList } from "../../models/list";
import isListParams from "../../utils/isListParams";
import { HttpRequest, HttpResponse } from "../protocols";
import {
  ICreatListRepository,
  ICreateListController,
  ICreateListParams,
} from "./protocols";

export class CreateListController implements ICreateListController {
  constructor(private readonly createListRepository: ICreatListRepository) {}

  async handle(
    HttpRequest: HttpRequest<ICreateListParams>,
  ): Promise<HttpResponse<IList>> {
    try {
      if (!HttpRequest.body) {
        return {
          statusCode: 400,
          body: "Please specify a body",
        };
      }

      if (!isListParams(HttpRequest.body)) {
        return {
          statusCode: 403,
          body: "Invalid parameter",
        };
      }

      const list = await this.createListRepository.createList({
        ...HttpRequest.body,
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
