import { ResponsiveLine } from "@nivo/line";
import { useTheme } from "@mui/material";
import { tokens } from "../theme";
import { mockLineData as data } from "../data/mockData";



const mockLineData = [
  {
    id: "",
    color: tokens("dark").redAccent[200],
    data: [
      {
        x: "plane",
        y: 191,
      },
      {
        x: "helicopter",
        y: 136,
      },
      {
        x: "boat",
        y: 91,
      },
      {
        x: "train",
        y: 190,
      },
      {
        x: "subway",
        y: 211,
      },
      {
        x: "bus",
        y: 152,
      },
      {
        x: "car",
        y: 189,
      },
      {
        x: "moto",
        y: 152,
      },
      {
        x: "bicycle",
        y: 8,
      },
      {
        x: "horse",
        y: 197,
      },
      {
        x: "skateboard",
        y: 107,
      },
      {
        x: "others",
        y: 170,
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
    const data = Object.entries(dataObj).map(([x, y]) => ({x: formatDate(x), y}));
  
    return {
      id,
      data
    };
  });
  console.log('formattedData1', formattedData1);


  const formattedData2 = Object.entries(formattedData1).map(([id, dataObj]) => {
    const data = Object.entries(dataObj).map(([x, y]) => ({x, y}));
    return {
      id,
      color: tokens("dark").redAccent[200],
      data
    };
  });
  
  console.log('formattedData2',formattedData2);





  return (
    <ResponsiveLine
      data={formattedData2}
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
        legend: isDashboard ? undefined : "Disease Count", // added
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

export default LineChart;
