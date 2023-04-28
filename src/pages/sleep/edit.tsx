import HeaderBar from "@/components/HeaderBar";
import Navbar from "@/components/Navbar";
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
            <div className="flex gap-2 items-center ">
              <DateIcon color="var(--textWhite)" />
              <div>{date}</div>
            </div>
            <div className="mt-2 ">
              <div>
                <label
                  htmlFor="start"
                  className="text-base font-medium text-gray-900"
                >
                  {" "}
                  Start with{" "}
                </label>
                <input
                  type="time"
                  id="appt"
                  name="start"
                  min="09:00"
                  max="18:00"
                  required
                  className="text-textWhite"
                ></input>
              </div>
              <div>
                <label
                  htmlFor="stop"
                  className="text-base font-medium text-gray-900"
                >
                  {" "}
                  End with{" "}
                </label>
                <input
                  type="time"
                  id="appt"
                  name="stop"
                  min="09:00"
                  max="18:00"
                  required
                  className="text-textWhite "
                ></input>
              </div>
            </div>
            <button
              className={`bg-primary w-full p-3 rounded-[16px] mt-5 `}
              onClick={() => {}}
              //   disabled={running}
            >
              Save
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
