import { RequestMethod } from "@/model/common/common";
import { useRouter } from "next/router";
import { useState, SyntheticEvent } from "react";
import Swal from "sweetalert2";
import { handleRequest } from "../../common/requset";
import Link from "next/link";
import { GetUserInfoResponse } from "@/model/users/users";
import { onGoogleLogin } from "@/functions/googleAuth";
import HeaderBar from "@/components/HeaderBar";
import UserIcon from "@/icons/UserIcon";
import EmailIcon from "@/icons/EmailIcon";
import PasswordIcon from "@/icons/PasswordIcon";
import GoogleIcons from "@/icons/GoogleIcons";

export default function Register(props: { user: GetUserInfoResponse }) {
  const router = useRouter();

  const [error, setError] = useState("");
  const [errorField, setErrorField] = useState("");

  if (props.user) {
    router.push("/");
  }

  const onRegister = async (e: SyntheticEvent) => {
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
      if (password !== confirmPassword) {
        setErrorField("password");
        setError("Password and confirm password not match");
        return;
      }
      setErrorField("");
      setError("");
      await handleRequest({
        path: `${process.env.NEXT_PUBLIC_BACKEND_PATH}/api/users/register`,
        method: RequestMethod.POST,
        data: {
          name: fullName,
          email: email,
          password: password,
        },
      }).then((res: any) => localStorage.setItem("token", res.jwt));
      await Swal.fire({
        icon: "success",
        title: "Registered",
        showConfirmButton: false,
        iconColor: "var(--primary)",
        timer: 1500,
      });
      await router.push("/continue-register");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "error",
        text: (error as Error).message,
      });
    }
  };

  const clearPasswordError = () => {
    setError("");
    setErrorField("");
  };

  return (
    <div>
      <HeaderBar headerName="Create New Account" />
      <section className="bg-background w-full h-screen text-textWhite p-5">
        <div className="grid grid-cols-1 mt-20 pb-20">
          <div className="w-full flex items-center justify-center">
            <div className="w-full ">
              <img
                className="h-auto w-[100px] mb-4 mx-auto"
                src="/asset/icon.webp"
              />

              <form onSubmit={onRegister} className="mt-8">
                <div className="space-y-5">
                  <div>
                    <label
                      htmlFor="name"
                      className="text-base font-medium text-gray-900"
                    >
                      {" "}
                      Name{" "}
                    </label>
                    <div className="mt-2.5 relative text-gray-400 focus-within:text-gray-600">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <UserIcon />
                      </div>
                      <input
                        required={true}
                        type="text"
                        name="full_name"
                        id="name"
                        placeholder="Enter your name"
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="text-base font-medium text-gray-900"
                    >
                      {" "}
                      Email address{" "}
                    </label>
                    <div className="mt-2.5 relative text-gray-400 focus-within:text-gray-600">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <EmailIcon />
                      </div>
                      <input
                        required={true}
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Enter your email"
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="password"
                      className="text-base font-medium text-gray-900"
                    >
                      {" "}
                      Password{" "}
                    </label>
                    <div className="mt-2.5 relative text-gray-400 focus-within:text-gray-600">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <PasswordIcon />
                      </div>
                      <input
                        required={true}
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Enter your password"
                        className={`${
                          errorField === "password"
                            ? "border-red-600 focus:border-red-600"
                            : "border-gray-200 focus:border-blue-600"
                        }`}
                      />
                    </div>
                    <div className="mt-2 text-[#ff0023]">
                      {errorField === "password" && error}
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="confirm_password"
                      className="text-base font-medium text-gray-900"
                    >
                      Confirm Password
                    </label>
                    <div className="mt-2.5 relative text-gray-400 focus-within:text-gray-600">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <PasswordIcon />
                      </div>
                      <input
                        required={true}
                        type="password"
                        name="confirm_password"
                        id="confirm_password"
                        placeholder="Confirm your password"
                        onChange={clearPasswordError}
                        className={`${
                          errorField === "password"
                            ? "border-red-600 focus:border-red-600"
                            : "border-gray-200 focus:border-blue-600"
                        } `}
                      />
                    </div>
                    <div className="mt-2 text-[#ff0023]">
                      {errorField === "password" && error}
                    </div>
                  </div>
                  <div>
                    <button
                      type="submit"
                      className="inline-flex items-center justify-center w-full px-4 py-4 rounded-3xl bg-primary font-semibold"
                    >
                      Register
                    </button>
                  </div>
                </div>
              </form>
              <div className="flex items-center gap-5 mt-6">
                <div className="w-full h-0.5 bg-backgroundInput"></div>
                <div>or</div>
                <div className="w-full h-0.5 bg-backgroundInput"></div>
              </div>
              <div className="mt-3 space-y-3">
                <button
                  type="button"
                  onClick={onGoogleLogin}
                  className="relative inline-flex items-center justify-center w-full px-4 py-4 text-base font-semibold text-textWhite bg-backgroundInput  rounded-xl"
                >
                  <div className="absolute inset-y-0 left-0 p-4">
                    <GoogleIcons />
                  </div>
                  Sign in with Google
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
