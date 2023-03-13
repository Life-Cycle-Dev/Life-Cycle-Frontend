import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { useEffect, useState } from 'react'
import { getUser } from '../../common/getUser'
import { GetUserInfoResponse } from '@/model/users/users';

export default function App({ Component, pageProps }: AppProps) {
  const [user, setUser] = useState<GetUserInfoResponse>()

  useEffect(() => {
    const token = localStorage.getItem('token') || ""
    getUser(token).then((user) => {
      if(!user) {
        setUser(undefined)
        localStorage.setItem('token', '')
        return
      }
      setUser(user)
    })
    .catch(() => {
      setUser(undefined)
      localStorage.setItem('token', '')
    })
  }, [])

  return <Component {...pageProps} user={user} />
}
