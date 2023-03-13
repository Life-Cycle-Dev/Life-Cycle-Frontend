import { RequestMethod } from "@/model/common/common";
import { Button, TextField, Typography } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";
import Swal from "sweetalert2";
import { handleRequest } from "../../../common/requset";
import style from "../../styles/login.module.css";

export default function Login() {
  const router = useRouter();

  const onLogin = async (e: React.SyntheticEvent) => {
    try {
      e.preventDefault();
      const target = e.target as typeof e.target & {
        email: { value: string };
        password: { value: string };
      };
      const identifier = target.email.value;
      const password = target.password.value;
      await handleRequest({
        path: `${process.env.NEXT_PUBLIC_BACKEND_PATH}/api/auth/local`,
        method: RequestMethod.POST,
        data: {
          identifier: identifier,
          password: password,
        },
      }).then((res: any) =>
        localStorage.setItem("token", JSON.stringify(res.jwt))
      );
      await Swal.fire({
        icon: "success",
        title: "Loged in",
        showConfirmButton: false,
        timer: 1500,
      });
      await router.push("/");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "error",
        text: (error as Error).message,
      });
    }
  };
  return (
    <div className={style.container}>
      <form className={style.form} onSubmit={onLogin}>
        <Typography variant="h6" gutterBottom>
          Login
        </Typography>
        <TextField required label="Email" name="email" />
        <TextField required label="Password" name="password" type="password" />
        <Button type="submit" variant="contained">
          Login
        </Button>
      </form>
    </div>
  );
}
