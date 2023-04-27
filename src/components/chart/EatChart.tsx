import { useEffect, useState } from 'react';
import { getLastSunday, formatDate } from '@/functions/common';
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

const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

export default function EatChart(props: {
  onLoad: (loading: boolean) => void;
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
        }
      },
      y: {
        stepSize: 100,
        grid: {
          display: false,
        },
        ticks: {
          color: '#ffffff',
          stepSize: 200
        }
      }
    }
  };

  const [data, setData] = useState({
    labels: days,
    datasets: [
      {
        data: [0, 0, 0, 0, 0, 0, 0],
        backgroundColor: '#ff7644',
        borderRadius: 6
      },
    ],
  })

  useEffect(() => {
    getData();
  }, [])

  const getData = async () => {
    let startDate = await getLastSunday()
    const total = [0, 0, 0, 0, 0, 0, 0]
    for (let index = 0; index < 7; index++) {
      const data = await getFoodOfUser(formatDate(startDate))
      const totalCalories = await data.reduce((total: number, food: any) => total + food.calorie, 0)
      total[index] = totalCalories
      startDate.setDate(startDate.getDate() + 1)
    }
    setData({
      labels: days,
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
