import { useTheme } from "@mui/material";
import { ResponsiveBar } from "@nivo/bar";
import { tokens } from "../theme";
import { Bar } from "react-chartjs-2";
import plants from '../components/Plants/PlantDescriptions';
import React, { useState, useEffect } from "react";

const BarChart = ({ isDashboard = false, data}) => {

  const [barData, setBarData] = useState([]);
  //const [chartData, setChartData] = useState(null);  //
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  if (!data) {
    return <p>
      not found...
      </p>;
  }
    

  if (!data) {
    return <p></p>;
  }

  console.log('bardata import', data);

  for (let i = 0; i < Object.keys(data).length; i++) {
    //sort date
    data[i].sort((a, b) => {
        var dateA = new Date(a.date), dateB = new Date(b.date);
        return dateA - dateB;
    });
}

  console.log('bardaasdasta import', data);


  const labels = ["Mosaic Disease", "Bacterial Blight", "Green Mite", "Brown Streak Disease", "Healthy", "Unknown"];


  function restructureData(data) {
    // First we'll create a dictionary to store the data by date
    let dateDict = {};
    let diseases = ['Healthy', 'Bacterial Blight', 'Green Mite', 'Mosaic Disease', 'Brown Streak Disease', 'Unknown'];

    // Generate color function, change to suit your need
    const generateColor = (disease) => {
      switch (disease) {
        case 'Healthy':
          return 'hsl(120, 70%, 50%)';
        case 'Bacterial Blight':
          return 'hsl(296, 70%, 50%)';
        case 'Green Mite':
          return 'hsl(97, 70%, 50%)';
        case 'Mosaic Disease':
          return 'hsl(229, 70%, 50%)';
        case 'Brown Streak Disease':
          return 'hsl(340, 70%, 50%)';
        case 'Unknown':
          return 'hsl(0, 0%, 70%)';
      }
    }

    // Iterate over the input data
    for (let diseaseData of Object.values(data)) {
      for (let item of diseaseData) {
        let date = item.date;
        let disease = Object.keys(item.data)[0];
        let value = item.data[disease];

        // If this date has not been seen before, initialize it in dateDict
        if (!dateDict[date]) {
          dateDict[date] = { date: date };
          // Initialize all diseases for this date
          for (let disease of diseases) {
            dateDict[date][disease] = 0;
            dateDict[date][disease + "Color"] = generateColor(disease);
          }
        }

        // Add the value to the corresponding disease on this date
        dateDict[date][disease] = parseFloat(value);
      }
    }

    // Return the values of dateDict as an array
    return Object.values(dateDict);
  }

  // Use your data here
  data = restructureData(data);


  console.log('asdasdata', data);

  // const dateDiseaseCounts = {};


  //   function formatDate(time_stamp) {
  //     const [dayOfWeek, day, month, year, time, timeZone] = time_stamp.split(/[-\s:]/);
  //     const months = {
  //       Jan: '01',
  //       Feb: '02',
  //       Mar: '03',
  //       Apr: '04',
  //       May: '05',
  //       Jun: '06',
  //       Jul: '07',
  //       Aug: '08',
  //       Sep: '09',
  //       Oct: '10',
  //       Nov: '11',
  //       Dec: '12',
  //     };

  //     return `${year}-${months[month]}-${day}`;
  //   }

  //   data.forEach(diseaseInfo => {
  //     const date = formatDate(diseaseInfo.timestamp);
  //     const disease = diseaseInfo.disease;

  //     if (!dateDiseaseCounts[date]) {
  //       dateDiseaseCounts[date] = {
  //         "Mosaic Disease": 0,
  //         "Bacterial Blight": 0,
  //         "Green Mite": 0,
  //         "Brown Streak Disease": 0,
  //         "Healthy": 0,
  //         "Unknown": 0
  //       };
  //     }

  //     dateDiseaseCounts[date][disease]++;
  //   });  

  //   console.log('dateDiseaseCounts', dateDiseaseCounts);

  //   function prepareBarChartData(dateDiseaseCounts) {
  //     const diseaseColors = {
  //       "Mosaic Disease": "hsl(229, 70%, 50%)",
  //       "Bacterial Blight": "hsl(296, 70%, 50%)",
  //       "Green Mite": "hsl(97, 70%, 50%)",
  //       "Brown Streak Disease": "hsl(340, 70%, 50%)",
  //       "Healthy": "hsl(120, 70%, 50%)",
  //       "Unknown": "hsl(0, 0%, 70%)",
  //     };

  //     const barChartData = [];

  //     for (const date in dateDiseaseCounts) {
  //       const dateData = { date };
  //       const diseaseCounts = dateDiseaseCounts[date];

  //       for (const disease in diseaseCounts) {
  //         const count = diseaseCounts[disease];
  //         const colorKey = `${disease}Color`;

  //         dateData[disease] = count;
  //         dateData[colorKey] = diseaseColors[disease];
  //       }

  //       barChartData.push(dateData);
  //     }

  //     return barChartData;
  //   }

  //   const newBarData = prepareBarChartData(dateDiseaseCounts);
  //   newBarData.sort((a, b) => new Date(a.date) - new Date(b.date));
  //   setBarData(newBarData); // update the state variable

  //   console.log('barData111', barData);

  const dataexam = {
    country: "AD",
    "hot dog": 137,
    "hot dogColor": "hsl(229, 70%, 50%)",
    burger: 96,
    burgerColor: "hsl(296, 70%, 50%)",
    kebab: 72,
    kebabColor: "hsl(97, 70%, 50%)",
    donut: 140,
    donutColor: "hsl(340, 70%, 50%)",
  }

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
    <ResponsiveBar
      data={data}
      theme={{
        // added
        axis: {
          domain: {
            line: {
              stroke: colors.grey[100],
            },
          },
          legend: {
            text: {
              fill: colors.grey[100],
            },
          },
          ticks: {
            line: {
              stroke: colors.grey[100],
              strokeWidth: 1,
            },
            text: {
              fill: colors.grey[100],
            },
          },
        },
        legends: {
          text: {
            fill: colors.grey[100],
          },
        },
      }}
      keys={labels}
      indexBy="date"
      margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
      padding={0.3}
      valueScale={{ type: "linear" }}
      indexScale={{ type: "band", round: true }}
      colors={{ scheme: "nivo" }}
      defs={[
        {
          id: "dots",
          type: "patternDots",
          background: "inherit",
          color: "#38bcb2",
          size: 4,
          padding: 1,
          stagger: true,
        },
        {
          id: "lines",
          type: "patternLines",
          background: "inherit",
          color: "#eed312",
          rotation: -45,
          lineWidth: 6,
          spacing: 10,
        },
      ]}
      borderColor={{
        from: "color",
        modifiers: [["darker", "1.6"]],
      }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard ? undefined : "Date", // changed
        legendPosition: "middle",
        legendOffset: 32,
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard ? undefined : "Desease", // changed
        legendPosition: "middle",
        legendOffset: -40,
      }}
      enableLabel={false}
      labelSkipWidth={12}
      labelSkipHeight={12}
      labelTextColor={{
        from: "color",
        modifiers: [["darker", 1.6]],
      }}
      legends={[
        {
          dataFrom: "keys",
          anchor: "bottom-right",
          direction: "column",
          justify: false,
          translateX: 120,
          translateY: 0,
          itemsSpacing: 2,
          itemWidth: 100,
          itemHeight: 20,
          itemDirection: "left-to-right",
          itemOpacity: 0.85,
          symbolSize: 20,
          effects: [
            {
              on: "hover",
              style: {
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
      role="application"
      barAriaLabel={function (e) {
        return e.id + ": " + e.formattedValue + " in country: " + e.indexValue;
      }}
    />
  );
};

export default BarChart;
