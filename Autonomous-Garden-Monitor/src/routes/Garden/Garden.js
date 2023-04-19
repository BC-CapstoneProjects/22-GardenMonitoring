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
  // state variable for show/hide dropdown in select garden button 
  const [dropdownVisible, setDropdownVisible] = useState(false);

  // updates select garden button to selected garden from dropdown
  const [selectedGarden, setSelectedGarden] = useState("Select Garden");

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

  const refreshPage = () => {
     setRefreshKey((prevKey) => prevKey + 1);// increments the previous value of refreshKey state before updating
     // ensures that we are working with the most up-to-date state value 
  };

  const toggleChart = () => {
    setChartVisible(!chartVisible);
  };

  const handleGardenSelection = (gardenName) => {
    setSelectedGarden(gardenName);
    setDropdownVisible(false);
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

  return (
    <main id="garden-monitor">

      <header>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
          <path fill="currentColor" d="M32,15C18,15,5,24,5,32s13,17,27,17s27-8,27-17S46,15,32,15z M32,45c-10,0-19-6-22-12
            c3-6,11-12,22-12s19,6,22,12C51,39,42,45,32,45z"/>
            <circle cx="32" cy="32" r="5" fill="currentColor">
              <animate attributeName="cx" values="16;48;32" dur="1s" begin="0s" repeatCount="1" fill="freeze" />
            </circle>
        </svg>
        <Brand alt="Autonomous Garden Monitoring" onClick={refreshPage}/>
        <Menu>
          <Link to="/settings">Settings</Link>
        </Menu>
      </header>
      <section className="content">
        <button className="name" onClick={(e) => toggleDropdown(e)}>{ selectedGarden }</button>
          { dropdownVisible && (
            <ul className="dropdown">
              <li onClick={() => handleGardenSelection("Garden 1")}>Garden 1</li>
              <li onClick={() => handleGardenSelection("Garden 2")}>Garden 2</li>
              <li onClick={() => handleGardenSelection("Garden 3")}>Garden 3</li>
            </ul>
          )}
        <div className="grid">
        <div className="chart-container">
          <button className="chart" onClick={toggleChart}>Toggle { selectedGarden } Chart</button>
            {chartVisible && <BarChart />}
        </div>
          {PlantDescriptions.map(({ id, state, name, imageSrc, imageAlt }) => (
            <Link
              key={id}
              to={`/view/${id}`}
              className="card group"
              data-state={state}
            >
              <Card
                title={name}
                src={imageSrc}
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