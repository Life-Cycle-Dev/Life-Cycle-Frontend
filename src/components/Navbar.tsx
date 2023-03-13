import React from 'react'
import Link from 'next/link'
import { useRouter } from "next/router";

export default function Navbar() {
    const router = useRouter();

    const links = [
        {
            name: "Home",
            href: "/",
            icon: "https://cdn.lordicon.com/slduhdil.json"
        },
        {
            name: "Eat",
            href: "/eat",
            icon: "https://cdn.lordicon.com/rxfojtue.json"
        },
        {
            name: "Profile",
            href: "/profile",
            icon: "https://cdn.lordicon.com/hbvyhtse.json"
        }
    ]

    return (
        <div className="shadow-lg bg-gray-50 w-full h-fit z-10 fixed bottom-0 px-5 py-3 flex justify-around items-center">
            {
                links.map((link, index) => {
                    return (
                        <Link href={link.href} key={index}>
                            <div className={`${router.pathname === link.href ? "text-blue-600" : "text-gray-400"} text-center font-bold  hover:text-blue-600 text-xs flex flex-col items-center justify-center`}>
                                <lord-icon
                                    src={link.icon}
                                    trigger={`${router.pathname === link.href ? "loop" : "hover"}`}
                                    colors={`primary:#${router.pathname === link.href ? "2564eb" : "b4b4b4"}`}
                                    style={{width:25,height:25}}>
                                </lord-icon>
                                {link.name}
                            </div>
                        </Link>
                    )
                })
            }
        </div>
    )
}
