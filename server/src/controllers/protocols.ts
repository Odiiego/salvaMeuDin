import { IUser } from "../models/user";

export interface HttpResponse<T> {
  statusCode: number;
  body: T;
}

export interface HttpRequest<B> {
  header?: string;
  user?: IUser;
  params?: {
    id?: string;
  };
  body?: B;
}

export interface IController {
  handle(httpRequest: HttpRequest<unknown>): Promise<HttpResponse<unknown>>;
}
