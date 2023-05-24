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
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import SidebarBarChart from "../../scenes/bar/index";


const Garden = ({ setScans, setSelectedGarden }) => {

  // State variable to handle the animation and trigger it when the images are loading.
  const [animateEye, setAnimateEye] = useState(false);
  // State variable to check if the page is loading images from API
  const [isLoading, setIsLoading] = useState(false);
  // State variable to hold updated image URLs for the plant cards in the grid
  const [imageUrls, setImageUrls] = useState([]);
  // state variable to track if a garden is selected from the dropdown
  // check for non null item in selectedGarden from local storage
  const [isGardenSelected, setIsGardenSelected] = useState(localStorage.getItem('selectedGarden') !== null);
  // state variable to get list of garden names from api
  const [gardenFolders, setGardenFolders] = useState([]);
  // updates select garden button to selected garden from dropdown
  // show/hide chart state variable
  const [chartVisible, setChartVisible] = useState(false);
  // refreshKey state variable
  const [refreshKey, setRefreshKey] = useState(0);
  // state variable for show/hide dropdown in select garden button
  const [dropdownVisible, setDropdownVisible] = useState(false);

  // Add useState hooks for scans and selectedGarden
  const [scans, setLocalScans] = useState([]);
  const [selectedGarden, setLocalSelectedGarden] = useState(localStorage.getItem('selectedGarden') || "Select Garden");

  // const { subjectID } = useParams();
  // // check for last selected garden from localStorage 
  // const [selectedGarden, setSelectedGarden] = useState(localStorage.getItem('selectedGarden') || "Select Garden");
  // // get most recent drone scan data from api for every id in PlantDescriptions
  // const [scans, setScans] = useState([]);



  //Min
  const [subjectID, setSubjectID] = useState(null);
  const [showGardenButton, setShowGardenButton] = useState(true);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const [barData, setBarData] = useState(null);



  useEffect(() => {
    fetchScans().then((scanResults) => {
      setLocalScans(scanResults);
      setScans(scanResults);
    });
  }, []);

  useEffect(() => {
    // we could add more code here to be executed when the refreshKey state changes...
    // i.e. the 'Brand' component is clicked
    if (refreshKey > 0) {
      window.location.reload();
    }
  }, [refreshKey]);

  useEffect(() => {
    // first we populate the /public/gardens folder (probably not a good idea to have the client change the API like this?)
    fetchAndCreateGardenFolders();
    fetchGardenFolders();

    // load images if a garden was already selected before page reloads
    if (localStorage.getItem('selectedGarden')) {
      handleGardenSelection(localStorage.getItem('selectedGarden'));
    }
  }, []);

  useEffect(() => {
    if (selectedGarden !== "Select Garden") {
      const circle = document.querySelector("#garden-monitor circle animate");
      if (circle) {
        circle.beginElement();
      }
    }
  }, [selectedGarden]);

  const refreshPage = () => {
    setRefreshKey((prevKey) => prevKey + 1);// increments the previous value of refreshKey state before updating
    // ensures that we are working with the most up-to-date state value 
  };

  const fetchGardenFolders = async () => {
    try {
      const response = await fetch('http://localhost:9000/getGardenNames/folders');
      const folderNames = await response.json();
      console.log('Fetched garden folders:', folderNames)
      setGardenFolders(folderNames);
    }
    catch (error) {
      console.error("Error fetching garden folders:", error);
    }
  };

  const toggleChart = () => {
    setChartVisible(!chartVisible);
  };


  //API
  const fetchScans = async () => {
    const scanResults = [];

    for (const plant of PlantDescriptions) {
      const response = await fetch(`http://localhost:9000/getScans/plant/${plant.id}`);
      const data = await response.json();
      scanResults.push(data);
    }

    console.log('scan:', scanResults);
    return scanResults;
  };

  const handleGardenSelection = async (gardenName) => {
    setSelectedGarden(gardenName); // set selected garden name
    localStorage.setItem('selectedGarden', gardenName); // Save selected garden localStorage 
    setIsGardenSelected(true); // sets isGardenSelected state variable to true, can view barchart
    setDropdownVisible(false); // hide dropdown menu
    setShowGardenButton(false);
    setIsLoading(true);
    setAnimateEye(true);

    // Update the selectedGarden state in Garden.js and the parent state in App.js
    setLocalSelectedGarden(gardenName);
    setSelectedGarden(gardenName);


    try {
      // Call getImage route from the API using the selected 'gardenName'
      const response = await fetch(`http://localhost:9000/getImage/${gardenName}`); // Add "http://" to the URL
      const result = await response.json();
      console.log("API Result:", result);

      const barData2 = { data: scans, selectedGarden: selectedGarden }; // create barData object here
      setBarData(barData2);


      // Update the imageUrls state with the complete URLs for each image
      setImageUrls(result.filenames.map((filename) => `http://localhost:9000/images/${filename}`));
      console.log("Updated imageUrls:", imageUrls);
    } catch (error) {
      console.log("Error fetching images:", error);
    }
    setIsLoading(false);
    setAnimateEye(false);
  };

  // Call API to fetch S3 garden names (list all bucket names)
  const fetchAndCreateGardenFolders = async () => {
    try {
      await fetch('http://localhost:9000/getGardenNames');
    }
    catch (error) {
      console.error('Error fetching and creating garden folders:', error);
    }
  }

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const renderSvgCircle = () => {
    if (animateEye) {
      return (
        <circle
          cx="32"
          cy="32"
          r="5"
          fill="currentColor"
        >
          <animate
            attributeName="cx"
            values="16;48;32;16"
            dur="1s"
            repeatCount="indefinite"
          />
        </circle>
      );
    } else {
      return (
        <circle
          cx="32"
          cy="32"
          r="5"
          fill="currentColor"
        />
      );
    }
  };



  //Min
  // Add state variables for modal visibility and selected plant information
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPlant, setSelectedPlant] = useState(null);

  // Add a function to handle plant clicks
  const handlePlantClick = (plant) => {
    setSelectedPlant(plant);
    setModalOpen(true);
    setSubjectID(plant.id);
  };

  // Navigate to Sign
  const redirectToSign = () => {
    navigate("/");
  }


  const GardenButton = () => {
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
          <ul className="dropdown">
            {gardenFolders.map((gardenName, index) => (
              <li key={index} onClick={() => handleGardenSelection(gardenName)}>
                {gardenName}
              </li>
            ))}
          </ul>
        )}
      </>
    );
  };

  return (
    <Box m="15px" paddingBottom="150px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center" paddingLeft="50px">
        <Box sx={{ flexGrow: 1, marginRight: "20px" }}><Header title={<Box marginRight="40px"><GardenButton /></Box>} subtitle="&nbsp;&nbsp;&nbsp;Welcome to your garden 🌳" ></Header></Box>
      </Box>
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
                  color: theme.palette.primary.main,
                }}
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
              <BarChart isDashboard={true} data={scans} selectedGarden={selectedGarden} />
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
              ({ id, name, type, imageSrc, imageAlt, state, soil, minColdHard, leaves, sun, flowers, flowerColor, bloomSize, suitableLocations,
                propMethods, otherMethods, containers, link, scan }, index) => (


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
                  <Card
                    sx={{
                      width: '100%',
                      border: 2,
                      borderColor:
                        state === 'success'
                          ? '#4caf50'
                          : state === 'warning'
                            ? '#ffc107'
                            : '#f44336',
                      borderBottom: 0,
                      borderTopLeftRadius: '5px', // Add borderRadius here
                      borderTopRightRadius: '5px', // Add borderRadius here
                    }}
                    onClick={() =>
                      handlePlantClick(
                        {
                          id,
                          name,
                          type,
                          imageSrc,
                          imageAlt,
                          state,
                          soil,
                          minColdHard,
                          leaves,
                          sun,
                          flowers,
                          flowerColor,
                          bloomSize,
                          suitableLocations,
                          propMethods,
                          otherMethods,
                          containers,
                          link,
                          scan,
                        },
                        index
                      )
                    }
                  >
                    <CardMedia
                      component="img"
                      height="180px"
                      image={imageUrls[index] || `http://localhost:9000/images/${imageSrc}`} // Use imageUrls if available, otherwise use the original imageSrc
                      alt={imageAlt}
                    />
                  </Card>
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
                        handlePlantClick({
                          id, name, type, imageSrc, imageAlt, state, soil, minColdHard, leaves, sun, flowers, flowerColor, bloomSize, suitableLocations,
                          propMethods, otherMethods, containers, link, scan
                        }, index)
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
                {selectedPlant.name} Status
              </DialogTitle>
              {/* Pass the subject data as props to the Subject component */}
              <DialogContent>
                <Subject {...selectedPlant} />
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


