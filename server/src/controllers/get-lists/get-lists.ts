import { IList } from "../../models/list";
import { ok, serverError } from "../helpers";
import { HttpRequest, HttpResponse, IController } from "../protocols";
import { IGetListsRepository } from "./protocols";

export class GetListsController implements IController {
  constructor(private readonly getListsRepository: IGetListsRepository) {}

  async handle(
    httpRequest: HttpRequest<string>,
  ): Promise<HttpResponse<IList[] | IList | string>> {
    try {
      const id = httpRequest?.params?.id;
      if (!id) {
        const lists = await this.getListsRepository.getLists();
        return ok(lists);
      }
      const list = await this.getListsRepository.getList(id);
      return ok(list);
    } catch (error) {
      return serverError();
    }
  }
}
