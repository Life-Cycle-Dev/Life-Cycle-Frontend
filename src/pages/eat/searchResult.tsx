import HeaderBar from "@/components/HeaderBar";
import Navbar from "@/components/Navbar";
import { insertFood, searchFood } from "@/functions/eatCycle";
import { GetUserInfoResponse } from "@/model/users/users";
import { useRouter } from "next/router";
import React, { ChangeEvent, useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function SearchResult(props: {
  user: GetUserInfoResponse;
  setLoading: (loading: boolean) => void;
}) {
  const router = useRouter();
  const { food } = router.query;
  const [searchResult, setSearchResult] = useState<any>({
    food: {
      foodId: "",
      uri: "",
      label: "",
      nutrients: { ENERC_KCAL: 0, PROCNT: 0, FAT: 0, CHOCDF: 0 },
      category: "",
      categoryLabel: "",
      image: "",
    },
  });
  const [amount, setAmount] = useState<number>(0);

  const RecordFood = () => {
    props.setLoading(true);
    insertFood(food?.toString() || "", amount)
      .then(() => {
        window.location.href = "/eat";
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "error",
          text: error.message,
        });
      });
  };

  useEffect(() => {
    props.setLoading(true);
    searchFood(food?.toString() || "").then((response) => {
      if (response.result.length != 0) {
        setSearchResult(response.result[0]);
        props.setLoading(false);
      } else {
        Swal.fire({
          icon: "error",
          title: "error",
          text: "No result found " + food,
        }).then(() => {
          props.setLoading(false);
          router.push("/eat/search");
        });
      }
    });
  }, [food]);

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
                  src={searchResult.food.image}
                  className="w-[120px] h-[120px] object-cover rounded-[25px]"
                  loading="lazy"
                />
              </div>
              <div className="w-[60%]">
                <div className="text-[22px]">{searchResult.food.label}</div>
                <div className="flex justify-between text-[12px] text-iconInput">
                  <div>Calories</div>
                  <div>
                    {searchResult.food.nutrients.ENERC_KCAL} (kcal/100g)
                  </div>
                </div>
                <div className="flex justify-between text-[12px] text-iconInput">
                  <div>Protien</div>
                  <div>{searchResult.food.nutrients.PROCNT} (g/100g)</div>
                </div>
                <div className="flex justify-between text-[12px] text-iconInput">
                  <div>Carbohydrates</div>
                  <div>{searchResult.food.nutrients.CHOCDF} (g/100g)</div>
                </div>
                <div className="flex justify-between text-[12px] text-iconInput">
                  <div>Fat</div>
                  <div>{searchResult.food.nutrients.FAT} (g/100g)</div>
                </div>
              </div>
            </div>
            <div className="mt-6 p-10 flex flex-col gap-4">
              <div>Amount (gram)</div>
              <input
                type="number"
                min={1}
                value={amount}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  setAmount(parseFloat(e.target.value));
                }}
              />
              <button
                className="inline-flex items-center justify-center w-full px-4 py-4 rounded-3xl font-semibold bg-primary"
                onClick={RecordFood}
              >
                save
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
