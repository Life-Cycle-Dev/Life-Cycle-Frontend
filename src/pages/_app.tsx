import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import { getUser } from "../../common/getUser";
import { GetUserInfoResponse } from "@/model/users/users";
import Script from "next/script";

function Loading() {
  return (
    <div className="flex items-center justify-center w-full h-full z-300 fixed">
      <span className="animate-ping absolute inline-flex h-10 w-10 rounded-full bg-textWhite opacity-75" />
      <span className="inline-flex rounded-full h-7 w-7 bg-sky-500" />
    </div>
  );
}

export default function App({ Component, pageProps }: AppProps) {
  const [user, setUser] = useState<GetUserInfoResponse>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
    const token = localStorage.getItem("token") || "";
    getUser(token)
      .then((user) => {
        if (!user) {
          setLoading(false);
          setUser(undefined);
          localStorage.setItem("token", "");
          return;
        }
        setLoading(false);
        setUser(user);
      })
      .catch(() => {
        setLoading(false);
        setUser(undefined);
        localStorage.setItem("token", "");
      });
  }, []);

  return (
    <>
      <Script src="https://cdn.lordicon.com/ritcuqlt.js"></Script>
      {loading && <Loading />}
      <div className={`${loading && "hidden"}`}>
        <Component {...pageProps} user={user} setLoading={setLoading} />
      </div>
    </>
  );
}
