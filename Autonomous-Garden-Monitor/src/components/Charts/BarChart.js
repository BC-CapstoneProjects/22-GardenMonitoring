import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import plants from '../Plants/PlantDescriptions';
import { plugins } from "chart.js";

const countDiseaseOccurrences = (diseaseLabels) => {
  const diseaseCount = {};
  diseaseLabels.forEach((disease, index) => {
    if (disease) {
      if (!diseaseCount[disease]) {
        diseaseCount[disease] = { count: 0, plantNames: [] };
      }
      diseaseCount[disease].count += 1;
      diseaseCount[disease].plantNames.push(plants[index].name);
    }
  });
  return diseaseCount;
};

const BarChart = ({ data, selectedGarden }) => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    if (data && data.length > 0) {
      const diseaseLabels = data.map((scan) => scan[0].disease);
      const diseaseCount = countDiseaseOccurrences(diseaseLabels);
      const chartData = {
        labels: Object.keys(diseaseCount),
        datasets: [
          {
            label: `Disease Occurrences for ${selectedGarden}`,
            data: Object.values(diseaseCount).map(({ count }) => count),
            backgroundColor: "rgba(75, 192, 192, 0.6)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
            custom: Object.values(diseaseCount).map(({ plantNames }) => plantNames),
          },
        ],
      };

      setChartData(chartData);
    }
  }, [data, selectedGarden]);

  return (
    <div className="bar-chart">
      {chartData ? (
        <Bar
          data={chartData}
          options={{
            maintainAspectRatio: false,
            scales: {
              y: {
                beginAtZero: true,
              },
            },
            plugins: {
              tooltip: {
                callbacks: {
                  title: function (context) {
                    const dataIndex = context[0].dataIndex;
                    const diseaseLabel = context[0].label;
                    const plantNames = chartData.datasets[0].custom[dataIndex];
                    return `Affected plants: \n-${plantNames.join('\n-')}`;
                  },
                },
              },
            },
          }}
        />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default BarChart;
