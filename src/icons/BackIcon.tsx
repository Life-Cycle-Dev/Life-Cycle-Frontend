import { useRouter } from "next/router";
import React from "react";

export default function BackIcon() {
  const router = useRouter();
  const onBackPage = () => {
    router.back();
  };
  return (
    <svg
      width="11"
      height="19"
      viewBox="0 0 11 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onClick={onBackPage}
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M10.5397 18.5363C9.92606 19.1546 8.93108 19.1546 8.3174 18.5363L0.460259 10.6196C-0.153422 10.0013 -0.153421 8.99874 0.460259 8.38041L8.3174 0.463751C8.93109 -0.154579 9.92606 -0.154579 10.5397 0.463751C11.1534 1.08208 11.1534 2.08459 10.5397 2.70292L3.79376 9.5L10.5397 16.2971C11.1534 16.9154 11.1534 17.9179 10.5397 18.5363Z"
        fill="white"
      />
    </svg>
  );
}
