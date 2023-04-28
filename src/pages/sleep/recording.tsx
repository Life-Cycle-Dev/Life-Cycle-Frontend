import HeaderBar from "@/components/HeaderBar";
import Navbar from "@/components/Navbar";
import { GetUserInfoResponse } from "@/model/users/users";
import React, { useState, useRef } from "react";
import { handleRequest } from "../../../common/requset";
import { RequestMethod } from "@/model/common/common";
import Swal from "sweetalert2";

type Time = {
  hours: number;
  minutes: number;
  seconds: number;
};

export default function Recording(props: {
  user: GetUserInfoResponse;
  setLoading: (loading: boolean) => void;
}) {
  const [recording, setRecording] = useState(false);
  const [audioURL, setAudioURL] = useState("");
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);

  const [time, setTime] = useState<Time>({ hours: 0, minutes: 0, seconds: 0 });
  const [running, setRunning] = useState(false);
  const intervalRef = useRef<number>();
  const [timeId, setTimeId] = useState();

  const handleRecord = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      setRecording(true);
      mediaRecorderRef.current = new MediaRecorder(stream);

      mediaRecorderRef.current.addEventListener(
        "dataavailable",
        handleDataAvailable
      );
      mediaRecorderRef.current.start();
      const response = await handleRequest({
        path: `${process.env.NEXT_PUBLIC_BACKEND_PATH}/api/lca/insertTimeSleep`,
        method: RequestMethod.POST,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
        },
        data: {
          bedTime: "2023-01-20T00:00:00.001Z",
        },
      });
      await setTimeId(response.id);
      if (!running) {
        intervalRef.current = window.setInterval(() => {
          setTime((prevTime) => {
            const seconds = prevTime.seconds + 1;
            const minutes = prevTime.minutes + (seconds === 60 ? 1 : 0);
            const hours = prevTime.hours + (minutes === 60 ? 1 : 0);
            return {
              hours: hours,
              minutes: minutes % 60,
              seconds: seconds % 60,
            };
          });
        }, 1000);
        setRunning(true);
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "error",
        text: (error as Error).message,
      });
    }
  };

  const handleDataAvailable = (event: any) => {
    const blob = new Blob([event.data], { type: "audio/mp3" });
    const url = URL.createObjectURL(blob);
    setAudioURL(url);
  };

  const stopRecording = async () => {
    try {
      if (mediaRecorderRef.current) {
        mediaRecorderRef.current.stop();
        setRecording(false);
      }
      if (running) {
        window.clearInterval(intervalRef.current);
        setRunning(false);
      }
      await handleRequest({
        path: `${process.env.NEXT_PUBLIC_BACKEND_PATH}/api/lca/updateTimeSleep`,
        method: RequestMethod.PUT,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
        },
        data: {
          id: timeId,
          wakeUpTime: new Date(),
        },
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "error",
        text: (error as Error).message,
      });
    }
  };

  const formattedTime = `${time.hours < 10 ? "0" : ""}${time.hours}:${
    time.minutes < 10 ? "0" : ""
  }${time.minutes}:${time.seconds < 10 ? "0" : ""}${time.seconds}`;

  return (
    <>
      <Navbar />
      <HeaderBar headerName="Recording" />
      <section>
        <div className="bg-background w-full h-screen text-textWhite p-5">
          <div className="mt-20 pb-20 ">
            <div className="flex w-full text-[48px] font-bold	justify-center">
              {formattedTime}
            </div>

            <button
              className={`border border-primary w-full p-3 rounded-[16px] mt-5 text-primary ${
                running && "border-none"
              }`}
              onClick={handleRecord}
              disabled={running}
            >
              {running ? "Recording..." : "Start Record"}
            </button>

            <button
              className={`bg-primary w-full p-3 rounded-[16px] mt-5 ${
                !running && "opacity-5"
              }`}
              onClick={stopRecording}
              disabled={!running}
            >
              Stop Record
            </button>
            <div className="mt-2">
              {audioURL && <audio src={audioURL} controls />}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
