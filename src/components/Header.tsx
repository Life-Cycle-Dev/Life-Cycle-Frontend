import React from 'react'
import Link from 'next/link'

export default function Header(props: {userImg: string}) {
  return (
    <div className="py-6 px-8 flex justify-end">
        <Link href="/profile">
            <img className="object-cover w-[40px] h-[40px] rounded-full" src={props.userImg ? props.userImg : "asset/profile icon.png"} />
        </Link>
    </div>
  )
}
