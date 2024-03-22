import { IList } from "../../models/list";
import { HttpRequest, HttpResponse } from "../protocols";
import { IDeleteListController, IDeleteListRepository } from "./protocols";

export class DeleteListController implements IDeleteListController {
  constructor(private readonly deleteListRepository: IDeleteListRepository) {}

  async handle(HttpRequest: HttpRequest<string>): Promise<HttpResponse<IList>> {
    try {
      const id = HttpRequest?.params?.id;

      if (!id) {
        return {
          statusCode: 400,
          body: "Missing list id",
        };
      }

      const list = await this.deleteListRepository.deleteList(id);

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
