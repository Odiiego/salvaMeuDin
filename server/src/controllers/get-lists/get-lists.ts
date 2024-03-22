import { ok, serverError } from "../helpers";
import { IController } from "../protocols";
import { IGetListsRepository } from "./protocols";

export class GetListsController implements IController {
  constructor(private readonly getListsRepository: IGetListsRepository) {}

  async handle() {
    try {
      const lists = await this.getListsRepository.getLists();

      return ok(lists);
    } catch (error) {
      return serverError();
    }
  }
}
