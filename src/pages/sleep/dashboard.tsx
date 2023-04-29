import HeaderBar from "@/components/HeaderBar";
import Navbar from "@/components/Navbar";
import { useRouter } from "next/router";
import React from "react";
import MyChart from "./chart";

export default function Dashboard() {
  const router = useRouter();
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return (
    <>
      <Navbar />
      <HeaderBar headerName="Sleep and Snoring Report" />
      <section>
        <div className="bg-background w-full h-screen text-textWhite p-5">
          <div className="mt-20 pb-20 ">
            <div className="flex flex-col gap-3">
              {days.map((day) => {
                return (
                  <>
                    <div className="shadow-md p-[10px] bg-backgroundInput backdrop-filter-[blur(35px)] rounded-[20px] ">
                      <div className="text-[15px] font-semibold	">
                        {day}, Nov 14
                      </div>
                      <MyChart />
                      <div className="flex justify-between">
                        <div className="w-[70%] text-[12px]">
                          <div
                            style={{
                              display: "grid",
                              gridTemplateColumns: "1fr 2fr",
                            }}
                          >
                            <div>Restful</div>
                            <div>: 9h 22m</div>
                          </div>
                          <div
                            style={{
                              display: "grid",
                              gridTemplateColumns: "1fr 2fr",
                            }}
                          >
                            <div>Time</div>
                            <div>: 8:16 pm - 6:21 am</div>
                          </div>
                          <div
                            style={{
                              display: "grid",
                              gridTemplateColumns: "1fr 2fr",
                            }}
                          >
                            <div>Snoring</div>
                            <div>: 13m</div>
                          </div>
                        </div>
                        <div className="flex flex-col justify-between items-end">
                          <div className="text-[15px]">9h 22m</div>
                          <button
                            className="w-[37px] bg-primary p-[6px] rounded-[10px] text-[10px] "
                            onClick={() => {
                              router.push({
                                pathname: "/sleep/edit",
                                query: { date: "2011-3-4" },
                              });
                            }}
                          >
                            Edit
                          </button>
                        </div>
                      </div>
                    </div>
                  </>
                );
              })}{" "}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
