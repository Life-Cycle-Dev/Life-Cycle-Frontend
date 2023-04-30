import HeaderBar from "@/components/HeaderBar";
import Navbar from "@/components/Navbar";
import { getSummarySleepTime, updateTimeSleep } from "@/functions/sleepCycle";
import DateIcon from "@/icons/DateIcon";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { handleRequest } from "../../../common/requset";
import { RequestMethod } from "@/model/common/common";

export default function EditSleepTime(props: { setLoading: (loading: boolean) => void }) {
  const router = useRouter();
  const { date } = router.query;
  const [sleepTime, setSleepTime] = useState<string>("");
  const [wakeTime, setWakeTime] = useState<string>("");
  const [timeId, setTimeId] = useState<number>(-1);

  useEffect(() => {
    setSleepTime("");
    setWakeTime("");
    props.setLoading(true);
    fetchData()
  }, [date]);

  const fetchData = async () => {
    try {
      if (!date) {
        return;
      }
      const data = await getSummarySleepTime(new Date(date as string), new Date(date as string));
      props.setLoading(false);
      if (data.length > 0) {
        setSleepTime(convertDateTimeToStringInput(data[0].bedTime));
        setWakeTime(convertDateTimeToStringInput(data[0].wakeUpTime));
        setTimeId(data[0].id);
      }
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.message
      });
    }
  }

  const convertDateTimeToStringInput = (date: Date) => {
    return new Date(date).toISOString().slice(0, 16);
  }

  const convertStringInputToDateString = (date: string) => {
    return date + ":00.000Z";
  }

  const onChangeSleepTime = (event: any) => {
    setWakeTime("");
    setSleepTime(event.target.value);
  }

  const onChangeWakeTime = (event: any) => {
    setWakeTime(event.target.value);
  }

  const handleEditRecord = async () => {
    try {
      if (!sleepTime || !wakeTime) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Please fill in all fields"
        });
        return;
      }      

      if(timeId == -1){
        await handleRequest({
          path: `${process.env.NEXT_PUBLIC_BACKEND_PATH}/api/lca/insertTimeSleep`,
          method: RequestMethod.POST,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
          },
          data: { 
            bedTime: convertStringInputToDateString(sleepTime),
            wakeUpTime: convertStringInputToDateString(wakeTime) 
          },
        });
        await Swal.fire({
          icon: "success",
          title: "Success",
          text: "Add sleep time successfully"
        });
        router.push("/sleep");
      }

      await updateTimeSleep(timeId, {
        bedTime: convertStringInputToDateString(sleepTime),
        wakeUpTime: convertStringInputToDateString(wakeTime)
      });

      await Swal.fire({
        icon: "success",
        title: "Success",
        text: "Edit sleep time successfully"
      });
      router.push("/sleep");
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.message
      });
    }
  }

  return (
    <>
      <Navbar />
      <HeaderBar headerName="Edit Sleep Time" />
      <section>
        <div className="bg-background w-full h-screen text-textWhite p-5">
          <div className="mt-20 pb-20 ">
            <div>
              <div className="mt-2.5 relative text-gray-400 focus-within:text-gray-600">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <DateIcon color="var(--iconInput)" />
                </div>
                <input
                  type="string"
                  defaultValue={date}
                  placeholder="Date"
                  className="text-iconInput"
                  disabled
                />
              </div>
            </div>


            <div className="mt-8">
              <label
                className="text-base font-medium text-gray-900"
              >
                {" "}
                Sleep Time{" "}
              </label>
              <div className="mt-2.5 text-gray-400 focus-within:text-gray-600">
                <input
                  type="datetime-local"
                  className="text-textWhite pl-5"
                  onChange={onChangeSleepTime}
                  value={sleepTime}
                  min={typeof date == "string" ? convertDateTimeToStringInput(new Date(date)) : ""}
                />
              </div>
            </div>

            <div className="mt-8">
              <label
                className="text-base font-medium text-gray-900"
              >
                {" "}
                Wakeup Time{" "}
              </label>
              <div className="mt-2.5 text-gray-400 focus-within:text-gray-600">
                <input
                  type="datetime-local"
                  className="text-textWhite pl-5"
                  onChange={onChangeWakeTime}
                  value={wakeTime}
                  min={typeof date == "string" ? convertDateTimeToStringInput(new Date(date)) : ""}
                />
              </div>
            </div>

            <button
              className={`bg-primary w-full p-3 rounded-[16px] mt-8`}
              onClick={handleEditRecord}
            >
              Save
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
