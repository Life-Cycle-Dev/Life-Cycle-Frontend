import { useRouter } from "next/router";
import { GetUserInfoResponse } from "@/model/users/users";
import Navbar from "@/components/Navbar";
import { getFoodOfUser } from "@/functions/eatCycle";
import { useEffect, useState } from "react";
import moment from "moment";
import Swal from "sweetalert2";
import HeaderBar from "@/components/HeaderBar";
import DateIcon from "@/icons/DateIcon";
import { __String } from "typescript";

export default function NewEat(props: {
  user: GetUserInfoResponse;
  setLoading: (loading: boolean) => void;
}) {
  const router = useRouter();
  const isServer = typeof window === "undefined";
  const [foodList, setFoodList] = useState<any[]>([]);
  const [date, setDate] = useState(moment().format("YYYY-MM-DD"));

  if (!isServer) {
    if (!props.user) {
      router.push("/login");
    }
  }

  useEffect(() => {
    props.setLoading(true);
    getFoodOfUser(date)
      .then((response) => {
        props.setLoading(false);
        setFoodList(response);
      })
      .catch((error) => {
        props.setLoading(false);
        Swal.fire({
          icon: "error",
          title: "error",
          text: (error as Error).message,
        });
      });
  }, [date]);

  return (
    <>
      <Navbar />
      <HeaderBar headerName="Eat Cycle" backRoute="/" />
      <section>
        <div className="bg-background w-full h-screen text-textWhite p-5">
          <div className="mt-20 pb-20 ">
            <div className="p-[30px] bg-backgroundInput backdrop-filter-[blur(35px)] rounded-[30px] ">
              <h1>"Default Bold/Large/Title 34"</h1>

              <div className="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6">
                <div className="mt-2 flex items-center text-sm text-gray-500 ">
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
                onClick={() => router.push("/eat/search")}
              >
                add food
              </button>
            </div>
            <div>
              <div className="flex rounded-[30px] bg-backgroundInput backdrop-filter-[blur(35px)] gap-4 p-4  mt-6 boredr-2">
                <div className="flex-auto">
                  <div className="flex flex-wrap">
                    <div className="flex-auto text-lg text-white font-semibold">
                      {date}
                    </div>
                    <div className="text-lg font-semibold text-gray-200">
                      {/* calculate cals */}
                      {foodList.reduce((a, b) => a + b.calorie, 0)} cals
                    </div>
                    <div className="w-full flex-none text-sm font-medium text-gray-200 mt-2 ">
                      {foodList.length} foods
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mb-10">
              {foodList.map((food, index) => {
                return (
                  <div
                    key={index}
                    className="flex rounded-[15px] bg-backgroundInput gap-4 px-4 py-2 mt-6"
                  >
                    <div className="flex-none w-11 relative ">
                      <img
                        src={food.img[0]?.url}
                        className="w-11 h-11 object-cover rounded-md"
                        loading="lazy"
                      />
                    </div>
                    <div className="flex-auto">
                      <div className="flex flex-wrap">
                        <div className="flex-auto text-lg font-semibold text-textWhite">
                          {food.name}
                        </div>
                        <div className="text-lg font-semibold text-textWhite">
                          {food.calorie} cals
                        </div>
                        <div className="w-full flex-none text-sm font-medium text-textWhite ">
                          {food.amount} gram(s)
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}