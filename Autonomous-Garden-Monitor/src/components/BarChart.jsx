import { useTheme } from "@mui/material";
import { ResponsiveBar } from "@nivo/bar";
import { tokens } from "../theme";
import React from "react";
import { Bar } from "react-chartjs-2";
import plants from '../components/Plants/PlantDescriptions';


const BarChart = ({ isDashboard = false, data, selectedGarden }) => {
  //const [chartData, setChartData] = useState(null);  //
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);


  // [  [{"time_stamp":"Sat-15-Feb-202302:08:23+0000","probability":50,"disease":"Green Mite"},{"time_stamp":"Sat-08-Feb-202302:08:23+0000","probability":15,"disease":"Green Mite"}]  ] 


  /*
  export const mockBarData = [
    {
      date: "03/12/2023",
      "Mosaic Disease": 137,
      "Mosaic DiseaseColor": "hsl(229, 70%, 50%)",
      "Bacterial Blight": 96,
      "Bacterial BlightColor": "hsl(296, 70%, 50%)",
      "Green Mite": 72,
      "Green MiteColor": "hsl(97, 70%, 50%)",
      "Brown Streak Disease": 140,
      "Brown Streak DiseaseColor": "hsl(340, 70%, 50%)",
      "Healthy": 120,
      "HealthyColor": "hsl(120, 70%, 50%)",
      "Unknown": 100,
      "UnknownColor": "hsl(0, 0%, 70%)",
    },
    {
      date: "03/13/2023",
      "Mosaic Disease": 137,
      "Mosaic DiseaseColor": "hsl(229, 70%, 50%)",
      "Bacterial Blight": 96,
      "Bacterial BlightColor": "hsl(296, 70%, 50%)",
      "Green Mite": 72,
      "Green MiteColor": "hsl(97, 70%, 50%)",
      "Brown Streak Disease": 140,
      "Brown Streak DiseaseColor": "hsl(340, 70%, 50%)",
      "Healthy": 120,
      "HealthyColor": "hsl(120, 70%, 50%)",
      "Unknown": 100,
      "UnknownColor": "hsl(0, 0%, 70%)",
    },
    {
      date: "03/14/2023",
      "Mosaic Disease": 137,
      "Mosaic DiseaseColor": "hsl(229, 70%, 50%)",
      "Bacterial Blight": 96,
      "Bacterial BlightColor": "hsl(296, 70%, 50%)",
      "Green Mite": 72,
      "Green MiteColor": "hsl(97, 70%, 50%)",
      "Brown Streak Disease": 140,
      "Brown Streak DiseaseColor": "hsl(340, 70%, 50%)",
      "Healthy": 120,
      "HealthyColor": "hsl(120, 70%, 50%)",
      "Unknown": 100,
      "UnknownColor": "hsl(0, 0%, 70%)",
    },
    {
      date: "03/15/2023",
      "Mosaic Disease": 137,
      "Mosaic DiseaseColor": "hsl(229, 70%, 50%)",
      "Bacterial Blight": 96,
      "Bacterial BlightColor": "hsl(296, 70%, 50%)",
      "Green Mite": 72,
      "Green MiteColor": "hsl(97, 70%, 50%)",
      "Brown Streak Disease": 140,
      "Brown Streak DiseaseColor": "hsl(340, 70%, 50%)",
      "Healthy": 120,
      "HealthyColor": "hsl(120, 70%, 50%)",
      "Unknown": 100,
      "UnknownColor": "hsl(0, 0%, 70%)",
    },
    {
      date: "03/16/2023",
      "Mosaic Disease": 137,
      "Mosaic DiseaseColor": "hsl(229, 70%, 50%)",
      "Bacterial Blight": 96,
      "Bacterial BlightColor": "hsl(296, 70%, 50%)",
      "Green Mite": 72,
      "Green MiteColor": "hsl(97, 70%, 50%)",
      "Brown Streak Disease": 140,
      "Brown Streak DiseaseColor": "hsl(340, 70%, 50%)",
      "Healthy": 120,
      "HealthyColor": "hsl(120, 70%, 50%)",
      "Unknown": 100,
      "UnknownColor": "hsl(0, 0%, 70%)",
    },
    {
      date: "03/17/2023",
      "Mosaic Disease": 137,
      "Mosaic DiseaseColor": "hsl(229, 70%, 50%)",
      "Bacterial Blight": 96,
      "Bacterial BlightColor": "hsl(296, 70%, 50%)",
      "Green Mite": 72,
      "Green MiteColor": "hsl(97, 70%, 50%)",
      "Brown Streak Disease": 140,
      "Brown Streak DiseaseColor": "hsl(340, 70%, 50%)",
      "Healthy": 120,
      "HealthyColor": "hsl(120, 70%, 50%)",
      "Unknown": 100,
      "UnknownColor": "hsl(0, 0%, 70%)",
    },
    {
      date: "03/18/2023",
      "Mosaic Disease": 137,
      "Mosaic DiseaseColor": "hsl(229, 70%, 50%)",
      "Bacterial Blight": 96,
      "Bacterial BlightColor": "hsl(296, 70%, 50%)",
      "Green Mite": 72,
      "Green MiteColor": "hsl(97, 70%, 50%)",
      "Brown Streak Disease": 140,
      "Brown Streak DiseaseColor": "hsl(340, 70%, 50%)",
      "Healthy": 120,
      "HealthyColor": "hsl(120, 70%, 50%)",
      "Unknown": 100,
      "UnknownColor": "hsl(0, 0%, 70%)",
    },
  ];
  */

  const labels = ["Mosaic Disease", "Bacterial Blight", "Green Mite", "Brown Streak Disease", "Healthy", "Unknown"];
  const dateDiseaseCounts = {};


  function formatDate(time_stamp) {
    const [dayOfWeek, day, month, year, time, timeZone] = time_stamp.split(/[-\s:]/);
    const months = {
      Jan: '01',
      Feb: '02',
      Mar: '03',
      Apr: '04',
      May: '05',
      Jun: '06',
      Jul: '07',
      Aug: '08',
      Sep: '09',
      Oct: '10',
      Nov: '11',
      Dec: '12',
    };

    return `${year}-${months[month]}-${day}`;
  }

  data.forEach(diseaseArray => {
    diseaseArray.forEach(diseaseInfo => {
      const date = formatDate(diseaseInfo.time_stamp);
      const disease = diseaseInfo.disease;

      if (!dateDiseaseCounts[date]) {
        dateDiseaseCounts[date] = {
          "Mosaic Disease": 0,
          "Bacterial Blight": 0,
          "Green Mite": 0,
          "Brown Streak Disease": 0,
          "Healthy": 0,
          "Unknown": 0
        };
      }

      dateDiseaseCounts[date][disease]++;
    });
  });

  console.log('dateDiseaseCounts', dateDiseaseCounts);

  function prepareBarChartData(dateDiseaseCounts) {
    const diseaseColors = {
      "Mosaic Disease": "hsl(229, 70%, 50%)",
      "Bacterial Blight": "hsl(296, 70%, 50%)",
      "Green Mite": "hsl(97, 70%, 50%)",
      "Brown Streak Disease": "hsl(340, 70%, 50%)",
      "Healthy": "hsl(120, 70%, 50%)",
      "Unknown": "hsl(0, 0%, 70%)",
    };

    const barChartData = [];

    for (const date in dateDiseaseCounts) {
      const dateData = { date };
      const diseaseCounts = dateDiseaseCounts[date];

      for (const disease in diseaseCounts) {
        const count = diseaseCounts[disease];
        const colorKey = `${disease}Color`;

        dateData[disease] = count;
        dateData[colorKey] = diseaseColors[disease];
      }

      barChartData.push(dateData);
    }

    return barChartData;
  }

  const barData = prepareBarChartData(dateDiseaseCounts);
  barData.sort((a, b) => new Date(a.date) - new Date(b.date));

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
      data={barData}
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
