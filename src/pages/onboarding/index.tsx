import { Button } from "@mui/material";
import React from "react";
import style from "../../styles/onboarding.module.css";
import logo from "../../../public/favicon.ico";
import Image from "next/image";
import { useRouter } from "next/router";

export default function Onboarding() {
  const router = useRouter();
  return (
    <div className={style.container}>
      <div className={style.content}>
        <h2>Life Cycle App</h2>
        <Image alt="logo" src={logo} width="200" height="200" />
      </div>
      <div className={style.btnFroup}>
        <Button variant="contained" onClick={() => router.push("/login")}>
          Login
        </Button>
        <Button variant="outlined" onClick={() => router.push("/register")}>
          Register
        </Button>
      </div>
    </div>
  );
}
