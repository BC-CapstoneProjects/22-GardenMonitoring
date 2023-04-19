// ./components/BarChart.js
import React from "react";
import Chart from "chart.js/auto";
import { Bar } from "react-chartjs-2";

// Chart.defaults.color = () => {
// 	debugger;
// 	const isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
//   return isDarkMode ? 'stone' : 'white'
// cmd='Mosaic Disease',
// cbb='Bacterial Blight',
// cgm='Green Mite',
// cbsd='Brown Streak Disease',
// healthy='Healthy',
// unknown='Unknown'
// }

const BarChart = () => {
  const labels = ["Mosaic Disease", "Bacterial Blight", "Green Mite", "Brown Streak Disease", "Healthy", "Unknown"];
  const data = {
    labels: labels,
    datasets: [
      {
        label: "Overall Garden Health",
        backgroundColor: ["rgba(255, 99, 132, 0.8)",
        "rgba(54, 162, 235, 0.8)",
        "rgba(255, 206, 86, 0.8)",
        "rgba(75, 192, 192, 0.8)",
        "rgba(153, 102, 255, 0.8)",
        "rgba(255, 159, 64, 0.8)",],
        borderColor: "rgb(255, 99, 132)",
        data: [0.5, 1, 1, 2, 3, 0.2],
      },
    ],

  };
  return (
    <div class="bg-stone-600/0">
      <Bar data={data} />
    </div>
  );
};

export default BarChart;