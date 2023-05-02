import { RequestMethod } from "@/model/common/common";
import { handleRequest } from "../../common/requset";
import { formatDate, getThaiDate } from "./common";
import axios from "axios";

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

export function getPreviousDate(datetime: Date) {
  let date = new Date(datetime);
  if (date.getHours() < 12) {
    date = new Date(date.valueOf() - 1000 * 60 * 60 * 24);
  }
  return date.toISOString().split("T")[0];
}

export const getSummarySleepTime = async (startDate?: Date, endDate?: Date) => {
  try {
    const config = {
      url: `${process.env.NEXT_PUBLIC_BACKEND_PATH
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

export const recorderSleepCycleTime = async (timeSleepId: number, value: number, callback:any) => {
  try {
    const isSending = localStorage.getItem("isSending") || "false";
    if (isSending === "true") return;
    localStorage.setItem("isSending", "true");
    await sendSleepCycleTime({
      "sleepCycleId": timeSleepId,
      "startTime": getThaiDate(new Date()),
      "endTime": getThaiDate(new Date()),
      "value": value
    });
    callback();
  } catch (error) {
    setTimeout(() => {
      localStorage.setItem("isSending", "false");
    }, 5000);
  }
}

const sendSleepCycleTime = async (data: any) => {
  try {
    await handleRequest({
      path: `${process.env.NEXT_PUBLIC_BACKEND_PATH}/api/lca/insertTimeCycleLine`,
      method: RequestMethod.POST,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
      },
      data: data,
    })
    setTimeout(() => {
      localStorage.setItem("isSending", "false");
    }, 5000);
  }
  catch (error) {
    setTimeout(() => {
      localStorage.setItem("isSending", "false");
    }, 5000);
  }
}
