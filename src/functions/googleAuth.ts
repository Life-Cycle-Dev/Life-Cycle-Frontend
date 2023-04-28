import { handleRequest } from '../../common/requset';
import { auth, googleProvider } from "@/functions/firebase";
import Swal from "sweetalert2";
import { RequestMethod } from '@/model/common/common';

export const onGoogleLogin = async () => {
    try {
      const user = await auth.signInWithPopup(googleProvider)
      const response = await handleRequest({
        path: `${process.env.NEXT_PUBLIC_BACKEND_PATH}/api/users/handleGoogleSignIn`,
        method: RequestMethod.POST,
        data: {
          email: user.user?.email,
          name: user.user?.displayName,
          uid: user.user?.uid,
          img: user.user?.photoURL,
        },
      });
      localStorage.setItem("token", response.jwt);
      await Swal.fire({
        icon: "success",
        title: `Hello ${response.user.name}`,
        showConfirmButton: false,
        timer: 1500,
        iconColor: "var(--primary)",
      });
      window.location.href = "/"
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "error",
        text: (error as Error).message,
      });
    }
  }