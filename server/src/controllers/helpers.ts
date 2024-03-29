import { ICreateListParams } from "./lists/create-list/protocols";
import { HttpResponse } from "./protocols";
import { IUpdateListParams } from "./lists/update-list/protocols";
import { ICreateProductParams } from "./products/create-product/protocols";

export const ok = <T>(body: T): HttpResponse<T> => ({
  statusCode: 200,
  body,
});

export const created = <T>(body: T): HttpResponse<T> => ({
  statusCode: 201,
  body,
});

export const badRequest = (message: string): HttpResponse<string> => ({
  statusCode: 400,
  body: message,
});

export const serverError = (): HttpResponse<string> => ({
  statusCode: 500,
  body: "Something went wrong",
});

export const checkCreateListParams = (
  list: ICreateListParams,
): list is ICreateListParams => {
  const { name, description, ...rest } = list;
  if (name && description && Object.keys(rest).length === 0) {
    return true;
  }
  return false;
};

export const checkCreateProductParams = (
  product: ICreateProductParams,
): product is ICreateProductParams => {
  const { quantity, name, ...rest } = product;

  if (quantity && name && Object.keys(rest).length === 0) {
    return true;
  }
  return false;
};

export const checkUpdateListParams = (
  list: IUpdateListParams,
): list is IUpdateListParams => {
  const { name, description, content, ...rest } = list;
  if ((name || description || content) && Object.keys(rest).length === 0) {
    return true;
  }
  return false;
};
