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
  const [food, setFood] = useState<string>("");

  const handleSearchFood = async (e: SyntheticEvent) => {
    e.preventDefault();
    router.push({
      pathname: "/eat/searchResult",
      query: { food: food },
    });
  };

  const handleFoodChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFood(e.target.value);
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
                      value={food}
                      onChange={handleFoodChange}
                    />
                  </div>
                </div>
                <button
                  className={`${
                    food && "bg-primary"
                  } bg-background w-full p-3 rounded-[16px] mt-5`}
                  type="submit"
                  disabled={!food}
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
