import { useRouter } from "next/router";
import { GetUserInfoResponse } from '@/model/users/users';
import Navbar from "@/components/Navbar";
import Header from "@/components/Header";
import Link from "next/link";

export default function Eat(props: { user: GetUserInfoResponse }) {
  const router = useRouter();
  const isServer = typeof window === "undefined";

  if (!isServer) {
    if (!props.user) {
      router.push('/login')
    }
  }

  return (
    <>
      <Navbar />
      <Header userImg={props.user?.profileImage?.formats?.small?.url || ""} />
      <div className="lg:flex lg:items-center lg:justify-between px-5 mt-2">
        <div className="min-w-0 flex-1">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            Eat Cycle {'  '}
            <lord-icon
                src="https://cdn.lordicon.com/rxfojtue.json"
                trigger="loop"
                colors={`primary:#000000`}
                style={{width:30,height:30}}>
            </lord-icon>
          </h2>
          <div className="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6">
            <div className="mt-2 flex items-center text-sm text-gray-500">
              Find the food you eat.
            </div>
          </div>
        </div>

      </div>

    </>
  )
}
