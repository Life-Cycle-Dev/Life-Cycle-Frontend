import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import { getUser } from "../../common/getUser";
import { GetUserInfoResponse } from "@/model/users/users";
import Script from "next/script";
import style from "../styles/app.module.css";
import { useRouter } from "next/router";
import Head from "next/head";

function Loading() {
  return (
    <div className="flex items-center justify-center w-full h-full z-40 fixed">
      {/* <span className="animate-ping absolute inline-flex h-10 w-10 rounded-full bg-textWhite opacity-75" />
      <span className="inline-flex rounded-full h-7 w-7 bg-sky-500" /> */}
      <div className={style.loader}>Loading...</div>
    </div>
  );
}

const allowedUnauthRoutes = ["/login", "/register", "/welcome"];

export default function App({ Component, pageProps }: AppProps) {
  const [user, setUser] = useState<GetUserInfoResponse>();
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    setLoading(true);
    const token = localStorage.getItem("token") || "";
    if(!token && !allowedUnauthRoutes.includes(router.pathname)) {
      window.location.href = "/welcome";
      return;
    }
    getUser(token)
      .then((user) => {
        if (!user) {
          setUser(undefined);
          localStorage.setItem("token", "");
          window.location.href = "/welcome";
          setLoading(false);
          return;
        }
        setLoading(false);
        setUser(user);
      })
      .catch(() => {
        if(!allowedUnauthRoutes.includes(router.pathname)) {
          window.location.href = "/welcome";
          return;
        }
        setLoading(false);
        setUser(undefined);
        localStorage.setItem("token", "");
      });
  }, []);

  return (
    <>
      <Head>
        <title>Life Cycle App</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Script src="https://cdn.lordicon.com/ritcuqlt.js"></Script>
      {loading && <Loading />}
      <div className={`${loading && "hidden"} container-app`}>
        <Component {...pageProps} user={user} setLoading={setLoading} />
      </div>
    </>
  );
}
