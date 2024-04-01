export interface HttpResponse<T> {
  statusCode: number;
  body: T;
}

export interface HttpRequest<B> {
  header?: string;
  params?: {
    id?: string;
    listId?: string;
    productId?: string;
    brandId?: string;
  };
  body?: B;
}

export interface IController {
  handle(httpRequest: HttpRequest<unknown>): Promise<HttpResponse<unknown>>;
}
