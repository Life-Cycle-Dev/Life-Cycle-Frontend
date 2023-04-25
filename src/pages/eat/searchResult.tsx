import HeaderBar from "@/components/HeaderBar";
import Navbar from "@/components/Navbar";
import { searchFood } from "@/functions/eatCycle";
import { GetUserInfoResponse } from "@/model/users/users";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

export default function SearchResult(props: {
  user: GetUserInfoResponse;
  setLoading: (loading: boolean) => void;
}) {
  const router = useRouter();
  const { food } = router.query;

  useEffect(() => {
    props.setLoading(true);
    searchFood(food?.toString() || "").then((response) => {
      console.log(response);
      props.setLoading(false);
    });
  }, []);

  return (
    <>
      <Navbar />
      <HeaderBar headerName={food?.toString() || ""} />
      <section>
        <div className="bg-background w-full h-screen text-textWhite p-5">
          <div className="mt-20 pb-20">
            <div className="flex justify-between">
              <div className="flex-none w-[120px] relative ">
                <img
                  src="http://t1.gstatic.com/licensed-image?q=tbn:ANd9GcRRv9ICxXjK-LVFv-lKRId6gB45BFoNCLsZ4dk7bZpYGblPLPG-9aYss0Z0wt2PmWDb"
                  className="w-[120px] h-[120px] object-cover rounded-[25px]"
                  loading="lazy"
                />
              </div>
              <div className="w-[60%]">
                <div className="text-[22px]">Title</div>
                <div className="flex justify-between text-[12px] text-iconInput">
                  <div>Calories</div>
                  <div>2 (kcal/100g)</div>
                </div>
                <div className="flex justify-between text-[12px] text-iconInput">
                  <div>Protien</div>
                  <div>2 (g/100g)</div>
                </div>
                <div className="flex justify-between text-[12px] text-iconInput">
                  <div>Carbohydrates</div>
                  <div>2 (g/100g)</div>
                </div>
                <div className="flex justify-between text-[12px] text-iconInput">
                  <div>Fat</div>
                  <div>2 (g/100g)</div>
                </div>
              </div>
            </div>
            <form className="mt-6 p-10 flex flex-col gap-4">
              <div>Amount (gram)</div>
              <input type="text" />
              <button className="inline-flex items-center justify-center w-full px-4 py-4 rounded-3xl font-semibold bg-primary">
                save
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
