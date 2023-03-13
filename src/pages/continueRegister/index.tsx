import React, { ChangeEvent, useState } from "react";
import style from "../../styles/continueRegister.module.css";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import {
  Button,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import dayjs, { Dayjs } from "dayjs";
import { handleRequest } from "../../../common/requset";
import Swal from "sweetalert2";
import { useRouter } from "next/router";
import { Gender, UploadResponse } from "@/model/users/users";
import { IEnv } from "@/model/environment/env";
import { RequestMethod } from "@/model/common/common";

// export async function getStaticProps() {
//   return {
//     props: {
//       backend_path: process.env.NEXT_PUBLIC_BACKEND_PATH,
//       upload_api_key: process.env.UPLOAD_API_KEY,
//     },
//   };
// }

export default function ContinueRegister() {
  // const { backend_path, upload_api_key } = props;
  const jwt =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const router = useRouter();

  const [imgId, setImgId] = useState<number>();
  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      const formdata = new FormData();
      formdata.append("files", file);
      const response: UploadResponse[] = await handleRequest({
        path: `${process.env.NEXT_PUBLIC_BACKEND_PATH}/api/upload/`,
        method: RequestMethod.POST,
        headers: {
          Authorization: `Bearer ${process.env.UPLOAD_API_KEY}`,
        },
        data: formdata,
      });
      await setImgId(response[0].id);
    }
  };

  const [birthDate, setBirthDate] = useState<Dayjs | null>(dayjs(""));
  const birthDateObj = {
    year: birthDate?.get("year"),
    month:
      birthDate?.get("month") === undefined
        ? "00"
        : birthDate?.get("month") + 1 < 10
        ? `0${birthDate?.get("month") + 1}`
        : birthDate?.get("month"),
    date:
      birthDate?.get("date") === undefined
        ? "00"
        : birthDate?.get("date") < 10
        ? `0${birthDate?.get("date")}`
        : birthDate?.get("date"),
  };
  const formatBirthDate = `${birthDateObj.year}-${birthDateObj.month}-${birthDateObj.date}`;

  const onContinueRegister = async (e: React.SyntheticEvent) => {
    try {
      e.preventDefault();
      const target = e.target as typeof e.target & {
        gender: { value: Gender };
        height: { value: number };
        weight: { value: number };
      };
      const gender = target.gender.value;
      const height = target.height.value;
      const weight = target.weight.value;
      await handleRequest({
        path: `${process.env.NEXT_PUBLIC_BACKEND_PATH}/api/users/update`,
        method: RequestMethod.PUT,
        headers: {
          Authorization: `Bearer ${jwt?.split('"')[1]}`,
        },
        data: {
          birthdate: formatBirthDate,
          gender: gender,
          height: height,
          weight: weight,
          profileImage: imgId,
        },
      });
      await Swal.fire({
        icon: "success",
        title: "Updated Personal Information",
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
      <Typography variant="h6" gutterBottom>
        ContinueRegister
      </Typography>
      <form className={style.form} onSubmit={onContinueRegister}>
        <Typography>Birth date</Typography>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            value={birthDate}
            onChange={(newDate: any) => setBirthDate(newDate)}
          />
        </LocalizationProvider>

        <Typography>Gender</Typography>
        <RadioGroup sx={{ my: 1 }} name="gender">
          <div>
            <Radio value={Gender.FEMALE} />
            <span>Female</span>
          </div>
          <div>
            <Radio value={Gender.MALE} />
            <span>Male</span>
          </div>
        </RadioGroup>

        <Typography>Height</Typography>
        <TextField label="Height (cm.)" name="height" type="number" />

        <Typography>Weight</Typography>
        <TextField label="Weight (kg.)" name="weight" type="number" />

        <Typography>Profile Image</Typography>
        <input
          type="file"
          name="profileImage"
          accept="image/*"
          onChange={handleFileChange}
        />

        <Button variant="contained" type="submit">
          Update
        </Button>
      </form>
      <Button
        endIcon={<SkipNextIcon />}
        fullWidth
        sx={{ mt: "2vw" }}
        variant="outlined"
        onClick={() => router.push("/")}
      >
        Skip
      </Button>
    </div>
  );
}
