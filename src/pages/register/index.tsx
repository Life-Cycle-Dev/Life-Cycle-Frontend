import { Button, TextField, Typography } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";
import Swal from "sweetalert2";
import { handleRequest, RequestMethod } from "../../../common/requset";
import style from "../../styles/register.module.css";

export async function getStaticProps() {
  return {
    props: {
      backend_path: process.env.BACKEND_PATH,
    },
  };
}

export type RegisterProps = {
  backend_path: string;
};

export default function Register(props: RegisterProps) {
  const { backend_path } = props;
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
          path: `${backend_path}/api/users/register`,
          method: RequestMethod.POST,
          data: {
            name: fullName,
            email: email,
            password: password,
          },
        });
        await Swal.fire({
          icon: "success",
          title: "Registered",
          showConfirmButton: false,
          timer: 1500,
        });
        await router.push("/continueRegister");
      } else {
        Swal.fire({
          icon: "error",
          title: "error",
          text: "Password does not match",
        });
      }
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
      <Typography variant="h6" gutterBottom>
        Register
      </Typography>
      <form className={style.form} onSubmit={onRegister}>
        <TextField required label="Fullname" name="full_name" />
        <TextField required type="email" label="Email" name="email" />
        <TextField required type="password" label="Password" name="password" />
        <TextField
          required
          type="password"
          label="Confirm Password"
          name="confirm_password"
        />
        <Button variant="contained" type="submit">
          submit
        </Button>
      </form>
    </div>
  );
}
