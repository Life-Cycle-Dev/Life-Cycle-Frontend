import { RequestMethod } from "@/model/common/common";
import { useRouter } from "next/router";
import { useState, SyntheticEvent } from "react";
import Swal from "sweetalert2";
import { handleRequest } from "../../common/requset";
import Link from "next/link";
import { GetUserInfoResponse } from '@/model/users/users';
import { onGoogleLogin } from "@/functions/googleAuth";

export default function Register(props: {user:GetUserInfoResponse}) {
  const router = useRouter();

  const [error, setError] = useState("")
  const [errorField, setErrorField] = useState("")

  if(props.user) {
    router.push('/')
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
        setErrorField("password")
        setError("Password and confirm password not match")
        return
      }
      setErrorField("")
      setError("")
      await handleRequest({
        path: `${process.env.NEXT_PUBLIC_BACKEND_PATH}/api/users/register`,
        method: RequestMethod.POST,
        data: {
          name: fullName,
          email: email,
          password: password,
        },
      }).then((res: any) =>
        localStorage.setItem("token", res.jwt)
      );
      await Swal.fire({
        icon: "success",
        title: "Registered",
        showConfirmButton: false,
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
    setError("")
    setErrorField("")
  }

  return (
    <section className="bg-white">
      <div className="grid grid-cols-1">
        <div className="flex items-center justify-center px-4 py-10 bg-white sm:px-6 lg:px-8 sm:py-16 lg:py-24">
          <div className="xl:w-full xl:max-w-sm 2xl:max-w-md xl:mx-auto">
            <img className="h-auto max-w-[20%] mb-4" src="/asset/icon.webp" />
            <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl">Life Cycle App</h2>
            <p className="mt-2 text-base text-gray-600">Have an any account? {" "}
              <Link href="/login" className="font-medium text-blue-600 transition-all duration-200 hover:text-blue-700 focus:text-blue-700 hover:underline">
                Login
              </Link>
            </p>
            <form onSubmit={onRegister} className="mt-8">
              <div className="space-y-5">
                <div>
                  <label htmlFor="name" className="text-base font-medium text-gray-900"> Name </label>
                  <div className="mt-2.5 relative text-gray-400 focus-within:text-gray-600">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path d="M12.075,10.812c1.358-0.853,2.242-2.507,2.242-4.037c0-2.181-1.795-4.618-4.198-4.618S5.921,4.594,5.921,6.775c0,1.53,0.884,3.185,2.242,4.037c-3.222,0.865-5.6,3.807-5.6,7.298c0,0.23,0.189,0.42,0.42,0.42h14.273c0.23,0,0.42-0.189,0.42-0.42C17.676,14.619,15.297,11.677,12.075,10.812 M6.761,6.775c0-2.162,1.773-3.778,3.358-3.778s3.359,1.616,3.359,3.778c0,2.162-1.774,3.778-3.359,3.778S6.761,8.937,6.761,6.775 M3.415,17.69c0.218-3.51,3.142-6.297,6.704-6.297c3.562,0,6.486,2.787,6.705,6.297H3.415z" />
                      </svg>
                    </div>
                    <input required={true} type="text" name="full_name" id="name" placeholder="Enter your name" className="block w-full py-4 pl-10 pr-4 text-black placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600" />
                  </div>
                </div>
                <div>
                  <label htmlFor="email" className="text-base font-medium text-gray-900"> Email address </label>
                  <div className="mt-2.5 relative text-gray-400 focus-within:text-gray-600">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                      </svg>
                    </div>
                    <input required={true} type="email" name="email" id="email" placeholder="Enter your email" className="block w-full py-4 pl-10 pr-4 text-black placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600" />
                  </div>
                </div>
                <div>
                  <label htmlFor="password" className="text-base font-medium text-gray-900"> Password </label>
                  <div className="mt-2.5 relative text-gray-400 focus-within:text-gray-600">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
                      </svg>
                    </div>
                    <input required={true} type="password" name="password" id="password" placeholder="Enter your password"
                      className={`${errorField === "password" ? "border-red-600 focus:border-red-600" : "border-gray-200 focus:border-blue-600"} text-black block w-full py-4 pl-10 pr-4 placeholder-gray-500 transition-all duration-200 border rounded-md bg-gray-50 focus:outline-none focus:bg-white`} />
                  </div>
                  <div className="mt-2 text-[#ff0023]">{errorField === "password" && error}</div>
                </div>
                <div>
                  <label htmlFor="confirm_password" className="text-base font-medium text-gray-900">Confirm Password</label>
                  <div className="mt-2.5 relative text-gray-400 focus-within:text-gray-600">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
                      </svg>
                    </div>
                    <input required={true} type="password" name="confirm_password" id="confirm_password" placeholder="Confirm your password"
                      onChange={clearPasswordError}
                      className={`${errorField === "password" ? "border-red-600 focus:border-red-600" : "border-gray-200 focus:border-blue-600"} text-black block w-full py-4 pl-10 pr-4 placeholder-gray-500 transition-all duration-200 border rounded-md bg-gray-50 focus:outline-none focus:bg-white`} />
                  </div>
                  <div className="mt-2 text-[#ff0023]">{errorField === "password" && error}</div>
                </div>
                <div>
                  <button type="submit" className="inline-flex items-center justify-center w-full px-4 py-4 text-base font-semibold text-white transition-all duration-200 border border-transparent rounded-md bg-gradient-to-r from-fuchsia-600 to-blue-600 focus:outline-none hover:opacity-80 focus:opacity-80">
                    Register
                  </button>
                </div>
              </div>
            </form>
            <div className="mt-3 space-y-3">
              <button type="button"
                      onClick={onGoogleLogin} 
                      className="relative inline-flex items-center justify-center w-full px-4 py-4 text-base font-semibold text-gray-700 transition-all duration-200 bg-white border-2 border-gray-200 rounded-md hover:bg-gray-100 focus:bg-gray-100 hover:text-black focus:text-black focus:outline-none">
                <div className="absolute inset-y-0 left-0 p-4">
                  <svg className="w-6 h-6 text-rose-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.283 10.356h-8.327v3.451h4.792c-.446 2.193-2.313 3.453-4.792 3.453a5.27 5.27 0 0 1-5.279-5.28 5.27 5.27 0 0 1 5.279-5.279c1.259 0 2.397.447 3.29 1.178l2.6-2.599c-1.584-1.381-3.615-2.233-5.89-2.233a8.908 8.908 0 0 0-8.934 8.934 8.907 8.907 0 0 0 8.934 8.934c4.467 0 8.529-3.249 8.529-8.934 0-.528-.081-1.097-.202-1.625z" />
                  </svg>
                </div>
                Sign in with Google
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
