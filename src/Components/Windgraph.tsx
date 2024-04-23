import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { faker } from '@faker-js/faker';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
interface Props {
    udates:string[];
 windspeed: number[];
 windgust:number[];
 winddegree:number[];
}
export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: '',
    },
  },
};
export function Windgraph({udates,windspeed,windgust,winddegree}:Props) {
const labels = udates;





 const data = {
  labels,
  datasets: [
    {
      label: 'Wind Speed',
      data: windspeed,
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: 'Wind Gust',
      data: windgust,
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
    {
        label: 'Degree',
        data: winddegree,
        borderColor: 'green',
        backgroundColor: 'green',
      },
  ],
};



  return <Line options={options} data={data} />;
}
