import { useEffect, useState } from 'react';
import ChartDataLabels from 'chartjs-plugin-datalabels';
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels
);

export default function SleepChartDay(props: {
  sleepCycleLineLists: any[],
  showTimeLabel: boolean
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
        display: false
      }
    },
    scales: {
      x: {
        grid: {
          display: false
        },
        ticks: {
          font: {
            size: 10,
          },
          color: '#ffffff',
          display: props.showTimeLabel
        }
      },
      y: {
        stepSize: 400,
        grid: {
          display: false,
        },
        ticks: {
          display: false,
        }
      }
    }
  };

  const [data, setData] = useState({
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: '#ff7644',
        borderRadius: 6
      },
    ],
  })

  const getFormatTime = (dateString: string) => {
    const date = new Date(new Date(dateString).valueOf() - 7 * 60 * 60 * 1000);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return `${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}`;
  }

  useEffect(() => {
    let labels: any = [];
    let data: any = [];
    let lengthList = props.sleepCycleLineLists.length;

    for (let i = 0; i < lengthList; i++) {
      labels.push(getFormatTime(props.sleepCycleLineLists[i].startTime));
      data.push(props.sleepCycleLineLists[i].value);
    }

    setData({
      labels: labels,
      datasets: [
        {
          data: data,
          backgroundColor: '#ff7644',
          borderRadius: 6
        },
      ],
    })
  }, [props.sleepCycleLineLists])

  return <Bar options={options} data={data} />;
}
