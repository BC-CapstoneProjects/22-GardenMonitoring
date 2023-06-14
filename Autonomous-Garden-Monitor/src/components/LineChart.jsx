import { ResponsiveLine } from "@nivo/line";
import { useTheme } from "@mui/material";
import { tokens } from "../theme";
import { mockLineData as data } from "../data/mockData";

const LineChart = ({ isCustomLineColors = false, chartData, isDashboard = true }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  if (chartData === null) {
    return <p>loading...</p>;
  } else {

  //get the disease info of selected plant
  const plantLineData = chartData;

  //   //sort date
  //   plantLineData.sort((a, b) => {
  //     var dateA = new Date(a.date), dateB = new Date(b.date);
  //     return dateA - dateB;
  // });

  console.log('linedata import', plantLineData);


  // Here's an example of how you can map diseases to colors
  let diseaseColorMap = {
    'Green Mite': 'red',
    'Healthy': 'green',
    'Mosaic Disease': 'orange',
    'Bacterial Blight': 'purple',
    'Brown Streak Disease': 'pink',
    'Unknown': 'black',
  };


// A set to collect all unique dates
let uniqueDates = new Set();

// A map to collect the disease data
let diseaseData = {};

// Populate the set with unique dates and the map with disease data
for (let array of Object.values(plantLineData)) {
  for (let entry of array) {
    uniqueDates.add(entry.date);
    for (let [disease, value] of Object.entries(entry.data)) {
      if (!diseaseData[disease]) {
        diseaseData[disease] = {};
      }
      diseaseData[disease][entry.date] = value;
    }
  }
}

// Convert the set to an array and sort the dates
uniqueDates = Array.from(uniqueDates).sort();

// Convert the map to the required output format, adding missing dates
let output = Object.entries(diseaseData).map(([disease, data]) => {
  return {
    id: disease,
    color: diseaseColorMap[disease],
    data: uniqueDates.map(date => {
      return { x: date, y: data[date] || '0' };
    })
  }
});



//   const output = []

// for (let array of Object.values(plantLineData)) {
//   for (let entry of array) {
//     for (let [disease, value] of Object.entries(entry.data)) {
//       let existingEntry = output.find(e => e.id === disease)
//       if (existingEntry) {
//         existingEntry.data.push({ x: entry.date, y: value })
//       } else {
//         output.push({
//           id: disease,
//           color: diseaseColorMap[disease],
//           data: [
//             { x: entry.date, y: value }
//           ]
//         })
//       }
//     }
//   }
// }

console.log('output',output)

  return (
    <ResponsiveLine
      data={output}
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
        min: "0",
        max: "1",
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
        legend: isDashboard ? undefined : "Date of Analysis", // added
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
      pointColor={{ theme: "background" }}
      pointBorderWidth={2}
      pointBorderColor={{ from: "serieColor" }}
      pointLabelYOffset={-12}
      useMesh={true}
      legends={[
        {
          anchor: "bottom-right",
          direction: "column",
          justify: false,
          translateX: 100,
          translateY: 0,
          itemsSpacing: 0,
          itemDirection: "left-to-right",
          itemWidth: 80,
          itemHeight: 20,
          itemOpacity: 0.75,
          symbolSize: 12,
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
};

export default LineChart;