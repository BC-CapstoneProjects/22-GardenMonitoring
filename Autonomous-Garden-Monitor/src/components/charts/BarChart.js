import React from "react";
import { Bar } from "react-chartjs-2";
import plants from '../Plants/PlantDescriptions';

const BarChart = () => {
  const labels = ["Mosaic Disease", "Bacterial Blight", "Green Mite", "Brown Streak Disease", "Healthy", "Unknown"];
  const countDiseaseOccurences = () => {
    const diseaseCounts = Array(labels.length).fill(0);

    plants.forEach((plant) => {
      const diseaseIndex = parseInt(plant.disease, 10);
      if (diseaseIndex >= 0 && diseaseIndex < labels.length) {
        diseaseCounts[diseaseIndex]++;
      }
    });
    return diseaseCounts;
  }
 
  const data = {
    labels: labels,
    datasets: [
      {
        label: "Garden Disease Overview",
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgb(255, 99, 132)",
        data: countDiseaseOccurences(),
      },
    ],
  };

  const options = {
    scales: {
      y: {
        title: {
          display: true,
          text: "Number of plants affected",
        },
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