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
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [selectedGarden, setSelectedGarden] = useState("Garden");

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
        <Brand alt="Autonomous Garden Monitoring" />
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
        <div className="modal-box w-11/12 max-w-5xl bg-green-300">
        <label htmlFor="my-modal-5" className="btn btn-sm btn-circle absolute right-2 top-2 bg-secondary text-white">✕</label>
          
          <Subject {...subject} />
          
        </div>
      </div>
      <BarChart />
    </main>
  );
}

export default Garden;