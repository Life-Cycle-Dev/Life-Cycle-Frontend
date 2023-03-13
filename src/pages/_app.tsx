import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { useEffect, useState } from 'react'
import { getUser } from '../../common/getUser'
import { GetUserInfoResponse } from '@/model/users/users';
import Head from 'next/head';

function Loading() {
  return (
    <div className="flex items-center justify-center bg-white w-full bg-white h-full fixed">
      <span className="animate-ping absolute inline-flex h-10 w-10 rounded-full bg-sky-400 opacity-75" />
      <span className="inline-flex rounded-full h-7 w-7 bg-sky-500" />
    </div>
  )
}

export default function App({ Component, pageProps }: AppProps) {
  const [user, setUser] = useState<GetUserInfoResponse>()
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    setLoading(true)
    const token = localStorage.getItem('token') || ""
    getUser(token).then((user) => {
      if(!user) {
        setLoading(false)
        setUser(undefined)
        localStorage.setItem('token', '')
        return
      }
      setLoading(false)
      setUser(user)
    })
    .catch(() => {
      setLoading(false)
      setUser(undefined)
      localStorage.setItem('token', '')
    })
  }, [])

  return(
    <>
      <Head>
        <script src="https://cdn.lordicon.com/ritcuqlt.js"></script>
      </Head>
      {
        loading && <Loading/>
      }
      <Component {...pageProps} user={user} setLoading={setLoading} />
    </>
  )
}
