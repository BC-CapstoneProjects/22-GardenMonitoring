import { ResponsiveLine } from "@nivo/line";
import { useTheme } from "@mui/material";
import { tokens } from "../theme";
import { mockLineData as data } from "../data/mockData";



const mockLineData1 = [
  {
    id: "Green Mite",
    color: tokens("dark").redAccent[200],
    data: [
      {
        x: "06/06/2023",
        y: 1,
      },
      {
        x: "06/09/2023",
        y: 1,
      },
    ],
  },
  {
    id: "Healthy",
    color: tokens("dark").greenAccent[500],
    data: [
      {
        x: "06/07/2023",
        y: 0.5,
      },
      {
        x: "06/08/2023",
        y: 1.3,
      },
      {
        x: "06/10/2023",
        y: 1,
      },
    ],
  },
];



const LineChart = ({ isCustomLineColors = false, id, lineData, isDashboard = false }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);


  //get the disease info of selected plant
  const plantLineData = lineData[id];

  //date sort function
  function sortObjectByKeys(obj) {
    if (obj) {
      let entries = Object.entries(obj);
      entries.sort((a, b) => {
        let timeA = Date.parse(a[0]);
        let timeB = Date.parse(b[0]);
        return timeA - timeB;
      });
      return Object.fromEntries(entries);
    } else {
      console.error('The input object is null or undefined!');
      return obj;
    }
  }

  //sort the disease's date using date-sort function:'sortObjectByKeys'
  for (let disease in plantLineData) {
    console.log('log the object', plantLineData[disease]); // log the object
    plantLineData[disease] = sortObjectByKeys(plantLineData[disease]);
  }

  function formatDate(dateStr) {
    const date = new Date(dateStr);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // January is 0!
    const year = date.getFullYear();

    return `${month}/${day}/${year}`;
  }

  const formattedData1 = Object.entries(plantLineData).map(([id, dataObj]) => {
    const data = Object.entries(dataObj).map(([x, y]) => ({ x: formatDate(x), y }));

    return {
      id,
      data
    };
  });
  console.log('formattedData1', formattedData1);


  // here you define your color values. Replace these with the actual colors you want.
  let diseaseColors = {
    'Green Mite': 'red',
    'Healthy': 'green',
    'Mosaic Disease': 'orange',
    'Bacterial Blight': 'purple',
    'Brown Streak Disease': 'pink',
    'Unknown': 'black',
  };

  let newData = formattedData1.map(item => {
    return {
      id: item.id,
      color: diseaseColors[item.id],
      data: item.data
    };
  });

  console.log('newData', newData);


  // First, get a set of all unique 'x' values
  let allXValues = new Set();
  for (let item of newData) {
    for (let data of item.data) {
      allXValues.add(data.x);
    }
  }

  // Then, for each item in newData, check if it has all 'x' values
  for (let item of newData) {
    let currentXValues = new Set(item.data.map(data => data.x));
    // let firstMissing = true;   // flag to check if it's the first missing entry

    for (let xValue of allXValues) {
      // If the current item doesn't have this 'x' value, add it with 'y' set to 0
      if (!currentXValues.has(xValue)) {
        item.data.push({ x: xValue, y: 0 });
      }
    }

    // Optional: Sort the data array by 'x' value
    item.data.sort((a, b) => a.x.localeCompare(b.x));
  }

  console.log('newData2', newData);







  // const formattedData2 = Object.entries(formattedData1).map(([id, dataObj]) => {
  //   const data = Object.entries(dataObj).map(([x, y]) => ({x, y}));
  //   return {
  //     id,
  //     color: tokens("dark").redAccent[200],
  //     data
  //   };
  // });

  // console.log('formattedData2',formattedData2);





  return (
    <ResponsiveLine
      data={newData}
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
        stacked: true,
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
