import HeaderBar from "@/components/HeaderBar";
import Navbar from "@/components/Navbar";
import { searchFood } from "@/functions/eatCycle";
import SearchIcon from "@/icons/SearchIcon";
import { GetUserInfoResponse } from "@/model/users/users";
import { useRouter } from "next/router";
import React, { ChangeEvent, SyntheticEvent, useState } from "react";

export default function SearchFood(props: {
  user: GetUserInfoResponse;
  setLoading: (loading: boolean) => void;
}) {
  const router = useRouter();
  // const [food, setFood] = useState<string>("");
  const handleSearchFood = async (e: SyntheticEvent) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      food: { value: string };
    };
    const food = target.food.value;
    router.push({
      pathname: "/eat/searchResult",
      query: { food: food },
    });
    // try {
    //   props.setLoading(true);
    //   const response = await searchFood(food);
    //   console.log(response.result);
    //   props.setLoading(false);
    // if (response.result.length == 0) {
    //   return Swal.fire({
    //     icon: "error",
    //     title: "error",
    //     text: "No result found " + food,
    //   });
    // }
    //   router.push("/eat/searchResult");
    //   // setFoodList([response.result[0]]);
    // } catch (error) {
    //   props.setLoading(false);
    //   Swal.fire({
    //     icon: "error",
    //     title: "error",
    //     text: (error as Error).message,
    //   });
    // }
  };
  return (
    <>
      <Navbar />
      <HeaderBar headerName="Search Food" />
      <section>
        <div className="bg-background w-full h-screen text-textWhite p-5">
          <div className="mt-20 pb-20">
            <div className="p-[30px] bg-backgroundInput backdrop-filter-[blur(35px)] rounded-[30px] ">
              <h1>Find the food you eat 🍽️ 🥗 🍕 🍜 ✨</h1>
              <form onSubmit={handleSearchFood}>
                <div className="mt-2 relative border border-primary rounded-[10px]">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none  ">
                    <SearchIcon />
                  </div>
                  <div>
                    <input
                      type="search"
                      placeholder="Enter your food"
                      name="food"
                    />
                  </div>
                </div>
                <button
                  className="bg-primary w-full p-3 rounded-[16px] mt-5"
                  type="submit"
                >
                  search
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
