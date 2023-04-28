import { RequestMethod } from "@/model/common/common";
import { useRouter } from "next/router";
import { SyntheticEvent } from "react";
import Swal from "sweetalert2";
import { handleRequest } from "../../common/requset";
import { GetUserInfoResponse } from "@/model/users/users";
import { onGoogleLogin } from "@/functions/googleAuth";
import HeaderBar from "@/components/HeaderBar";
import EmailIcon from "@/icons/EmailIcon";
import PasswordIcon from "@/icons/PasswordIcon";
import GoogleIcons from "@/icons/GoogleIcons";

export default function Login(props: { user: GetUserInfoResponse }) {
  const router = useRouter();

  const onLogin = async (e: SyntheticEvent) => {
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
      }).then(async (res: any) => {
        localStorage.setItem("token", res.jwt);
        await Swal.fire({
          icon: "success",
          title: `Hello ${res.user.name}`,
          showConfirmButton: false,
          timer: 1500,
          background: "var(--background)",
          color: "var(--textWhite)",
          iconColor: "var(--primary)",
        });
        window.location.href = "/";
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "error",
        text: (error as Error).message,
      });
    }
  };

  if (props.user) {
    router.push("/");
  }

  return (
    <div>
      <HeaderBar headerName="Log in" backRoute="/welcome" />
      <section className="bg-background w-full h-screen text-textWhite p-5">
        <div className="grid grid-cols-1 mt-20">
          <div className="w-full flex items-center justify-center">
            <div className="w-full">
              <img
                className="h-auto w-[100px] mb-4 mx-auto"
                src="/asset/icon.webp"
              />
              <form onSubmit={onLogin} className="mt-8">
                <div className="space-y-5">
                  <div>
                    <label
                      htmlFor="email"
                      className="text-base font-medium text-gray-900"
                    >
                      {" "}
                      Email{" "}
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
                        autoComplete="off"
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
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Enter your password"
                      />
                    </div>
                  </div>
                  <div>
                    <button
                      type="submit"
                      className="inline-flex items-center justify-center w-full px-4 py-4 rounded-3xl bg-primary font-semibold"
                    >
                      Log in
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
