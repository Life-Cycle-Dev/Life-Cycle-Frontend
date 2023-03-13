import { useRouter } from "next/router";
import { GetUserInfoResponse } from "@/model/users/users";
import Navbar from "@/components/Navbar";
import Header from "@/components/Header";
import { useState, useEffect } from "react";
import { getFoodOfUser } from "@/functions/eatCycle";
import Swal from "sweetalert2";
import Link from "next/link";

export default function Home(props: { user: GetUserInfoResponse, setLoading: (loading: boolean) => void }) {
  const router = useRouter();
  const isServer = typeof window === "undefined";

  const [foodList, setFoodList] = useState<any[]>([])

  if (!isServer) {
    if (!props.user) {
      router.push('/login')
    }
  }

  useEffect(() => {
    props.setLoading(true)
    getFoodOfUser()
      .then((response) => {
        console.log(response);
        props.setLoading(false)
        setFoodList(response)
      })
      .catch((error) => {
        props.setLoading(false)
        Swal.fire({
          icon: "error",
          title: "error",
          text: (error as Error).message,
        });
      })
  }, [])

  return (
    <>
      <Navbar />
      <Header userImg={props.user?.profileImage?.formats?.small?.url || "" } />
      <div className="lg:flex lg:items-center lg:justify-between px-5">
        <div className="min-w-0 flex-1">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            Hello's {props.user?.name} {'  '}
            <lord-icon
              src="https://cdn.lordicon.com/lupuorrc.json"
              trigger="loop"
              style={{ width: 40, height: 40 }}>
            </lord-icon>
          </h2>
        </div>
      </div>

      <Link href="/eat">
        <div className="flex rounded-md shadow-md font-sans gap-4 p-4 bg-gradient-to-r from-[#ff4444] to-[#ff5544] m-4 mt-6">
          <div className="flex-auto">
            <div className="flex flex-wrap">
              <h1 className="flex-auto text-lg text-white font-semibold">
                Today's Food
              </h1>
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
      </Link>
    </>
  );
}
