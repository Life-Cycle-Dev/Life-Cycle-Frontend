import HeaderBar from "@/components/HeaderBar";
import Navbar from "@/components/Navbar";
import { GetUserInfoResponse } from "@/model/users/users";
import React, { useState, useRef, useEffect } from "react";
import Swal from "sweetalert2";
import {
  createTimeSleep,
  getPreviousDate,
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
  const [times, setTimes] = useState<Time>({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [running, setRunning] = useState(false);
  const [timeId, setTimeId] = useState<number>(-1);
  const volume = useRef(0);

  useEffect(() => {
    getSleepTime();
  }, []);

  const getSleepTime = async () => {
    try {
      const summarySleepTime = await getSummarySleepTime(
        new Date(getPreviousDate(new Date()))
      );
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

  const getMedia = (callback:(value:number, current:number) => void) => {
    if (localStorage.getItem("timer") !== "true"){
      return
    }
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then(stream => {
        const audioContext = new AudioContext();
        const analyser = audioContext.createAnalyser();
        const microphone = audioContext.createMediaStreamSource(stream);
        const javascriptNode = audioContext.createScriptProcessor(2048, 1, 1);
        analyser.smoothingTimeConstant = 0.4;
        analyser.fftSize = 1024;
        microphone.connect(analyser);
        analyser.connect(javascriptNode);
        javascriptNode.connect(audioContext.destination);
        javascriptNode.onaudioprocess = () => {
          var array = new Uint8Array(analyser.frequencyBinCount);
          analyser.getByteFrequencyData(array);
          var values = 0;
          var length = array.length;
          for (var i = 0; i < length; i++) {
            values += array[i];
          }
          volume.current = values / length;
          callback(values, volume.current);
        };
      })
      .catch(function (err) {
        console.log("The following error occured: " + err);
      });
  };

  const timer = (bedTime: Date) => {
    const intervel = setInterval(() => {
      const now: Date = new Date();
      const sleepTime: number = now.getTime() - bedTime.getTime();
      if (localStorage.getItem("timer") === "true") {
        setTimes(() => {
          const seconds = Math.floor((sleepTime / 1000) % 60);
          const minutes = Math.floor((sleepTime / (1000 * 60)) % 60);
          const hours = Math.floor((sleepTime / (1000 * 60 * 60)) % 24);
          getMedia((value, current) => {
            if (localStorage.getItem("timer") === "true"){
              console.log(value, current);
            }
          });
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

  const startRecord = async () => {
    try {
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
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "error",
        text: (error as Error).message,
      });
    }
  };

  const stopRecording = async () => {
    try {
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

  const formattedTime = `${times.hours < 10 ? "0" : ""}${times.hours}:${times.minutes < 10 ? "0" : ""
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
              className={`border border-primary w-full p-3 rounded-[16px] mt-5 text-primary ${running && "border-none"
                }`}
              onClick={startRecord}
              disabled={running}
            >
              {running ? "It's always time for a nap.." : "I will go to bed"}
            </button>

            <button
              className={`bg-primary w-full p-3 rounded-[16px] mt-5 ${!running && "opacity-5"
                }`}
              onClick={stopRecording}
              disabled={!running}
            >
              I am awake now
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
