import { useEffect, useState } from 'react'
import { getUser } from '../../common/getUser'
import { useRouter } from "next/router";
import { GetUserInfoResponse } from '@/model/users/users';

export default function Home() {
  const router = useRouter();
  const [user, setUser] = useState<GetUserInfoResponse>()

  useEffect(() => {
    const token = localStorage.getItem('token') || ""
    if(!token) {
      router.push('/login')
    }
    getUser(token).then((user) => {
      if(!user) {
        localStorage.setItem('token', '')
        router.push('/login')
        return
      }
      setUser(user)
    })
    .catch(() => {
      localStorage.setItem('token', '')
      router.push('/login')
    })
  }, [])
  
  return (
    <>
      {JSON.stringify(user)}
    </>
  )
}
