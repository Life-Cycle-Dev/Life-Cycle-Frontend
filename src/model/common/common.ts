export enum RequestMethod {
  GET = "get",
  PUT = "put",
  POST = "post",
  DELETE = "delete",
}

export interface IHandleRequest {
  path: string;
  method: RequestMethod;
  headers?: {};
  data?: {};
}
