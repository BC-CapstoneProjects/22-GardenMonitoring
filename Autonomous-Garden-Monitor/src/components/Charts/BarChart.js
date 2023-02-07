// ./components/BarChart.js
import React from "react";
import Chart from "chart.js/auto";
import { Bar } from "react-chartjs-2";

// Chart.defaults.color = () => {
// 	debugger;
// 	const isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
//   return isDarkMode ? 'stone' : 'white'
// }

const BarChart = () => {
  const labels = ["January", "February", "March", "April", "May", "June"];
  const data = {
    labels: labels,
    datasets: [
      {
        label: "Growth chart (in Inches)",
        backgroundColor: "rgb(255, 99, 132)",
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