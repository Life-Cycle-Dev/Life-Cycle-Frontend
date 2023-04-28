import HeaderBar from "@/components/HeaderBar";
import Navbar from "@/components/Navbar";
import DateIcon from "@/icons/DateIcon";
import { GetUserInfoResponse } from "@/model/users/users";
import moment from "moment";
import { useRouter } from "next/router";
import React, { useState } from "react";
import MyChart from "./chart";

export default function Sleep(props: {
  user: GetUserInfoResponse;
  setLoading: (loading: boolean) => void;
}) {
  const router = useRouter();
  const [date, setDate] = useState(moment().format("YYYY-MM-DD"));

  return (
    <>
      <Navbar />
      <HeaderBar headerName="Sleep Cycle" />
      <section>
        <div className="bg-background w-full h-screen text-textWhite p-5">
          <div className="mt-20 pb-20 ">
            <div className="shadow-md p-[30px] bg-backgroundInput backdrop-filter-[blur(35px)] rounded-[30px] ">
              <div className="text-[34px]">Take care of your sleep</div>

              <div className="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6">
                <div className="mt-2 flex items-center text-sm gap-1">
                  <DateIcon />
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    max={moment().format("YYYY-MM-DD")}
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
            <div className="mt-4 shadow-md p-[30px] bg-backgroundInput backdrop-filter-[blur(35px)] rounded-[30px] ">
              <div className="flex justify-between">
                <div>Sleep Time (week)</div>
                <button
                  onClick={() => router.push("/sleep/dashboard")}
                  className="text-primary underline"
                >
                  see more
                </button>
              </div>

              <MyChart />
            </div>
            <div className="mt-4 shadow-md p-[30px] bg-backgroundInput backdrop-filter-[blur(35px)] rounded-[30px] ">
              <div className="flex justify-between">
                <div>Snoring Time (week)</div>
                <button
                  onClick={() => router.push("/sleep/dashboard")}
                  className="text-primary underline"
                >
                  see more
                </button>
              </div>

              <MyChart />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
