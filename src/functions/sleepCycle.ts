import { RequestMethod } from "@/model/common/common";
import { handleRequest } from "../../common/requset";
import { formatDate, getThaiDate } from "./common";
import axios from "axios";
import { GetSummaryPerDate } from "@/model/users/users";

export const createTimeSleep = async () => {
  try {
    const response = await handleRequest({
      path: `${process.env.NEXT_PUBLIC_BACKEND_PATH}/api/lca/insertTimeSleep`,
      method: RequestMethod.POST,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
      },
      data: { bedTime: getThaiDate(new Date()) },
    });
    return response.id;
  } catch (e: any) {
    if (e.context.sleepCycleId) {
      updateTimeSleep(e.context.sleepCycleId, {
        bedTime: getThaiDate(new Date()),
        wakeUpTime: null,
      });
      return e.context.sleepCycleId;
    }
  }
};

export const updateTimeSleep = async (id: number, data: any) => {
  try {
    const response = await handleRequest({
      path: `${process.env.NEXT_PUBLIC_BACKEND_PATH}/api/lca/updateTimeSleep`,
      method: RequestMethod.PUT,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
      },
      data: {
        id: id,
        ...data,
      },
    });
  } catch (error) {
    return Promise.reject({
      message: (error as Error).message,
    });
  }
};

export const getSummarySleepTime = async (startDate?: Date, endDate?: Date) => {
  try {
    const config = {
      url: `${
        process.env.NEXT_PUBLIC_BACKEND_PATH
      }/api/lca/getSummary?startDate=${formatDate(
        startDate ?? new Date()
      )}&endDate=${formatDate(endDate ?? new Date())}`,
      method: RequestMethod.GET,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
      },
    };
    const response = await axios(config);
    return response.data;
  } catch (error) {
    return Promise.reject({
      message: (error as Error).message,
    });
  }
};
