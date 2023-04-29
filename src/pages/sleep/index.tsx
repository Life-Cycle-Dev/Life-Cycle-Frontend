import HeaderBar from "@/components/HeaderBar";
import Navbar from "@/components/Navbar";
import SleepChartWeek from "@/components/chart/SleepChartWeek";
import SnoringChartWeek from "@/components/chart/SnoringChartWeek";
import DateIcon from "@/icons/DateIcon";
import { GetUserInfoResponse } from "@/model/users/users";
import moment from "moment";
import { useRouter } from "next/router";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function Sleep(props: {
  user: GetUserInfoResponse;
  setLoading: (loading: boolean) => void;
}) {
  const router = useRouter();
  const [date, setDate] = useState(moment().format("YYYY-MM-DD"));

  const onChangeDate = async (date: Date | null) => {
    if (!date) {
      return;
    }
    setDate(moment(date).format("YYYY-MM-DD"));
  }

  return (
    <>
      <Navbar />
      <HeaderBar headerName="Sleep Cycle" />
      <section>
        <div className="bg-background w-full h-screen text-textWhite p-5">
          <div className="mt-20 pb-20 ">
            <div className="shadow-md p-[30px] bg-backgroundInput backdrop-filter-[blur(35px)] rounded-[30px] ">
              <div className="text-[34px]">Record your sleep</div>

              <div className="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6">
                <div className="mt-2 flex items-center text-sm gap-1">
                  <DateIcon />
                  <DatePicker
                    onChange={(date) => onChangeDate(date)}
                    selected={new Date(date)}
                    maxDate={new Date()}
                    className="inline-flex items-center text-sm px-3 py-2 text-iconInput"
                  />
                </div>
              </div>
              <button
                className="bg-primary w-full p-3 rounded-[16px] mt-5"
                onClick={() => router.push("/sleep/recording")}
              >
                Record
              </button>
            </div>

            <div className={`shadow-md rounded-[30px] bg-backgroundInput backdrop-filter-[blur(35px)] gap-4 p-6 mt-6 boredr-2`}>
              <div className="mb-6 font-bold text-primary text-xl">Sleep times</div>
              <div>
                <SleepChartWeek currentDate={new Date(date)} />
              </div>
            </div>

            <div className={`shadow-md rounded-[30px] bg-backgroundInput backdrop-filter-[blur(35px)] gap-4 p-6 mt-6 boredr-2`}>
              <div className="mb-6 font-bold text-primary text-xl">Snoring times</div>
              <div>
                <SnoringChartWeek currentDate={new Date(date)} />
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
