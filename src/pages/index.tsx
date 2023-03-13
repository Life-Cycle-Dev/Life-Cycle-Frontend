import { useRouter } from "next/router";
import { GetUserInfoResponse } from '@/model/users/users';
import Navbar from "@/components/Navbar";

export default function Home(props :{user: GetUserInfoResponse}) {
  const router = useRouter();
  const isServer = typeof window === "undefined";

  if(!isServer) {
    if(!props.user) {
      router.push('/login')
    }  
  }
  
  return (
    <>
      <Navbar />
      {JSON.stringify(props.user)}
    </>
  )
}
