import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import HomeIcon from "@/icons/HomeIcon";

export default function Navbar() {
  const router = useRouter();

  const links = [
    {
      name: "Home",
      href: "/",
      icon: (
        <HomeIcon
          color={`${
            router.pathname === "/" ? "var(--textWhite)" : "var(--iconInput)"
          }`}
        />
      ),
    },
    {
      name: "Eat",
      href: "/eat",
      icon: (
        <HomeIcon
          color={`${
            router.pathname === "/eat" ? "var(--textWhite)" : "var(--iconInput)"
          }`}
        />
      ),
    },
    {
      name: "Profile",
      href: "/profile",
      icon: (
        <HomeIcon
          color={`${
            router.pathname === "/profile"
              ? "var(--textWhite)"
              : "var(--iconInput)"
          }`}
        />
      ),
    },
  ];

  return (
    <div className="shadow-[0px_-4px_17px_rgba(42,28,88,0.44)] border-t-2	border-iconInput	border-solid	 rounded-[40px_0px_0px_0px] bg-black w-full h-fit z-10 fixed bottom-0 p-5 flex justify-around items-center ">
      {links.map((link, index) => {
        return (
          <Link href={link.href} key={index}>
            <div
              className={`${
                router.pathname === link.href ? "opacity-none" : "opacity-60"
              } text-center font-bold  text-xs flex flex-col items-center justify-center gap-1`}
            >
              <div>{link.icon}</div>
              <div
                className={`${
                  router.pathname === link.href
                    ? "text-textWhite"
                    : "text-iconInput"
                } `}
              >
                {link.name}
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
