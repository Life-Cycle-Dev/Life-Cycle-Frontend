import HeaderBar from "@/components/HeaderBar";
import Navbar from "@/components/Navbar";
import ClockIcon from "@/icons/ClockIcon";
import DateIcon from "@/icons/DateIcon";
import { useRouter } from "next/router";
import React from "react";

export default function EditSleepTime() {
  const router = useRouter();
  const { date } = router.query;
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
              <div className="mt-2.5 relative text-gray-400 focus-within:text-gray-600">
                <div className="absolute inset-y-0 left-0 flex text-[12px] items-center pl-3 pointer-events-none">
                 <ClockIcon color="var(--textWhite)" />
                </div>
                <input
                  type="datetime"
                  placeholder="00:00"
                  className="text-textWhite"
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
              <div className="mt-2.5 relative text-gray-400 focus-within:text-gray-600">
                <div className="absolute inset-y-0 left-0 flex text-[12px] items-center pl-3 pointer-events-none">
                 <ClockIcon color="var(--textWhite)" />
                </div>
                <input
                  type="date-time"
                  placeholder="00:00"
                  className="text-textWhite"
                />
              </div>
            </div>

            <button
              className={`bg-primary w-full p-3 rounded-[16px] mt-8`}
              onClick={() => { }}
            >
              Save
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
