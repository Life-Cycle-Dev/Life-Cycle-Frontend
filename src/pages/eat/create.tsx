import { useRouter } from "next/router";
import { GetUserInfoResponse } from "@/model/users/users";
import Navbar from "@/components/Navbar";
import { searchFood, insertFood } from "@/functions/eatCycle";
import { ChangeEvent } from "react";
import Swal from "sweetalert2";
import { useState, SyntheticEvent } from "react";

export default function CreateEat(props: {
  user: GetUserInfoResponse;
  setLoading: (loading: boolean) => void;
}) {
  const router = useRouter();
  const [food, setFood] = useState<string>("");
  const [foodList, setFoodList] = useState<any[]>([]);
  const [amount, setAmount] = useState<number>(0);

  const onSearchFood = async () => {
    try {
      props.setLoading(true);
      const response = await searchFood(food);
      props.setLoading(false);
      if (response.result.length == 0) {
        return Swal.fire({
          icon: "error",
          title: "error",
          text: "No result found " + food,
        });
      }
      setFoodList([response.result[0]]);
    } catch (error) {
      props.setLoading(false);
      Swal.fire({
        icon: "error",
        title: "error",
        text: (error as Error).message,
      });
    }
  };

  const onInsertFood = async (e: SyntheticEvent) => {
    try {
      e.preventDefault();

      props.setLoading(true);
      const target = e.target as typeof e.target & {
        amount: { value: number };
      };
      const amount = target.amount.value;
      await insertFood(foodList[0].food.label, amount);

      props.setLoading(false);
      await Swal.fire({
        icon: "success",
        title: "Insert Food Success",
        showConfirmButton: false,
        timer: 1500,
        iconColor: "var(--primary)",
      });
      router.push("/eat");
    } catch (error) {
      props.setLoading(false);
      Swal.fire({
        icon: "error",
        title: "error",
        text: (error as Error).message,
      });
    }
  };

  return (
    <>
      <Navbar />
      <div className="lg:flex lg:items-center lg:justify-between px-5 mt-2">
        <div className="min-w-0 flex-1">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            Eat Cycle {"  "}
            <lord-icon
              src="https://cdn.lordicon.com/rxfojtue.json"
              trigger="loop"
              colors={`primary:#000000`}
              style={{ width: 30, height: 30 }}
            ></lord-icon>
          </h2>
          <div className="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6">
            <div className="mt-2 flex items-center text-sm text-gray-500">
              Find the food you eat.
            </div>
          </div>

          {foodList.length == 0 && (
            <>
              <div className="mt-6">
                <label
                  htmlFor="food"
                  className="text-base font-medium text-gray-900"
                >
                  Enter your food
                </label>
                <div className="mt-2.5 relative text-gray-400 focus-within:text-gray-600">
                  <input
                    type="text"
                    placeholder="Enter your food"
                    value={food}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setFood(e.target.value)
                    }
                  />
                </div>
              </div>

              <div>
                <button
                  onClick={onSearchFood}
                  className={`bg-gradient-to-r from-fuchsia-600 to-blue-600 focus:outline-none hover:opacity-80 focus:opacity-80 inline-flex items-center justify-center w-full px-4 py-4 text-base font-semibold text-white transition-all duration-200 border border-transparent rounded-md mt-6`}
                >
                  Search
                </button>
              </div>
            </>
          )}

          {foodList.map(({ food }, index) => {
            return (
              <>
                <div key={index} className="mt-6 flex flex-col">
                  <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                    <div className="px-4 py-5 sm:px-6">
                      <div className="mb-6">
                        <img
                          src={food.image}
                          className="w-[140px] h-[140px] object-cover"
                        />
                      </div>
                      <h3 className="text-lg leading-6 font-medium text-gray-900">
                        {food.label}
                      </h3>
                    </div>
                    <div className="border-t border-gray-200">
                      <dl>
                        <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                          <dt className="text-sm font-medium text-gray-500">
                            Calories
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            {amount < 1
                              ? food.nutrients?.ENERC_KCAL
                              : (food.nutrients?.ENERC_KCAL / 100) *
                                amount}{" "}
                            {amount < 1 ? "(kcal/100g)" : "(kcal)"}
                          </dd>
                        </div>
                        <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                          <dt className="text-sm font-medium text-gray-500">
                            Protein
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            {amount < 1
                              ? food.nutrients?.PROCNT
                              : (food.nutrients?.PROCNT / 100) * amount}{" "}
                            {amount < 1 ? "(g/100g)" : "(g)"}
                          </dd>
                        </div>
                        <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                          <dt className="text-sm font-medium text-gray-500">
                            Carbohydrates
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            {amount < 1
                              ? food.nutrients?.CHOCDF
                              : (food.nutrients?.CHOCDF / 100) * amount}{" "}
                            {amount < 1 ? "(g/100g)" : "(g)"}
                          </dd>
                        </div>
                        <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                          <dt className="text-sm font-medium text-gray-500">
                            Fat
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            {amount < 1
                              ? food.nutrients?.FAT
                              : (food.nutrients?.FAT / 100) * amount}{" "}
                            {amount < 1 ? "(g/100g)" : "(g)"}
                          </dd>
                        </div>
                      </dl>
                    </div>
                  </div>
                </div>

                <form onSubmit={onInsertFood} className="mt-6">
                  <label
                    htmlFor="amount"
                    className="text-base font-medium text-gray-900"
                  >
                    Amount (gram)
                  </label>
                  <div className="mt-2.5 relative text-gray-400 focus-within:text-gray-600">
                    <input
                      type="number"
                      placeholder="Enter your food"
                      defaultValue={amount}
                      min={0}
                      name="amount"
                      id="amount"
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setAmount(Number(e.target.value))
                      }
                    />
                  </div>

                  <button
                    type="submit"
                    className={`bg-gradient-to-r from-fuchsia-600 to-blue-600 focus:outline-none hover:opacity-80 focus:opacity-80 inline-flex items-center justify-center w-full px-4 py-4 text-base font-semibold text-white transition-all duration-200 border border-transparent rounded-md mt-6`}
                  >
                    Save
                  </button>

                  <button
                    type="submit"
                    onClick={() => {
                      setFoodList([]);
                      setFood("");
                      setAmount(0);
                    }}
                    className={`mb-20 bg-gradient-to-r from-red-500 to-red-600 focus:outline-none hover:opacity-80 focus:opacity-80 inline-flex items-center justify-center w-full px-4 py-4 text-base font-semibold text-white transition-all duration-200 border border-transparent rounded-md mt-6`}
                  >
                    Clear
                  </button>
                </form>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
}
