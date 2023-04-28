import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import HomeIcon from "@/icons/HomeIcon";
import EatIcon from "@/icons/EatIcon";

export default function Navbar() {
  const router = useRouter();

  const links = [
    {
      name: "Home",
      href: "/",
      icon: (
        <HomeIcon
          color={`${
            router.pathname === "/"
              ? "var(--textWhite)"
              : router.pathname.includes("/eat") ||
                router.pathname === "/profile"
              ? "var(--iconInput)"
              : "var(--textWhite)"
          }`}
        />
      ),
    },
    {
      name: "Eat",
      href: "/eat",
      icon: (
        <EatIcon
          color={`${
            router.pathname.includes("/eat")
              ? "var(--textWhite)"
              : "var(--iconInput)"
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
    <div className="shadow-lg bg-backgroundInput rounded w-full h-fit z-10 fixed bottom-0 left-0 p-[14px] flex justify-around items-center">
      {links.map((link, index) => {
        return (
          <Link href={link.href} key={index}>
            <div
              className={`${
                router.pathname.startsWith(link.href)
                  ? "opacity-none"
                  : "opacity-60"
              } text-center font-bold  text-xs flex flex-col items-center justify-center gap-1`}
            >
              <div>{link.icon}</div>
              <div className={`text-iconInput text-[11px]`}>{link.name}</div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
