import { Box, Button, IconButton, Typography, useTheme, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import BarChart from "../../components/BarChart";
import StatBox from "../../components/StatBox";
import PlantDescriptions from "../../components/Plants/PlantDescriptions";
import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import Subject from "../../routes/Subject/Subject";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import EmailIcon from "@mui/icons-material/Email";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import ProgressCircle from "../../components/ProgressCircle";
import LineChart from "../../components/LineChart";
import GeographyChart from "../../components/GeographyChart";

const Garden = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [dropdownVisible, setDropdownVisible] = useState(false); // state variable for show/hide dropdown in select garden button
  const [selectedGarden, setSelectedGarden] = useState("Select Garden"); // updates select garden button to selected garden from dropdown
  const [chartVisible, setChartVisible] = useState(false); // show/hide chart state variable
  const [refreshKey, setRefreshKey] = useState(0); // refreshKey state variable
  const [subjectID, setSubjectID] = useState(null);


  
  // Add state variables for modal visibility and selected plant information
  const [modalOpen, setModalOpen] = useState(false); 
  const [selectedPlant, setSelectedPlant] = useState(null);

  //min
  const [showTitleButton, setShowTitleButton] = useState(true);
  

  const toggleChart = () => {
    setChartVisible(!chartVisible);
  };
  const handleGardenSelection = (gardenName) => {
    setSelectedGarden(gardenName);
    setDropdownVisible(false);
    setShowTitleButton(false);
  };
  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  
  console.log("PlantDescriptions:", PlantDescriptions);


  // Add a function to handle plant clicks
  const handlePlantClick = (plant) => {
    setSelectedPlant(plant);
    setModalOpen(true);
    setSubjectID(plant.id);
  };

  console.log("subjectID:", subjectID);


  const TitleButton = () => {
    return (
      <>
        <Button
          sx={{
            fontSize: "23px",
            fontWeight: "bold",
            padding: "15px 30px",
          }}
          onClick={(e) => toggleDropdown(e)}
        >
          {selectedGarden}
        </Button>
        {dropdownVisible && (
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            position="absolute"
            zIndex="10"
            bgcolor={theme.palette.background.paper}
          >
            {selectedGarden !== "Garden 1 🌱" && (
              <Button
                sx={{
                  fontSize: "20px",
                  fontWeight: "bold",
                  padding: "15px 30px",
                }}
                onClick={() => handleGardenSelection("Garden 1 🌱")}
              >
                Garden 1
              </Button>
            )}
            {selectedGarden !== "Garden 2 🌱" && (
              <Button
                sx={{
                  fontSize: "20px",
                  fontWeight: "bold",
                  padding: "15px 30px",
                }}
                onClick={() => handleGardenSelection("Garden 2 🌱")}
              >
                Garden 2
              </Button>
            )}
            {selectedGarden !== "Garden 3 🌱" && (
              <Button
                sx={{
                  fontSize: "20px",
                  fontWeight: "bold",
                  padding: "15px 30px",
                }}
                onClick={() => handleGardenSelection("Garden 3 🌱")}
              >
                Garden 3
              </Button>
            )}
          </Box>
        )}
      </>
    );
  };

  /*
  useEffect(() => { // could add more code here to be executed when the refreshKey state changes  
    if (refreshKey > 0) {
      window.location.reload();
    }
  }, [refreshKey]);

  const refreshPage = () => {
    setRefreshKey((prevKey) => prevKey + 1); // increments the previous value of refreshKey state before updating
    // ensures that we are working with the most up-to-date state value
  };

  const navigate = useNavigate();
  const onModalStateChange = () => {
    console.log("test");
    navigate("/garden");
  };
  */
  

  

  return (
    <Box m="15px" paddingBottom="150px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center" paddingLeft="50px">
        <Box sx={{ flexGrow: 1, marginRight: "20px" }}><Header title={<Box marginRight="40px"><TitleButton /></Box>}  subtitle="&nbsp;&nbsp;&nbsp;Welcome to your garden 🌳" /></Box>
    
        {/* <Box>
          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
            <DownloadOutlinedIcon sx={{ mr: "10px" }} />
            Download Reports
          </Button>
        </Box>
        */}

    {/* <Box
      display="flex"
      justifyContent="flex-end"
      alignItems="center"
      width="95%"
      m={2}
      className="chart-container"
    > */}
      
    {/* </Box> */}
      </Box> 

      <Box   
      sx={{
        width: '85%', // Reduce the width of each container to 80%
        marginLeft: 'auto', // Add marginLeft only to the first box
        marginRight: 'auto',        
      }}>
      <Box display="flex" justifyContent="flex-end" marginBottom="20px" >
      
      {selectedGarden !== "Select Garden" && (
        <Button 
          sx={{
            fontWeight: "bold",
            borderStyle: "groove",
            borderWidth: "3px",
            borderColor: "colors.grey[300]"//"#4caf50",
          }}
          onClick={toggleChart}
        >
          <Typography 
            sx={{
            fontSize: "15px",
            fontWeight: "bold",
            color: theme.palette.primary.main,}}
          >
            Weekly Report
          </Typography>
        </Button>
      )}
      </Box>
      
      {chartVisible && 
      <Box
      gridColumn="span 4"
      gridRow="span 2"
      backgroundColor={colors.primary[400]}
      >
        <Typography
              variant="h5"
              fontWeight="600"
              sx={{ padding: "30px 30px 0 30px" }}
            >
              {selectedGarden !== "Select Garden" && (`${selectedGarden} Bar Chart`)}
              {/* {selectedGarden} Weekly Report */}
        </Typography>
        <Box height="250px" mt="-20px">
              <BarChart isDashboard={true} />
        </Box>
      </Box>
      }
      

      {/* GRID & CHARTS */}
      <Box>
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="auto"
        gap="40px"
      >
        
        {/* Box Test */}
{PlantDescriptions.map(
  ({ id, disease, state, name, imageSrc, imageAlt }) => (
    <Box
      gridColumn="span 3"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      sx={{
        width: '100%', // Reduce the width of each container to 80%
        marginLeft: 'auto', // Add marginLeft and marginRight to create space between the containers
        marginRight: 'auto',        
      }}
    >
      <Box
      border={2}
      borderColor={
        state === 'success'
          ? '#4caf50'
          : state === 'warning'
          ? '#ffc107'
          : '#f44336'
      }
        sx={{
          width: '100%',
          height: '180px', // Set the height for the image container
          backgroundImage: `url(${imageSrc})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          borderBottom: 0,
          borderTopLeftRadius: '5px', // Add borderRadius here
          borderTopRightRadius: '5px', // Add borderRadius here
        }}
        onClick={() =>
          handlePlantClick({ id, disease, state, name, imageSrc, imageAlt })
        }
      />
      <Box
        backgroundColor={colors.primary[400]}
        display="flex"
        alignItems="center"
        justifyContent="center"
        border={3}
        borderColor={
          state === 'success'
            ? '#4caf50'
            : state === 'warning'
            ? '#ffc107'
            : '#f44336'
        }
        sx={{
          position: 'relative',
          width: '100%', // Set the width of each StatBox container
          height: '90px', // Set the height of each StatBox container
          borderBottomLeftRadius: '5px', // Add borderRadius here
          borderBottomRightRadius: '5px', // Add borderRadius here
        }}
      >
        <StatBox
          className="card group"
          data-state={state}
          title={name}
          subtitle={state}
          state={state}
          increase={new Date().toLocaleDateString('en-US')}
          onClick={() =>
            handlePlantClick({ id, disease, state, name, imageSrc, imageAlt })
          }
        />
      </Box>
    </Box>
))}
</Box>
</Box>
        <Dialog
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          fullWidth
          maxWidth="md"
          aria-labelledby="plant-dialog-title"
        >
          {selectedPlant && (
            <>
              <DialogTitle id="plant-dialog-title">
                {selectedPlant.name}
              </DialogTitle>
              <DialogContent
                sx={{
                  width: "100%",
                  maxWidth: "800px",
                }}
              >
                {/* Pass the subject data as props to the Subject component */}
                <Subject {...selectedPlant.id} />
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setModalOpen(false)}>Close</Button>
              </DialogActions>
            </>
          )}
        </Dialog>



      </Box>
    </Box>
  );
};

export default Garden;


