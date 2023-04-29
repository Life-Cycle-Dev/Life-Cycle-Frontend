import { useEffect, useState } from 'react';
import { formatDate, getDateString } from '@/functions/common';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { getSummarySleepTime } from '@/functions/sleepCycle';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ChartDataLabels
);

export default function SleepChartWeek(props: {
    currentDate?: Date,
}) {

    let options: any = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            title: {
                display: false
            },
            legend: {
                display: false
            },
            datalabels: {
                display: function (context: any) {
                    var index = context.dataIndex;
                    var value = context.dataset.data[index];
                    return value > 0;
                },
                color: '#ffffff',
                anchor: 'end',
                align: 'end',
                offset: -2,
                clamp: true,
                formatter: function (value: any) {
                    const hour = Math.floor(value)
                    const minute = Math.floor((value - hour) * 60)
                    return hour + 'h ' + minute + 'm'
                }
            }
        },
        scales: {
            x: {
                grid: {
                    display: false
                },
                ticks: {
                    color: '#ffffff',
                    font: {
                        size: 10,
                    }
                }
            },
            y: {
                stepSize: 1,
                grid: {
                    display: false,
                },
                ticks: {
                    color: '#ffffff',
                    font: {
                        size: 10
                    }
                },
                max: function (context: any) {
                    let maxData = Math.max(...context.chart.data.datasets[0].data)
                    let count = 0
                    while (maxData > 0.5) {
                        maxData -= 0.5
                        count++
                    }
                    return (count + 1) * 0.5
                },
            }
        }
    };

    const [data, setData] = useState({
        labels: ['', '', '', '', '', '', ''],
        datasets: [
            {
                data: [0, 0, 0, 0, 0, 0, 0],
                backgroundColor: '#ff7644',
                borderRadius: 6
            },
        ],
    })

    useEffect(() => {
        const startDate: Date = props.currentDate ? props.currentDate : new Date()
        getData(startDate);
    }, [props.currentDate])

    const getData = async (currentDate: Date) => {
        let total = [0, 0, 0, 0, 0, 0, 0]
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
                total[i] = parseFloat((isHavingDate.totalSleepTime / (1000 * 60 * 60)).toFixed(2))
            } else {
                total[i] = 0
            }
        }

        setData({
            labels: dateString,
            datasets: [
                {
                    data: total,
                    backgroundColor: '#ff7644',
                    borderRadius: 6
                },
            ],
        })
    }

    return <Bar options={options} data={data} />;
}
