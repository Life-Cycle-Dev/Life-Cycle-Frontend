import { useRouter } from "next/router";
import { GetUserInfoResponse } from "@/model/users/users";
import Navbar from "@/components/Navbar";
import { getFoodOfUser } from "@/functions/eatCycle";
import { useEffect, useState } from "react";
import moment from "moment";
import Swal from "sweetalert2";
import HeaderBar from "@/components/HeaderBar";
import CardTemplate from "@/components/card-template";

export default function NewEat(props: {
  user: GetUserInfoResponse;
  setLoading: (loading: boolean) => void;
}) {
  const router = useRouter();
  const isServer = typeof window === "undefined";
  const [foodList, setFoodList] = useState<any[]>([]);
  const [date, setDate] = useState(moment().format("YYYY-MM-DD"));

  // if (!isServer) {
  //   if (!props.user) {
  //     router.push("/login");
  //   }
  // }

  useEffect(() => {
    props.setLoading(true);
    getFoodOfUser()
      .then((response) => {
        console.log(response);
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
  }, []);

  // const onChangeDate = (e: any) => {
  //   props.setLoading(true);
  //   setDate(e.target.value);
  //   getFoodOfUser(e.target.value)
  //     .then((response) => {
  //       console.log(response);
  //       props.setLoading(false);
  //       setFoodList(response);
  //     })
  //     .catch((error) => {
  //       props.setLoading(false);
  //       Swal.fire({
  //         icon: "error",
  //         title: "error",
  //         text: (error as Error).message,
  //       });
  //     });
  // };

  return (
    <>
      <Navbar />
      <HeaderBar headerName="Eat Cycle" />
      <section>
        <div className="bg-background w-full h-screen text-textWhite p-5">
          <div className="mt-20 pb-20">
            <CardTemplate
              title="Default Bold/Large/Title 34"
              date={date}
              button="add food"
              onClickButton={() => router.push("/eat/search")}
            />

            {/* <div className="mt-3  gap-5 lg:mt-0 lg:ml-4 flex align-center">
            <span className="sm:ml-3">
              <input
                type="date"
                value={date}
                onChange={(e) => onChangeDate(e)}
                max={moment().format("YYYY-MM-DD")}
              />
            </span>
          </div> */}
            <div>
              <div className="flex rounded-[30px] bg-[linear-gradient(181.35deg,rgba(255,255,255,0.5)1.15%,rgba(255,255,255,0)_98.91%)] backdrop-sepia-[blur(35px)] gap-4 p-4  mt-6">
                <div className="flex-auto">
                  <div className="flex flex-wrap">
                    <div className="flex-auto text-lg text-white font-semibold">
                      {date}
                    </div>
                    <div className="text-lg font-semibold text-gray-200">
                      {/* calculate cals */}
                      {foodList.reduce((a, b) => a + b.calorie, 0)} cals
                    </div>
                    <div className="w-full flex-none text-sm font-medium text-gray-200 mt-2">
                      {foodList.length} foods
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
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
