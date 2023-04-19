import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import plants from '../Plants/PlantDescriptions';
import { plugins } from "chart.js";

// Retrieve disease label from the json of a given plant's 'scan' url from PlantDescriptions
async function fetchDiseaseLabel(scanUrl) {
  try {
    const response = await fetch(scanUrl);
    const json = await response.json();
    return json[0].disease; // Fetch only the first disease label (most recent)
  }
  catch (error) {
    console.error("Error fetching disease label for Garden chart:", error)
    return null;
  }
}

// for each plant id in PlantDescriptions, send it's scan url to fetchDiseaseLabel
// return the parsed disease labels to barchart's data field
async function getScanUrl(plants) {
  const diseaseLabels = await Promise.all(plants.map(plant => fetchDiseaseLabel(plant.scan)));
  return diseaseLabels;
}

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

const BarChart = () => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    getScanUrl(plants).then(diseaseLabels => {
      const diseaseCount = countDiseaseOccurrences(diseaseLabels);
      const data = {
        labels: Object.keys(diseaseCount),
        datasets: [
          {
            label: 'Disease Occurrences',
            data: Object.values(diseaseCount).map(({ count }) => count),
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
            custom: Object.values(diseaseCount).map(({ plantNames }) => plantNames),
          },
        ],
      };
  
      setChartData(data);
    });
  }, []);
  

  //
  
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