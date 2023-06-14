import { Box } from "@mui/material";
import Header from "../../components/Header";
import LineChart from "../../components/LineChart";

const Line = ({ data, selectedGarden}) => {
  
  if (!data) {
    return <p>Loading...Please reopen the page</p>;
  }

  return (
    <Box m="20px">
      <Header title={`${selectedGarden}🌱`}  subtitle={`Garden Disease Line Chart`} />
      <Box height="75vh">
        <LineChart chartData={data} />
      </Box>
    </Box>
  );
};

export default Line;
