export interface HttpResponse<T> {
  statusCode: number;
  body: T | string;
}

export interface HttpRequest<B> {
  header?: string;
  params?: { id: string };
  body?: B;
}
