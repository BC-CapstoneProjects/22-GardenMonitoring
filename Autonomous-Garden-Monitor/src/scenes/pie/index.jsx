import { Box } from "@mui/material";
import Header from "../../components/Header";
import PieChart from "../../components/PieChart";

const Pie = ({ data, selectedGarden}) => {

  console.log('data',data);
  
  if (!data) {
    return <p>Select Garden...</p>;
  }

  // return (
  //   <Box m="20px">
  //     <Header title="Bar Chart" subtitle="Weekly report" />
  //     <Box height="75vh">
  //       <BarChart
  //         isDashboard={true}
  //         data={data}
  //         selectedGarden={selectedGarden}
  //       />
  //     </Box>
  //   </Box>
  // );


  return (
    <Box m="20px">
      <Header title="Pie Chart" subtitle="Simple Pie Chart" />
      <Box height="75vh">
        <PieChart 
          pieData={data}
          selectedGarden={selectedGarden} />
      </Box>
    </Box>
  );
};

export default Pie;
