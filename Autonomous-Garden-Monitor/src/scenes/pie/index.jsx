import { Box } from "@mui/material";
import Header from "../../components/Header";
import PieChart from "../../components/PieChart";

const Pie = ({ data, selectedGarden}) => {

  console.log('data',data);
  
  if (!data) {
    return <p>Loading...Please reopen the page</p>;
  }

  return (
    <Box m="20px">
      <Header title={`${selectedGarden}🌱`} subtitle="Garden Disease Pie Chart" />
      <Box height="75vh">
        <PieChart 
          pieData={data} />
      </Box>
    </Box>
  );
};

export default Pie;
