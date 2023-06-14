import { ResponsiveLine } from "@nivo/line";
import { useTheme } from "@mui/material";
import { tokens } from "../theme";
import { mockLineData as data } from "../data/mockData";




const LineChart = ({ isCustomLineColors = false, id, chartData, isDashboard = false }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);


  //get the disease info of selected plant
  const plantLineData = chartData[id];
  
  //sort date
  plantLineData.sort((a, b) => {
    var dateA = new Date(a.date), dateB = new Date(b.date);
    return dateA - dateB;
});

console.log('linedata import',plantLineData);


  // here you define your color values. Replace these with the actual colors you want.
  let diseaseColors = {
    'Green Mite': 'red',
    'Healthy': 'green',
    'Mosaic Disease': 'orange',
    'Bacterial Blight': 'purple',
    'Brown Streak Disease': 'pink',
    'Unknown': 'black',
  };

  
  
// First, convert to a intermediate data structure where you can easily manipulate data
let intermediateData = plantLineData.map(({ date, data }) => {
  let key = Object.keys(data)[0];
  let value = parseFloat(data[key]);
  return {
    id: key,
    data: { x: date, y: value }
  };
});

// Now, reduce it to the desired format
let transformedData = intermediateData.reduce((acc, { id, data }) => {
  let foundIndex = acc.findIndex(item => item.id === id);
  
  if (foundIndex >= 0) {
    acc[foundIndex].data.push(data);
  } else {
    acc.push({
      id: id,
      color: id === "Healthy" ? "green" : "purple",
      data: [data]
    });
  }

  return acc;
}, []);

console.log('transformedData', transformedData);


  
// const mockLineData1 = [
//   {
//     id: "Green Mite",
//     color: tokens("dark").redAccent[200],
//     data: [
//       {
//         x: "06/06/2023",
//         y: 1,
//       },
//       {
//         x: "06/09/2023",
//         y: 1,
//       },
//     ],
//   },
//   {
//     id: "Healthy",
//     color: tokens("dark").greenAccent[500],
//     data: [
//       {
//         x: "06/07/2023",
//         y: 0.5,
//       },
//       {
//         x: "06/08/2023",
//         y: 1.3,
//       },
//       {
//         x: "06/10/2023",
//         y: 1,
//       },
//     ],
//   },
// ];

  return (
    <ResponsiveLine
      data={transformedData}
      theme={{
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
              strokeWidth: 3,
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
        tooltip: {
          container: {
            color: colors.primary[500],
          },
        },
      }}
      colors={isDashboard ? { datum: "color" } : { scheme: "nivo" }} // added
      margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
      xScale={{ type: "point" }}
      yScale={{
        type: "linear",
        min: "auto",
        max: "auto",
        stacked: false,
        reverse: false,
      }}
      yFormat=" >-.2f"
      curve="catmullRom"
      axisTop={null}
      axisRight={null}
      axisBottom={{
        orient: "bottom",
        tickSize: 0,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard ? undefined : "Date", // added
        legendOffset: 36,
        legendPosition: "middle",
      }}
      axisLeft={{
        orient: "left",
        tickValues: 5, // added
        tickSize: 3,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard ? undefined : "Probability of disease in %", // added
        legendOffset: -40,
        legendPosition: "middle",
      }}
      enableGridX={false}
      enableGridY={false}
      pointSize={8}
      pointColor={{ from: "serieColor" }}
      pointBorderWidth={2}
      pointBorderColor={{ from: "serieColor" }}
      pointLabelYOffset={-12}
      useMesh={true}
      legends={[
        {
          anchor: "top-right",
          direction: "column",
          justify: true,
          translateX: 100,
          translateY: 0,
          itemsSpacing: 0,
          itemDirection: "left-to-right",
          itemWidth: 90,
          itemHeight: 20,
          itemOpacity: 0.75,
          symbolSize: 10,
          symbolShape: "circle",
          symbolBorderColor: "rgba(0, 0, 0, .5)",
          effects: [
            {
              on: "hover",
              style: {
                itemBackground: "rgba(0, 0, 0, .03)",
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
    />
  );
};

export default LineChart;
