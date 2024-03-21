import { IUpdateListParams } from "../controllers/update-list/protocols";

export default function checkUpdateListParams(
  list: IUpdateListParams,
): list is IUpdateListParams {
  const { name, description, content, ...rest } = list;
  if ((name || description || content) && Object.keys(rest).length === 0) {
    return true;
  }
  return false;
}
