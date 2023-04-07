import React from "react";
import { Bar } from "react-chartjs-2";

const BarChart = () => {
  const labels = ["Mosaic Disease", "Bacterial Blight", "Green Mite", "Brown Streak Disease", "Healthy", "Unknown"];
  const data = {
    labels: labels,
    datasets: [
      {
        label: "Current Disease Count",
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgb(255, 99, 132)",
        data: [0, 1, 2, 1, 3, 0],
      },
    ],
  };

  const options = {
    scales: {
      y: {
        ticks: {
          stepSize: 1,
        },
      },
    },
  };

  return (
    <div class="bg-stone-600/0">
      <Bar data={data} options={options}/>
    </div>
  );
};

export default BarChart;