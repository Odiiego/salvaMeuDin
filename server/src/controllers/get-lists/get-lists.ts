import { IController } from "../protocols";
import { IGetListsRepository } from "./protocols";

export class GetListsController implements IController {
  constructor(private readonly getListsRepository: IGetListsRepository) {}

  async handle() {
    try {
      const lists = await this.getListsRepository.getLists();

      return {
        statusCode: 200,
        body: lists,
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: "Something went wrong.",
      };
    }
  }
}
