import HeaderBar from "@/components/HeaderBar";
import Navbar from "@/components/Navbar";
import { GetUserInfoResponse } from "@/model/users/users";
import React, { useState, useRef, useEffect } from "react";
import Swal from "sweetalert2";
import {
  createTimeSleep,
  getSummarySleepTime,
  updateTimeSleep,
} from "@/functions/sleepCycle";
import { getThaiDate } from "@/functions/common";

type Time = {
  hours: number;
  minutes: number;
  seconds: number;
};

export default function Recording(props: {
  user: GetUserInfoResponse;
  setLoading: (loading: boolean) => void;
}) {
  const [audioURL, setAudioURL] = useState("");
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);

  const [times, setTimes] = useState<Time>({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [running, setRunning] = useState(false);
  const [timeId, setTimeId] = useState<number>(-1);

  useEffect(() => {
    getSleepTime();
  }, []);

  const timer = (bedTime: Date) => {
    const intervel = setInterval(() => {
      const now: Date = new Date();
      const sleepTime: number = now.getTime() - bedTime.getTime();
      if (localStorage.getItem("timer") === "true") {
        setTimes(() => {
          const seconds = Math.floor((sleepTime / 1000) % 60);
          const minutes = Math.floor((sleepTime / (1000 * 60)) % 60);
          const hours = Math.floor((sleepTime / (1000 * 60 * 60)) % 24);
          return {
            hours: hours,
            minutes: minutes,
            seconds: seconds,
          };
        });
      } else {
        clearInterval(intervel);
      }
    }, 1000);
  };

  const getSleepTime = async () => {
    try {
      const summarySleepTime = await getSummarySleepTime();
      const bedTime = new Date(summarySleepTime[0].bedTime);
      const now: Date = summarySleepTime[0].wakeUpTime
        ? new Date(summarySleepTime[0].wakeUpTime)
        : new Date();
      if (summarySleepTime[0].wakeUpTime) {
        now.setHours(now.getHours() - 7);
      }
      bedTime.setHours(bedTime.getHours() - 7);
      timer(bedTime);
      setRunning(summarySleepTime[0].wakeUpTime === null);
      localStorage.setItem(
        "timer",
        summarySleepTime[0].wakeUpTime === null ? "true" : "false"
      );
      setTimeId(summarySleepTime[0].id);
      const sleepTime: number = now.getTime() - bedTime.getTime();
      setTimes(() => {
        const seconds = Math.floor((sleepTime / 1000) % 60);
        const minutes = Math.floor((sleepTime / (1000 * 60)) % 60);
        const hours = Math.floor((sleepTime / (1000 * 60 * 60)) % 24);
        return {
          hours: hours,
          minutes: minutes,
          seconds: seconds,
        };
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "error",
        text: (error as Error).message,
      });
    }
  };

  const handleRecord = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      setRunning(true);
      await handleCreateOrUpdateTimeSleep();
      if (localStorage.getItem("timer") == "false") {
        localStorage.setItem("timer", "true");
        setTimes({
          hours: 0,
          minutes: 0,
          seconds: 0,
        });
        await timer(new Date());
      }
      mediaRecorderRef.current = new MediaRecorder(stream);
      mediaRecorderRef.current.addEventListener(
        "dataavailable",
        handleDataAvailable
      );
      mediaRecorderRef.current.start();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "error",
        text: (error as Error).message,
      });
    }
  };

  const handleCreateOrUpdateTimeSleep = async () => {
    try {
      const id: any = await createTimeSleep();
      await setTimeId(id);
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
      }
      localStorage.setItem("timer", "false");
      await updateTimeSleep(timeId, {
        wakeUpTime: getThaiDate(new Date()),
      });
      setRunning(false);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "error",
        text: (error as Error).message,
      });
    }
  };

  const formattedTime = `${times.hours < 10 ? "0" : ""}${times.hours}:${
    times.minutes < 10 ? "0" : ""
  }${times.minutes}:${times.seconds < 10 ? "0" : ""}${times.seconds}`;

  return (
    <>
      <Navbar />
      <HeaderBar headerName="Recording" />
      <section>
        <div className="bg-background w-full h-screen text-textWhite p-5">
          <div className="mt-20 pb-20 ">
            <div className="w-full text-center">You have been sleeping for</div>
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
              {running ? "It's always time for a nap.." : "I will go to bed"}
            </button>

            <button
              className={`bg-primary w-full p-3 rounded-[16px] mt-5 ${
                !running && "opacity-5"
              }`}
              onClick={stopRecording}
              disabled={!running}
            >
              I am awake now
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
