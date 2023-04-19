// ./components/BarChart.js
import React from "react";
import Chart from "chart.js/auto";
import { Line } from "react-chartjs-2";
import plants from '../Plants/PlantDescriptions';

// Chart.defaults.color = () => {
// 	debugger;
// 	const isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
//   return isDarkMode ? 'stone' : 'white'
// // }
// cmd='Mosaic Disease',
// cbb='Bacterial Blight',
// cgm='Green Mite',
// cbsd='Brown Streak Disease',
// healthy='Healthy',
// unknown='Unknown'
const LineChart = () => {
    const options = {
        scales: {
          yAxes: [{
            scaleLabel: {
              display: true,
              labelString: '%'
            }
          }]
        }     
      };

    const timestamps = plants.map((plant) => plant.timestamp);

    const data = {
        
        labels: [timestamps],
        datasets: [
            {
              label: 'Mosaic Disease',
              data: [5, 10, 30, 20, 25, 30],
              fill: false,
              borderColor: '#470000',
            },
            {
              label: 'Bacterial Blight',
              data: [10, 15, 20, 25, 30, 35],
              fill: false,
              borderColor: '#f87272',
            },
            {
              label: 'Green Mite',
              data: [15, 20, 25, 30, 35, 35],
              fill: false,
              borderColor: '#fbbd23',
            },
            {
              label: 'Brown Streak Disease',
              data: [20, 25, 30, 25, 40, 45],
              fill: false,
              borderColor: 'brown',
            },
            {
              label: 'Healthy',
              data: [0, 30, 35, 40, 15, 50],
              fill: false,
              borderColor: '#36d399',
            },
            {
              label: 'Unknown',
              data: [30, 35, 40, 45, 50, 55],
              fill: false,
              borderColor: '#3abff8',
            },
          ],
        };
      
        return (
          <div>
            <Line data={data} 
                options={options}
            />
          </div>
        );
      };
      
      export default LineChart;