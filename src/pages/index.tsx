import { GetUserInfoResponse } from "@/model/users/users";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import EatChart from "@/components/chart/EatChart";
import SleepChartWeek from "@/components/chart/SleepChartWeek";
import SnoringChartWeek from "@/components/chart/SnoringChartWeek"; 

export default function Home(props: {
  user: GetUserInfoResponse;
  setLoading: (loading: boolean) => void;
}) {

  return (
    <>
      <Navbar />

      <div className="flex pt-7 px-7 justify-between items-center">
        <Link href="/profile">
          <img
            className="w-10 h-10 rounded-full"
            src={props.user?.profileImage?.url ?? "/asset/profile icon.png"}
            alt="avatar"
          />
        </Link>
        <div>
          <h1 className="text-textWhite text-[16px]">Hello's {props.user?.name?.split(" ")[0]}</h1>
        </div>
      </div>

      <div className="grid grid-cols-2 px-5 gap-5 mt-10">
        <Link className="relative overflow-hidden h-[200px]"
          href="/eat">
          <img
            className="absolute object-cover h-[200px] rounded-lg shadow-md"
            src="/asset/food.jpg"
            alt="food"
          />
          <div className="backdrop-filter px-3 py-4 absolute rounded-lg bottom-0 backdrop-blur-md h-fit w-full">
            <div className="text-textWhite text-[16px] ">Today's Eat?</div>
          </div>
        </Link>
        <Link className="relative overflow-hidden h-[200px]"
          href="/sleep">
          <img
            className="absolute object-cover h-[200px] rounded-lg shadow-md"
            src="/asset/sleep.jpg"
            alt="sleep"
          />
          <div className="backdrop-filter px-3 py-4 absolute rounded-lg bottom-0 backdrop-blur-md h-fit w-full">
            <div className="text-textWhite text-[16px] ">Did you sleep well?</div>
          </div>
        </Link>
      </div>

      <div className={`shadow-md rounded-[30px] bg-backgroundInput backdrop-filter-[blur(35px)] gap-4 p-6 mt-8 mx-4 boredr-2`}>
        <div className="mb-6 font-bold text-primary text-xl">Eat Dashboard</div>
        <div>
          <EatChart />
        </div>
      </div>

      <div className={`shadow-md rounded-[30px] bg-backgroundInput backdrop-filter-[blur(35px)] gap-4 p-6 mt-4 mx-4 boredr-2`}>
        <div className="mb-6 font-bold text-primary text-xl">Sleep Dashboard</div>
        <div>
          <SleepChartWeek />
        </div>
      </div>

      <div className={`shadow-md rounded-[30px] bg-backgroundInput backdrop-filter-[blur(35px)] gap-4 p-6 mt-4 mx-4 boredr-2`}>
        <div className="mb-6 font-bold text-primary text-xl">Snoring Dashboard</div>
        <div>
          <SnoringChartWeek />
        </div>
      </div>

      <div className="mt-20"></div>
    </>
  );
}
