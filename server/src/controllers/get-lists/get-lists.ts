import { IGetListsController, IGetListsRepository } from "./protocols";

export class GetListsController implements IGetListsController {
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
