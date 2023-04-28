import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import HomeIcon from "@/icons/HomeIcon";
import EatIcon from "@/icons/EatIcon";
import MoonIcon from "@/icons/MoonIcon";
import ProfileIcon from "@/icons/ProfileIcon";

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
              ? "var(--primary)"
              : router.pathname.includes("/eat") ||
                router.pathname === "/profile" ||
                router.pathname.includes("/sleep")
              ? "var(--iconInput)"
              : "var(--primary)"
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
              ? "var(--primary)"
              : "var(--iconInput)"
          }`}
        />
      ),
    },
    {
      name: "Sleep",
      href: "/sleep",
      icon: (
        <MoonIcon
          color={`${
            router.pathname.includes("/sleep")
              ? "var(--primary)"
              : "var(--iconInput)"
          }`}
        />
      ),
    },
    {
      name: "Profile",
      href: "/profile",
      icon: (
        <ProfileIcon
          color={`${
            router.pathname === "/profile"
              ? "var(--primary)"
              : "var(--iconInput)"
          }`}
        />
      ),
    },
  ];

  return (
    <div className="shadow-lg bg-backgroundInput rounded w-full h-fit z-10 fixed bottom-0 p-[14px] flex justify-around items-center">
      {links.map((link, index) => {
        return (
          <Link href={link.href} key={index}>
            <div className="flex flex-col items-center justify-center ">
              <div>{link.icon}</div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
