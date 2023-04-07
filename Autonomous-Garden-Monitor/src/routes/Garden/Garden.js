// import { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

import Brand from "../../components/Brand";

import Menu from "../../components/Menu";

import Card from "../../components/Card";

import Subject from "../Subject";

import "./Garden.css";

import PlantDescriptions from "../../components/Plants/PlantDescriptions";

import BarChart from "../../components/Charts/BarChart";

import { useState } from "react";


function Garden() {
  // state variable for show/hide dropdown in select garden button 
  const [dropdownVisible, setDropdownVisible] = useState(false);

  // updates select garden button to selected garden from dropdown
  const [selectedGarden, setSelectedGarden] = useState("Select Garden");

  // show/hide chart state variable
  const [chartVisible, setChartVisible] = useState(false);

  // state variable to refresh garden page
  const navigate = useNavigate();

  const refreshPage = () => {
    navigate('/garden', { replace: true, state: { refresh: true } }); // navigates to current route thus refreshing the page
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

  const { subjectID } = useParams();
  console.log("ID", subjectID);

  const onChangeHandler = () => {
    console.log("test");
    <Link to={`/`} />
  };

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
              {/* <animate attributeName="r" from="3" to="7" dur="1s" begin="0s" repeatCount="indefinite" /> */}
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