import { IList } from "../../models/list";
import { HttpRequest, HttpResponse, IController } from "../protocols";
import { IDeleteListRepository } from "./protocols";

export class DeleteListController implements IController {
  constructor(private readonly deleteListRepository: IDeleteListRepository) {}

  async handle(httpRequest: HttpRequest<string>): Promise<HttpResponse<IList>> {
    try {
      const id = httpRequest?.params?.id;

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
