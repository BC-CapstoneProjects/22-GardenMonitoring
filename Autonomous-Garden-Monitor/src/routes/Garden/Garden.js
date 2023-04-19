import { Link, useParams, useNavigate } from "react-router-dom";

import Brand from "../../components/Brand";

import Menu from "../../components/Menu";

import Card from "../../components/Card";

import Subject from "../Subject";

import "./Garden.css";

import PlantDescriptions from "../../components/Plants/PlantDescriptions";

import BarChart from "../../components/Charts/BarChart";

import { useState, useEffect } from "react";


function Garden() {
  // State variable to handle the animation and trigger it when the images are loading.
  const [animateEye, setAnimateEye] = useState(false);

  // State variable to check if the page is loading images from API
  const [isLoading, setIsLoading] = useState(false);

  // State variable to hold updated image URLs for the plant cards in the grid
  const [imageUrls, setImageUrls] = useState([]);

  // state variable for show/hide dropdown in select garden button 
  const [dropdownVisible, setDropdownVisible] = useState(false);

  // state variable to track if a garden is selected from the dropdown
  // check for non null item in selectedGarden from local storage
  const [isGardenSelected, setIsGardenSelected] = useState(localStorage.getItem('selectedGarden') !== null);

  // state variable to get list of garden names from api
  const [gardenFolders, setGardenFolders] = useState([]);

  // updates select garden button to selected garden from dropdown
  // check for last selected garden from localStorage 
  const [selectedGarden, setSelectedGarden] = useState(localStorage.getItem('selectedGarden') || "Select Garden");

  // show/hide chart state variable
  const [chartVisible, setChartVisible] = useState(false);

  // refreshKey state variable
  const [refreshKey, setRefreshKey] = useState(0);

  const { subjectID } = useParams();
  console.log("ID", subjectID);

  // get most recent drone scan data from api for every id in PlantDescriptions
  const [scans, setScans] = useState([]);

  const fetchScans = async () => {
    const scanResults = [];

    for (const plant of PlantDescriptions) {
      const response = await fetch(`http://localhost:9000/getScans/plant/${plant.id}`);
      const data = await response.json();
      scanResults.push(data);
    }

    return scanResults;
  };

  useEffect(() => {
    fetchScans().then((scanResults) => {
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
      setGardenFolders(folderNames);
    }
    catch (error) {
      console.error("Error fetching garden folders:", error);
    }
  };

  

  const toggleChart = () => {
    setChartVisible(!chartVisible);
  };

  // handles garden selection from the dropdown menu
  const handleGardenSelection = async (gardenName) => {
    setSelectedGarden(gardenName); // set selected garden name
    localStorage.setItem('selectedGarden', gardenName); // Save selected garden localStorage 
    setIsGardenSelected(true); // sets isGardenSelected state variable to true, can view barchart
    setDropdownVisible(false); // hide dropdown menu
  
    setIsLoading(true);
    setAnimateEye(true);

    try {
      // Call getImage route from the API using the selected 'gardenName'
      const response = await fetch(`http://localhost:9000/getImage/${gardenName}`); // Add "http://" to the URL
      const result = await response.json();
      console.log("API Result:", result);
  
      // Update the imageUrls state with the complete URLs for each image
      setImageUrls(result.filenames.map((filename) => `http://localhost:9000/images/${filename}`));
      console.log("Updated imageUrls:", imageUrls);
    } catch (error) {
      console.log("Error fetching images:", error);
    }
    setIsLoading(false);
    setAnimateEye(false);
  };
  
  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  // const onChangeHandler = () => {
  //   console.log("test");
  //   <Link to={`/`} />
  // };

  const navigate = useNavigate();
  const onModalStateChange = () => {
    console.log("test");
    navigate("/garden");
  };

    const subject = PlantDescriptions.find((value) => {
    console.log("Filter Comparison:", (subjectID === value.id.toString()), subjectID, value.id.toString());
    return (subjectID === value.id.toString())
  });

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
  
  return (
    <main id="garden-monitor">

      <header>
      
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
        <path fill="currentColor" d="M32,15C18,15,5,24,5,32s13,17,27,17s27-8,27-17S46,15,32,15z M32,45c-10,0-19-6-22-12
        c3-6,11-12,22-12s19,6,22,12C51,39,42,45,32,45z"/>
        {renderSvgCircle(isLoading)}
      </svg>

        <Brand alt="Autonomous Garden Monitoring" onClick={refreshPage}/>
        <Menu>
          <Link to="/settings">Settings</Link>
        </Menu>
      </header>
      <section className="content">
      <button className="name" onClick={(e) => toggleDropdown(e)}>{selectedGarden}</button>

          { dropdownVisible && (
            <ul className="dropdown">
            { gardenFolders.map((gardenName, index) => (
              <li key={index} onClick={() => handleGardenSelection(gardenName)}>
                { gardenName }
              </li>
            ))}
            </ul>
          )}
        <div className="grid">
        <div className="chart-container">
          <button className="chart" onClick={toggleChart} disabled={!isGardenSelected}>Toggle Chart</button>
          {chartVisible && <BarChart data={ scans } selectedGarden={selectedGarden} />}
        </div>
        {PlantDescriptions.map(({ id, state, name, imageSrc, imageAlt }, index) => (
          <Link
            key={id}
            to={`/view/${id}`}
            className="card group"
            data-state={state}
          >
            <Card
              title={name}
              src={imageUrls[index] || `http://localhost:9000/images/${imageSrc}`} // Use imageUrls if available, otherwise use the original imageSrc
              alt={imageAlt}
            />


        
          </Link>
        ))}

        </div>
      </section>
      <input type="checkbox" id="my-modal-5" checked={!!subjectID} onChange={onModalStateChange} className="modal-toggle" />
      <div className="modal bg-slate-900/30">
        <div className="modal-box w-11/12 max-w-5xl bg-primary-focus-300">
        <label htmlFor="my-modal-5" className="btn btn-sm btn-circle absolute right-2 top-2 bg-secondary text-white">✕</label>
          
          <Subject {...subject} />
          
        </div>
      </div>
      
    </main>
  );
}

export default Garden;