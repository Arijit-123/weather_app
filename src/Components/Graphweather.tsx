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
  udates: string[];
  max_temp:number[]; // Specify the type of udates
  min_temp:number[];
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
export function Graphweather({udates,max_temp,min_temp}:Props) {
const labels = udates;





 const data = {
  labels,
  datasets: [
    {
      label: 'Max Temp',
      data: max_temp,
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: 'Min Temp',
      data: min_temp,
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
   
  ],
};



  return <Line options={options} data={data} />;
}
