import {
  Gender,
  GetUserInfoResponse,
  UploadResponse,
} from "@/model/users/users";
import {
  ChangeEvent,
  SyntheticEvent,
  useRef,
  useState,
  useEffect,
} from "react";
import { handleRequest } from "../../common/requset";
import { RequestMethod } from "@/model/common/common";
import Swal from "sweetalert2";
import { getUser } from "../../common/getUser";
import HeaderBar from "@/components/HeaderBar";
import DateIcon from "@/icons/DateIcon";
import UserIcon from "@/icons/UserIcon";
import FemaleIcon from "@/icons/FemaleIcon";
import MaleIcon from "@/icons/MaleIcon";
import moment from "moment";
import HeightIcon from "@/icons/HeightIcon";
import WeightIcon from "@/icons/WeightIcon";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function Profile(props: { user: GetUserInfoResponse }) {
  const inputFileRef = useRef<any>();

  const [gender, setGender] = useState<Gender>(Gender.FEMALE);
  const [userImgId, setUserImgId] = useState<number>(-1);
  const [userImgUrl, setUserImgUrl] = useState<string>("");
  const [birthDate, setBirthDate] = useState<Date | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token") || "";
    getUser(token)
      .then((user: any) => {
        if (user) {
          setBirthDate(user.birthdate ? new Date(user.birthdate) : null);
          setUserImgId(user?.profileImage?.id);
          setGender(user?.gender);
          setUserImgUrl(user?.profileImage?.url);
        }
      })
      .catch(() => { });
  }, []);

  const [isUpload, setIsUpload] = useState<boolean>(false);

  const handleUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setIsUpload(true);
      const file = e.target.files[0];
      const formdata = new FormData();
      formdata.append("files", file);
      const response: UploadResponse[] = await handleRequest({
        path: `${process.env.NEXT_PUBLIC_BACKEND_PATH}/api/upload/`,
        method: RequestMethod.POST,
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_UPLOAD_API_KEY}`,
        },
        data: formdata,
      });
      setUserImgUrl(response[0].url);
      setIsUpload(false);
      setUserImgId(response[0].id);
    }
  };

  const handleUpdateUserInfo = async (e: SyntheticEvent) => {
    try {
      e.preventDefault();
      const target = e.target as typeof e.target & {
        name: { value: string };
        gender: { value: Gender };
        height: { value: number };
        weight: { value: number };
        birth_date: { value: Date };
      };
      const name = target.name.value;
      const gender = target.gender.value;
      const height = target.height.value;
      const weight = target.weight.value;
      const date = birthDate ? moment(birthDate).format("YYYY-MM-DD") : null;
      const jwt = localStorage.getItem("token") || "";

      const data: any = {
        name: name,
        gender: gender,
        height: height || 0,
        weight: weight || 0,
        profileImage: userImgId === -1 ? null : userImgId,
      };

      if (date) {
        data.birthdate = date;
      }

      await handleRequest({
        path: `${process.env.NEXT_PUBLIC_BACKEND_PATH}/api/users/update`,
        method: RequestMethod.PUT,
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
        data: data,
      });

      await Swal.fire({
        icon: "success",
        title: "Updated Personal Information",
        showConfirmButton: false,
        timer: 1500,
        iconColor: "var(--primary)",
      });
      window.location.href = "/";
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "error",
        text: (error as Error).message,
      });
    }
  };

  const onLogout = async () => {
    try {
      await localStorage.removeItem("token");
      window.location.href = "/login";
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "error",
        text: (error as Error).message,
      });
    }
  };

  const onChangeDate = (date: Date | null) => {
    setBirthDate(date);
  }

  return (
    <div>
      <HeaderBar headerName="Profile" />
      <section className="bg-background w-full h-screen text-textWhite p-5">
        <div className="grid grid-cols-1 mt-20 pb-20">
          <div className="flex items-center justify-center">
            <div className="w-full">
              <form onSubmit={handleUpdateUserInfo}>
                <div className="space-y-5">
                  <div className="sticky flex justify-center">
                    <img
                      src={userImgUrl ? userImgUrl : "asset/profile icon.png"}
                      className={`${isUpload && "animate-pulse"
                        } bottom-0 left-0 z-0 rounded-full w-[100px] h-[100px] object-cover`}
                    />
                    <div
                      className={`${isUpload && "animate-pulse"
                        } w-[100px] h-[100px] object-cover cursor-pointer overflow-hidden absolute  bottom-0 z-0 rounded-full`}
                      onClick={() => inputFileRef.current.click()}
                    >
                      <div className="absolute bottom-0 z-10 w-full text-center p-0.5 pb-1 bg-[#00000080] text-white">
                        Upload
                      </div>
                    </div>
                    <input
                      type="file"
                      onChange={handleUpload}
                      ref={inputFileRef}
                      className="hidden"
                    />
                  </div>

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
                        type="string"
                        name="name"
                        id="name"
                        defaultValue={props.user?.name}
                        placeholder="Name"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="birthDate"
                      className="text-base font-medium text-gray-900"
                    >
                      Birth Date{" "}
                    </label>
                    <div className="mt-2.5 relative text-gray-400 focus-within:text-gray-600">
                      <div className="absolute inset-y-0 left-0 flex items-center z-10 pl-3 pointer-events-none">
                        <DateIcon />
                      </div>
                      <DatePicker
                        onChange={(date) => onChangeDate(date)}
                        selected={birthDate}
                        maxDate={new Date()}
                        className="inline-flex items-center text-sm pl-10 py-[1rem] text-textWhite"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="gender" className="text-dark font-medium">
                      {" "}
                      Gender{" "}
                    </label>
                    <div className="mt-2.5 relative text-gray-600 focus-within:text-gray-600">
                      <div className="flex gap-4">
                        <div
                          className={`${gender === Gender.FEMALE &&
                            "border border-primary text-primary"
                            } flex gap-3 items-center w-[50%] py-4 rounded-xl bg-backgroundInput cursor-pointer `}
                          onClick={() => setGender(Gender.FEMALE)}
                        >
                          <div className="flex items-center pl-3 pointer-events-none">
                            <FemaleIcon
                              color={`${gender === Gender.FEMALE
                                ? "var(--primary)"
                                : "var(--iconInput)"
                                }`}
                            />
                          </div>
                          Female
                        </div>
                        <div
                          className={`${gender === Gender.MALE &&
                            "border border-primary text-primary"
                            } flex gap-3 items-center w-[50%] py-4 rounded-xl bg-backgroundInput cursor-pointer `}
                          onClick={() => setGender(Gender.MALE)}
                        >
                          <div className="flex items-center pl-3 pointer-events-none">
                            <MaleIcon
                              color={`${gender === Gender.MALE
                                ? "var(--primary)"
                                : "var(--iconInput)"
                                }`}
                            />
                          </div>
                          Male
                        </div>
                      </div>
                      <input
                        type="text"
                        name="gender"
                        id="gender"
                        value={gender}
                        placeholder="Enter your name"
                        className="hidden"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="height"
                      className="text-base font-medium text-gray-900"
                    >
                      {" "}
                      Height{" "}
                    </label>
                    <div className="mt-2.5 relative text-gray-400 focus-within:text-gray-600">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <HeightIcon />
                      </div>
                      <input
                        min={0}
                        type="number"
                        name="height"
                        id="height"
                        defaultValue={props.user?.height}
                        placeholder="Height (cm.)"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="weight"
                      className="text-base font-medium text-gray-900"
                    >
                      {" "}
                      Weight{" "}
                    </label>
                    <div className="mt-2.5 relative text-gray-400 focus-within:text-gray-600">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <WeightIcon />
                      </div>
                      <input
                        min={0}
                        type="number"
                        name="weight"
                        id="weight"
                        defaultValue={props.user?.weight}
                        placeholder="Weight (kg.)"
                      />
                    </div>
                  </div>

                  <div>
                    <button
                      type="submit"
                      className={`${isUpload
                        ? "bg-disable"
                        : "bg-primary focus:outline-none"
                        } inline-flex items-center justify-center w-full px-4 py-4 rounded-3xl font-semibold`}
                    >
                      Save
                    </button>
                  </div>
                </div>
              </form>

              <div
                onClick={onLogout}
                className="mt-6 text-primary font-semibold text-center"
              >
                Logout
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
