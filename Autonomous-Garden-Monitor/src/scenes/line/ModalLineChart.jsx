import { Box } from "@mui/material";
import Header from "../../components/Header";
import LineChart from "../../components/ModalLineChart";

const Line = ({id, chartData}) => {

  if (!chartData) {
    return <p></p>;
  }

  return (
    
    <Box m="20px">
      <Header title="Line Chart"  subtitle={`Plant ${id} Diesease Chart `} />
      <Box height="40vh">
        <LineChart id={id} chartData={chartData} />
      </Box>
    </Box>
  );
};

export default Line;
