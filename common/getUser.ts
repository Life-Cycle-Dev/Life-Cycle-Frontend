import { GetUserInfoResponse } from "@/model/users/users";
import { RequestMethod } from "./../src/model/common/common";
import axios from "axios";

export const getUser = async (jwt: string): Promise<GetUserInfoResponse> => {
  var config = {
    method: RequestMethod.GET,
    maxBodyLength: Infinity,
    url: `${process.env.NEXT_PUBLIC_BACKEND_PATH}/api/users/me?populate=profileImage`,
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  };
  return new Promise<GetUserInfoResponse>(async (resolve, reject) => {
    try {
      const response = await axios(config);
      resolve(response.data);
    } catch (error) {
      reject(error as Error);
    }
  });
};
