import { Gender } from "@/model/users/users"
import { useRef, useState, ChangeEvent, SyntheticEvent } from "react"
import { handleRequest } from "../../common/requset";
import { UploadResponse } from "@/model/users/users";
import { RequestMethod } from "@/model/common/common";
import moment from 'moment';
import Link from "next/link";
import Swal from "sweetalert2";

export default function ContinueRegister() {
    const inputFileRef = useRef<any>()

    const [gender, setGender] = useState<Gender>(Gender.FEMALE)
    const [userImgId, setUserImgId] = useState<number>(-1)
    const [userImgUrl, setUserImgUrl] = useState<string>("")
    const [isUpload, setIsUpload] = useState<boolean>(false)

    const onUpload = async (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setIsUpload(true)
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
            setUserImgUrl(response[0].formats.small.url)
            setIsUpload(false)
            setUserImgId(response[0].id)
        }
    }

    const onContinueRegister = async (e: SyntheticEvent) => {
        try {
            e.preventDefault();
            const target = e.target as typeof e.target & {
              gender: { value: Gender };
              height: { value: number };
              weight: { value: number };
              birth_date: { value: Date };
            };
            const gender = target.gender.value;
            const height = target.height.value;
            const weight = target.weight.value;
            const date = target.birth_date.value;
            const jwt = localStorage.getItem("token");

            let preData:any = {
                gender: gender,
                height: height || 0,
                weight: weight || 0,
                profileImage: userImgId === -1 ? null : userImgId,
            }

            if(date) {
                preData = {
                    ...preData,
                    birthdate: date
                }
            }

            await handleRequest({
                path: `${process.env.NEXT_PUBLIC_BACKEND_PATH}/api/users/update`,
                method: RequestMethod.PUT,
                headers: {
                  Authorization: `Bearer ${jwt}`,
                },
                data: preData
            });

            await Swal.fire({
                icon: "success",
                title: "Updated Personal Information",
                showConfirmButton: false,
                timer: 1500,
            });
            window.location.href = "/"
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "error",
                text: (error as Error).message,
            });
        }
    };

  return (
    <section className="bg-white">
      <div className="grid grid-cols-1">
        <div className="flex items-center justify-center px-4 py-10 bg-white sm:px-6 lg:px-8 sm:py-16 lg:py-24">
          <div className="xl:w-full xl:max-w-sm 2xl:max-w-md xl:mx-auto">
            <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl">Additional Information</h2>
            <form className="mt-8" onSubmit={onContinueRegister}>
              <div className="space-y-5">

                <div className="sticky flex justify-center">
                    <img src={userImgUrl ? userImgUrl : "asset/profile icon.png"} 
                         className={`${isUpload && "animate-pulse"} bottom-0 left-0 z-0 w-[120px] rounded-full`} />
                    <div className={`${isUpload && "animate-pulse"} cursor-pointer overflow-hidden absolute bottom-0 h-full z-10 bottom-0 z-0 w-[120px] rounded-full`}
                         onClick={() => inputFileRef.current.click()}>
                        <div className="absolute bottom-0 z-10 w-full text-center p-0.5 pb-1.5 font-bold bg-[#00000080] text-white">Upload</div>
                    </div>
                    <input type="file"
                           onChange={onUpload}
                           ref={inputFileRef} 
                           className="hidden" />
                </div>

                <div>
                  <label htmlFor="birth_date" className="text-base font-medium text-gray-900">Birth Date</label>
                  <div className="mt-2.5 relative text-gray-400 focus-within:text-gray-600">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" /></svg>
                    </div>
                    <input type="date" name="birth_date" id="birth_date" placeholder="Enter your name" 
                           max={moment().format("YYYY-MM-DD")}
                           className="block w-full py-4 pl-10 pr-4 text-black placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600" />
                  </div>
                </div>

                <div>
                  <label htmlFor="gender" className="text-dark font-medium"> Gender </label>
                  <div className="mt-2.5 relative text-gray-600 focus-within:text-gray-600">
                    <div className="flex gap-4">
                        <div className={`${gender === Gender.FEMALE ? "border-blue-600 text-blue-600" : "border-gray-200"} flex items-center block w-[50%] py-4 pl-10 pr-4 border hover:border-blue-600 rounded-md bg-gray-50 cursor-pointer`}
                             onClick={() => setGender(Gender.FEMALE)}>
                            <lord-icon
                                src="https://cdn.lordicon.com/bwnhdkha.json"
                                trigger="hover"
                                style={{width:'50px',height:'50px'}}>
                            </lord-icon>
                            Female
                        </div>
                        <div className={`${gender === Gender.MALE ? "border-blue-600  text-blue-600" : "border-gray-200 "} flex text-black items-center block w-[50%] py-4 pl-10 pr-4 border hover:border-blue-600 rounded-md bg-gray-50 cursor-pointer`}
                             onClick={() => setGender(Gender.MALE)}>
                            <lord-icon
                                src="https://cdn.lordicon.com/eszyyflr.json"
                                trigger="hover"
                                style={{width:'50px',height:'50px'}}>
                            </lord-icon>
                            Male
                        </div>
                    </div>
                    <input type="text" name="gender" id="gender" value={gender} placeholder="Enter your name" className="hidden block w-full py-4 pl-10 pr-4 text-black placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600" />
                  </div>
                </div>

                <div>
                  <label htmlFor="height" className="text-base font-medium text-gray-900"> Height </label>
                  <div className="mt-2.5 relative text-gray-400 focus-within:text-gray-600">
                    <input min={0} type="number" name="height" id="height" placeholder="Height (cm.)" className="block w-full p-4 text-black placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600" />
                  </div>
                </div>

                <div>
                  <label htmlFor="weight" className="text-base font-medium text-gray-900"> Weight </label>
                  <div className="mt-2.5 relative text-gray-400 focus-within:text-gray-600">
                    <input min={0} type="number" name="weight" id="weight" placeholder="Weight (kg.)" className="block w-full p-4 text-black placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600" />
                  </div>
                </div>

                <div>
                  <button type="submit" disabled={isUpload} className={`${isUpload ? "bg-gray-600" : "bg-gradient-to-r from-fuchsia-600 to-blue-600 focus:outline-none hover:opacity-80 focus:opacity-80"} inline-flex items-center justify-center w-full px-4 py-4 text-base font-semibold text-white transition-all duration-200 border border-transparent rounded-md mt-6`}>
                    Continue
                  </button>
                </div>
                <Link href="/">
                    <div className="mt-6 text-base text-blue-600 font-bold text-center">
                        Skip
                    </div>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
