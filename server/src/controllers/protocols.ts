export interface HttpResponse<T> {
  statusCode: number;
  body: T | string;
}

export interface HttpRequest<B> {
  header?: unknown;
  params?: unknown;
  body?: B;
}
