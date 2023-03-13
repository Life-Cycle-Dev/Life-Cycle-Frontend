import { useRouter } from "next/router";
import { GetUserInfoResponse } from "@/model/users/users";
import Navbar from "@/components/Navbar";
import Header from "@/components/Header";

export default function Home(props: { user: GetUserInfoResponse }) {
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
      <Header userImg={props.user?.profileImage?.formats?.small?.url || "" } />
    </>
  );
}
