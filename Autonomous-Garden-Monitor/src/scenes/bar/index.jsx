import { Box } from "@mui/material";
import Header from "../../components/Header";
import BarChart from "../../components/BarChart";

const Bar = ({ data, selectedGarden }) => {

  console.log('data',data);
  
  if (!data) {
    return <p></p>;
  }

  return (
    <Box m="20px">
      <Header title={`${selectedGarden}🌱`} subtitle={`Weekly report`} />
      <Box height="75vh">
        <BarChart
          isDashboard={true}
          data={data}
        />
      </Box>
    </Box>
  );
};

export default Bar;
