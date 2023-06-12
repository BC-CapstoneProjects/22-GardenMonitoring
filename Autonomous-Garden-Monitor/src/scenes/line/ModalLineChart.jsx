import { Box } from "@mui/material";
import Header from "../../components/Header";
import LineChart from "../../components/ModalLineChart";

const Line = ({id, lineData}) => {
  return (
    <Box m="20px">
      <Header title="Line Chart" subtitle="Simple Line Chart" />
      <Box height="40vh">
        <LineChart id={id} lineData={lineData} />
      </Box>
    </Box>
  );
};

export default Line;
