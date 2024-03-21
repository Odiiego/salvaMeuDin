import { ICreateListParams } from "../controllers/create-list/protocols";

export default function isListParams(
  list: ICreateListParams,
): list is ICreateListParams {
  const { name, description, ...rest } = list;
  if (name && description && Object.keys(rest).length === 0) {
    return true;
  }
  return false;
}
