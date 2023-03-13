import { RequestMethod } from "@/model/common/common";
import { IEnv } from "@/model/environment/env";
import { Button, TextField, Typography } from "@mui/material";
import { useRouter } from "next/router";
import React, { useState } from "react";
import Swal from "sweetalert2";
import { handleRequest } from "../../../common/requset";
import style from "../../styles/register.module.css";

// export async function getStaticProps() {
//   return {
//     props: {
//       backend_path: process.env.NEXT_PUBLIC_BACKEND_PATH,
//     },
//   };
// }

export default function Register() {
  // const { backend_path } = props;
  const router = useRouter();

  const onRegister = async (e: React.SyntheticEvent) => {
    try {
      e.preventDefault();
      const target = e.target as typeof e.target & {
        full_name: { value: string };
        email: { value: string };
        password: { value: string };
        confirm_password: { value: string };
      };
      const fullName = target.full_name.value;
      const email = target.email.value;
      const password = target.password.value;
      const confirmPassword = target.confirm_password.value;
      if (password === confirmPassword) {
        await handleRequest({
          path: `${process.env.NEXT_PUBLIC_BACKEND_PATH}/api/users/register`,
          method: RequestMethod.POST,
          data: {
            name: fullName,
            email: email,
            password: password,
          },
        }).then((res: any) =>
          localStorage.setItem("token", JSON.stringify(res.jwt))
        );
        await Swal.fire({
          icon: "success",
          title: "Registered",
          showConfirmButton: false,
          timer: 1500,
        });
        await router.push("/continueRegister");
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "error",
        text: (error as Error).message,
      });
    }
  };

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  return (
    <div className={style.container}>
      <Typography variant="h6" gutterBottom>
        Register
      </Typography>
      <form className={style.form} onSubmit={onRegister}>
        <TextField required label="Fullname" name="full_name" />
        <TextField required type="email" label="Email" name="email" />
        <TextField
          required
          type="password"
          label="Password"
          name="password"
          error={password.length == 0 || password.length >= 6 ? false : true}
          helperText={
            password.length < 6 && password.length > 0
              ? "password should be more than 6 characters."
              : ""
          }
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <TextField
          required
          type="password"
          label="Confirm Password"
          name="confirm_password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          error={
            confirmPassword !== password && confirmPassword.length > 0
              ? true
              : false
          }
          helperText={
            confirmPassword !== password && confirmPassword.length > 0
              ? "password does not match"
              : ""
          }
        />
        <Button variant="contained" type="submit">
          submit
        </Button>
      </form>
    </div>
  );
}
