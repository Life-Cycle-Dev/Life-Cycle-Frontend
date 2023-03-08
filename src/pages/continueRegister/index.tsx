import React, { ChangeEvent, useState } from "react";
import style from "../../styles/continueRegister.module.css";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
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
import { handleRequest, RequestMethod } from "../../../common/requset";
import Swal from "sweetalert2";
import { useRouter } from "next/router";
import { Gender, UploadResponse } from "@/model/authorization/continueRegister";
import { RegisterProps } from "@/model/environment/env";

export async function getStaticProps() {
  return {
    props: {
      backend_path: process.env.BACKEND_PATH,
      upload_api_key: process.env.UPLOAD_API_KEY,
    },
  };
}

export default function ContinueRegister(props: RegisterProps) {
  const { backend_path, upload_api_key } = props;
  const jwt =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const router = useRouter();

  const [imgId, setImgId] = useState<number>();
  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = e.target.files[0];
      var data = new FormData();
      data.append("files", files);
      const response: Promise<UploadResponse> = await handleRequest({
        path: `${backend_path}/api/upload/`,
        method: RequestMethod.POST,
        headers: {
          Authorization: `Bearer ${upload_api_key}`,
        },
        data: data,
      });
      setImgId((await response).id);
    }
  };

  const [birthDate, setBirthDate] = useState<Date | null>();
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
        path: `${backend_path}/api/users/update`,
        method: RequestMethod.PUT,
        headers: {
          Authorization: `Bearer ${jwt?.split('"')[1]}`,
        },
        data: {
          birthDate: birthDate,
          gender: gender,
          height: height,
          weight: weight,
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
            onChange={(birthDate) => {
              console.log(birthDate);

              setBirthDate(birthDate);
            }}
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
