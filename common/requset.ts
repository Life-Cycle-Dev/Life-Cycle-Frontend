import { IHandleRequest } from "@/model/common/common";
import axios, { AxiosError } from "axios";

export const handleRequest: any = async (args: IHandleRequest) => {
  const { path, method, headers, data } = args;
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios[method](path, data, {
        headers: headers,
      });
      resolve(response.data);
    } catch (error) {
      reject({
        message:
          ((error as AxiosError).response?.data as any)?.error?.message ||
          ((error as AxiosError).response?.data as any)?.message ||
          (error as AxiosError).response?.data ||
          "Something went wrong",
        context: (error as AxiosError).response?.data,
      });
    }
  });
};
