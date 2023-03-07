import axios from "axios";

export enum RequestMethod {
  GET = "get",
  PUT = "put",
  POST = "post",
  DELETE = "delete",
}

export type HandleRequestProp = {
  path: string;
  method: RequestMethod;
  headers?: {};
  data?: {};
};

export const handleRequest = async (args: HandleRequestProp) => {
  const { path, method, headers, data } = args;
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios[method](path, data, headers);
      resolve(response.data);
    } catch (error) {
      reject(error as Error);
    }
  });
};
