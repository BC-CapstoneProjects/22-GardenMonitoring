// ./components/BarChart.js
import React from "react";
import Chart from "chart.js/auto";
import { Line } from "react-chartjs-2";

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
      }
    const data = {
        
        labels: ['Drone Timestamp1', 'Drone Timestamp2', 'Drone Timestamp3', 'Drone Timestamp4', 'Drone Timestamp5', 'Drone Timestamp6'],
        datasets: [
            {
              label: 'Mosaic Disease',
              data: [5, 10, 30, 20, 25, 30],
              fill: false,
              borderColor: 'red',
            },
            {
              label: 'Bacterial Blight',
              data: [10, 15, 20, 25, 30, 35],
              fill: false,
              borderColor: 'yellow',
            },
            {
              label: 'Green Mite',
              data: [15, 20, 25, 30, 35, 35],
              fill: false,
              borderColor: 'green',
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
              borderColor: 'blue',
            },
            {
              label: 'Unknown',
              data: [30, 35, 40, 45, 50, 55],
              fill: false,
              borderColor: 'purple',
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