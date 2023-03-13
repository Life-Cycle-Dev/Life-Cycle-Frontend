import React, { useEffect, useState } from "react";
import { getUser } from "../../../common/getUser";
import { Avatar, Typography } from "@mui/material";
import style from "../../styles/profile.module.css";
import { GetUserInfoResponse } from "@/model/users/users";

export default function Profile() {
  const [userInfo, setUserInfo] = useState<GetUserInfoResponse>();
  const isSSR = typeof window === "undefined";

  useEffect(() => {
    if (!isSSR) {
      const jwt = localStorage.getItem("token");
      const strToken = jwt?.split('"')[1];
      getUser(strToken || "").then((res) => setUserInfo(res));
    }
  }, [isSSR]);
  console.log(userInfo);

  return (
    <div className={style.container}>
      <Typography>Profile</Typography>

      <Avatar
        alt="test"
        src="/static/images/avatar/1.jpg"
        sx={{ width: 56, height: 56 }}
      />
      <Typography>{userInfo?.name}</Typography>
      <Typography>{userInfo?.email}</Typography>
      <Typography>{userInfo?.birthdate}</Typography>
      <Typography>{userInfo?.weight}</Typography>
      <Typography>{userInfo?.height}</Typography>
      <Typography>{userInfo?.gender}</Typography>
    </div>
  );
}
