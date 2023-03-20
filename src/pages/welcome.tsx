import { GetUserInfoResponse } from "@/model/users/users";
import { useRouter } from "next/router";
import React from "react";

export default function Welcome(props: { user: GetUserInfoResponse }) {
  const router = useRouter();

  const onRegister = () => {
    router.push("/register");
  };

  const onLogin = () => {
    router.push("/login");
  };

  if (props.user) {
    router.push("/");
  }

  return (
    <div className="bg-background w-full h-screen text-textWhite p-5 flex flex-col	justify-between	">
      <div className="mt-10">
        <h1>
          Welcome to<br></br> Lifecycle 👋
        </h1>
        <p className="mt-5">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione eos
          explicabo impedit voluptate sed corporis alias rem sunt. Temporibus
          sit deleniti numquam mollitia? Porro tempora fugit autem dolor
          cupiditate magnam.
        </p>
      </div>
      <div className="flex flex-col gap-5 pb-10">
        <button
          type="button"
          onClick={onRegister}
          className="inline-flex items-center justify-center w-full px-4 py-4 rounded-3xl bg-primary font-semibold"
        >
          Create Account
        </button>
        <button
          type="button"
          onClick={onLogin}
          className="inline-flex items-center justify-center w-full px-4 py-4 border-2 border-primary rounded-3xl text-primary"
        >
          Sign in
        </button>
      </div>
    </div>
  );
}
