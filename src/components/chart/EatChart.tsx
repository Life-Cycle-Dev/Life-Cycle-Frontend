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
import { getFoodOfUser } from '@/functions/eatCycle';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels
);

export default function EatChart(props: {
  onLoad: (loading: boolean) => void,
  currentDate?: Date,
}) {

  let options:any = {
    responsive: true,
    plugins: {
      title: {
        display: false
      },
      legend: {
        display: false
      },
      datalabels: {
        display: function(context:any) {
          var index = context.dataIndex;
          var value = context.dataset.data[index];
          return value > 0; 
        },
        color: '#ffffff',
        anchor: 'end',
        align: 'end',
        offset: -2,
        clamp: true,
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
        stepSize: 200,
        grid: {
          display: false,
        },
        ticks: {
          color: '#ffffff',
          stepSize: 200,
          font: {
            size: 10,
          }
        }
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
    const startDate:Date = props.currentDate ? props.currentDate : new Date()
    getData(startDate);
  }, [props.currentDate])

  const getData = async (currentDate:Date) => {
    let total = [0, 0, 0, 0, 0, 0, 0]
    let dateString = ['', '', '', '', '', '', '']
    let startDate = new Date(currentDate.valueOf() - 6 * 24 * 60 * 60 * 1000)
    for (let index = 0; index < 7; index++) {
      const data = await getFoodOfUser(formatDate(startDate))
      const totalCalories = await data.reduce((total: number, food: any) => total + food.calorie, 0).toFixed(1)
      total[index] = totalCalories
      dateString[index] = getDateString(startDate)
      startDate.setDate(startDate.getDate() + 1)
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
    props.onLoad(false)
  }

  return <Bar options={options} data={data} />;
}