import { ICreateListParams } from "../controllers/create-list/protocols";

export default function isListParams(
  list: ICreateListParams,
): list is ICreateListParams {
  const { name, description } = list;
  if (name && description) {
    return true;
  }
  return false;
}
