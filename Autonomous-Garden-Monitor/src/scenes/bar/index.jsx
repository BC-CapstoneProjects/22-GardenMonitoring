import { Box } from "@mui/material";
import Header from "../../components/Header";
import BarChart from "../../components/BarChart";

const Bar = ({ data, selectedGarden}) => {

  console.log('data',data);
  
  if (!data) {
    return <p>Select Garden...</p>;
  }

  return (
    <Box m="20px">
      <Header title="Bar Chart" subtitle="Weekly report" />
      <Box height="75vh">
        <BarChart
          isDashboard={true}
          data={data}
          selectedGarden={selectedGarden}
        />
      </Box>
    </Box>
  );
};

export default Bar;
