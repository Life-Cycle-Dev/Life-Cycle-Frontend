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
              <svg className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M5.75 2a.75.75 0 01.75.75V4h7V2.75a.75.75 0 011.5 0V4h.25A2.75 2.75 0 0118 6.75v8.5A2.75 2.75 0 0115.25 18H4.75A2.75 2.75 0 012 15.25v-8.5A2.75 2.75 0 014.75 4H5V2.75A.75.75 0 015.75 2zm-1 5.5c-.69 0-1.25.56-1.25 1.25v6.5c0 .69.56 1.25 1.25 1.25h10.5c.69 0 1.25-.56 1.25-1.25v-6.5c0-.69-.56-1.25-1.25-1.25H4.75z" clipRule="evenodd" />
              </svg>
              Closing on January 9, 2020
            </div>
          </div>
        </div>
        <div className="mt-3 flex lg:mt-0 lg:ml-4">
          <span className="sm:ml-3">
            <Link href="/eat/create" className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
              <svg className="-ml-0.5 mr-1.5 h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path d="M2.695 14.763l-1.262 3.154a.5.5 0 00.65.65l3.155-1.262a4 4 0 001.343-.885L17.5 5.5a2.121 2.121 0 00-3-3L3.58 13.42a4 4 0 00-.885 1.343z" />
              </svg>
              Create
            </Link>
          </span>
        </div>
      </div>

    </>
  )
}
