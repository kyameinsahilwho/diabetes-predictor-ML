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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: false,
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
    },
    y: {
      grid: {
        drawTicks: true,
        display: true,
        lineWidth: 3,
      },
    },
  },
  interaction: {
    intersect: false,
  },
};

export default function Chart({ data }) {
  console.log(data)
  const chartData = {
    labels: data.age.map((item) => item),
    
    datasets: [
      {
        label: 'Age vs '+ data.label,
        data: data.data.map((item) => item),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgb(255, 99, 132 )',
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(255, 102, 178)',
        pointHoverBorderColor: 'rgba(255, 102, 178)',
        pointRadius: 0,
        borderWidth: 3,
        tension: 0.5,
      },
    ],
  };

  return <Line options={options} data={chartData} />;
}