import { Box } from "@mui/material";
import Header from "../../components/Header";
import LineChart from "../../components/LineChart";

const Line = ({ plantName }) => {
  return (
    <Box m="20px">
      <Header subtitle={`${plantName ?? "Plant"} Line Chart`} />
      <Box height="25vh">
        <LineChart />
      </Box>
    </Box>
  );
};

export default Line;
