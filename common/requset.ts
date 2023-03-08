import { IHandleRequest } from "@/model/common/common";
import axios from "axios";

export const handleRequest: any = async (args: IHandleRequest) => {
  const { path, method, headers, data } = args;
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios[method](path, data, {
        headers: headers,
      });
      resolve(response.data);
    } catch (error) {
      reject(error as Error);
    }
  });
};
