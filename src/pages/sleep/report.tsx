import HeaderBar from "@/components/HeaderBar";
import Navbar from "@/components/Navbar";
import SleepChartDay from "@/components/chart/SleepChartDay";
import { formatDate, getDateString } from "@/functions/common";
import { getSummarySleepTime } from "@/functions/sleepCycle";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const snoringValue = 7000

export default function Report() {
    const router = useRouter();
    const { date } = router.query;

    const [data, setData] = useState<any[]>([])

    useEffect(() => {
        if (date) {
            fetchSleepCycle();
        } else {
            router.push("/sleep");
        }
    }, [])

    const fetchSleepCycle = async () => {
        try {
            const currentDate = new Date(date as string)
            let dataList = []
            let dateString = ['', '', '', '', '', '', '']
            let startDate = new Date(currentDate.valueOf() - 6 * 24 * 60 * 60 * 1000)
            const endDate = new Date();

            const summaryData = await getSummarySleepTime(startDate, endDate);

            for (let i = 0; i < 7; i++) {
                dateString[i] = getDateString(new Date(startDate.valueOf() + i * 24 * 60 * 60 * 1000))
                const dateStringMapper = formatDate(new Date(startDate.valueOf() + i * 24 * 60 * 60 * 1000))
                const isHavingDate = summaryData.find((data: any) => {
                    return dateStringMapper === data.date
                })
                if (isHavingDate) {
                    const sleepCycleLines = isHavingDate.sleepCycleLines
                    let snoringTime = 0
                    for (let j = 0; j < sleepCycleLines.length; j++) {
                        const sleepCycleLine = sleepCycleLines[j]
                        if (sleepCycleLine.value > snoringValue) {
                            snoringTime += 1000 * 60
                        }
                    }
                    dataList.push({
                        date: new Date(startDate.valueOf() + i * 24 * 60 * 60 * 1000),
                        dateString: dateString[i],
                        data: isHavingDate,
                        snoringTime: parseFloat((snoringTime / (1000 * 60 * 60)).toFixed(2))
                    })
                } else {
                    dataList.push({
                        date: new Date(startDate.valueOf() + i * 24 * 60 * 60 * 1000),
                        dateString: dateString[i],
                        data: { "date": formatDate(new Date(startDate.valueOf() + i * 24 * 60 * 60 * 1000)), "id": false, "bedTime": "no data", "wakeUpTime": "no data", "sleepCycleLines": [], "totalSleepTime": "no data" },
                        snoringTime: 0
                    })
                }
            }
            dataList = dataList.reverse()
            console.log(dataList);
            setData(dataList);
        } catch (error: any) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error.message,
            }).then(() => {
                router.push("/sleep");
            })
        }
    }

    const getFormattedDate = (date: Date) => {
        const day = date.toLocaleDateString("en-EN", { weekday: "short" });
        const dayOfMonth = date.toLocaleDateString("en-EN", { day: "numeric" });
        const month = date.toLocaleDateString("en-EN", { month: "short" });
        return `${day}, ${dayOfMonth} ${month}`;
    }

    const getFormatTime = (dateString: string) => {
        const date = new Date(new Date(dateString).valueOf() - 7 * 60 * 60 * 1000);
        const hours = date.getHours();
        const minutes = date.getMinutes();
        return `${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}`;
    }

    const convertMinuteToString = (value: number) => {
        const hour = Math.floor(value)
        const minute = Math.floor((value - hour) * 60)
        return hour + 'h ' + minute + 'm'
    }

    return (
        <>
            <Navbar />
            <HeaderBar headerName="Sleep Cycle Report" backRoute="/sleep" />
            <section className="bg-background w-full h-screen text-textWhite p-5">
                <div className="mt-16"></div>

                {data.map((value, index) => {
                    return (
                        <div key={index} className={`shadow-md rounded-[30px] mt-6 bg-backgroundInput backdrop-filter-[blur(35px)] gap-4 p-6 boredr-2`}>
                            <div className="mb-6 flex justify-between items-center font-bold">
                                <div className="text-textWhite text-xl">{getFormattedDate(value.date)}</div>
                            </div>
                            {
                                value.data.bedTime != "no data" ? (
                                    <>
                                        {
                                            value.data.sleepCycleLines.length > 0 && (<>
                                                <div>
                                                    <SleepChartDay sleepCycleLineLists={value?.data?.sleepCycleLines} showTimeLabel={false} />
                                                </div>
                                                <div className="flex items-between justify-between font-bold text-[14px] mb-5">
                                                    <div>{getFormatTime(value.data.bedTime)}</div>
                                                    <div>{getFormatTime(value.data.wakeUpTime)}</div>
                                                </div>
                                            </>)
                                        }
                                        <div className="flex justify-between">
                                            <div>
                                                <div className="font-bold"><span className="text-primary">Time: </span>{getFormatTime(value.data.bedTime)} - {getFormatTime(value.data.wakeUpTime)}</div>
                                                <div className="font-bold mt-1"><span className="text-primary">Sleep Times: </span>{convertMinuteToString(value.data.totalSleepTime / 1000 / 60 / 60)}</div>
                                                <div className="font-bold mt-1"><span className="text-primary">Snoring Times: </span>{convertMinuteToString(value.snoringTime)}</div>
                                            </div>
                                            <div>
                                                <Link className="flex items-center justify-center cursor-pointer"
                                                    href={`/sleep/edit?date=${value.data.date}`}>
                                                    <div className="flex items-center justify-center bg-primary rounded-[30px] px-4 py-2">
                                                        <div className="text-[14px] font-bold">Edit</div>
                                                    </div>
                                                </Link>
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className="h-[60px] flex flex-col items-center justify-center mb-6">
                                            <div className="text-center text-iconInput text-[14px]">No data</div>
                                        </div>
                                        <Link className="flex items-center justify-end cursor-pointer"
                                            href={`/sleep/edit?date=${value.data.date}`}>
                                            <div className="flex items-center justify-center bg-primary rounded-[30px] px-4 py-2">
                                                <div className="text-[14px] font-bold">Add record</div>
                                            </div>
                                        </Link>
                                    </>
                                )
                            }

                        </div>
                    )
                })}

                <div className="pb-20"></div>
            </section>
        </>
    );
}
