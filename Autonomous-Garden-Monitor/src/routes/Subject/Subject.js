import "./Subject.css";
import ModalLineChart from "../../scenes/line/ModalLineChart";
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import AWS from "aws-sdk";
import { SelectField } from '@aws-amplify/ui-react';
import { plantTypes } from "../../components/Plants/PlantTypes";
import { plants as PlantDescriptions, updatePlantHealth, updatePlantState } from "../../components/Plants/PlantDescriptions";
import { Auth } from 'aws-amplify';
import { useEffect, useState } from "react";
import React, { useRef } from 'react';

function Subject({ id, disease, name, imageSrc, imageUrl, imageAlt, type, sun, 
  water, soil, minColdHard, leaves, flowers, flowerColor, bloomSize, flowerTime, suitableLocations,
  propMethods, otherMethods, containers, link, imageUrls, index, chartData, selectedGarden } ) {

  // initialize ref to null, later this will point to a file input DOM element
  const hiddenFileInput = React.useRef(null);

  // handles the click event of the 'upload new image' MUI button
  const handleClick = event => {
    // this "clicks" the file input programatically when the MUI button is clicked
    // brings up the file explorer
    hiddenFileInput.current.click();
  };

  // this function is called when a file is selected 
  const handleUpload = async event => {
    console.log(`Uploading new plant image for ${name}`);
    const fileUploaded = event.target.files[0];
    
    if (!fileUploaded.type.startsWith('image/')) {
      console.error(`File is not an image: ${fileUploaded.type}`);
      return;
    }
    
    try {
      const user = await Auth.currentAuthenticatedUser();
  
      // Define the desired file name
      const desiredFileName = `${name}.jpg`;
  
      // Fetch the presigned URL
      const response = await fetch(`http://localhost:9000/putImage/${user.username}/${selectedGarden}/${desiredFileName}`, {
        method: 'PUT',
        headers: {
          'Content-Type': fileUploaded.type,
        },
      }); 
  
      if (!response.ok) {
        throw new Error(`Failed to get presigned URL with status ${response.status}`);
      }
  
      const { presignedUrls } = await response.json();
  
      // Upload the file to S3 using the presigned URL
      const uploadResponse = await fetch(presignedUrls, {
        method: 'PUT',
        body: fileUploaded,
        headers: {
          'Content-Type': fileUploaded.type,
        },
      });
  
      if (!uploadResponse.ok) {
        throw new Error(`Upload failed with status ${uploadResponse.status}`);
      }
  
      console.log(`Uploaded new plant image for ${name}`);
    }
    catch (error) {
      console.log(`Could not upload image for ${name}: ${error}`);
    }
  };
  

  console.log('imageUrls',imageUrls, index)
  console.log('indexcheck', index)

  console.log('chartData in Subject', chartData)
  

  const [diseaseData, setDiseaseData] = useState(null);

  useEffect(() => {
    // Set disease data directly from props
    setDiseaseData({
      diseased: disease !== 'Healthy' && disease !== 'N/A',
      label: disease,
    });
  }, [id, disease]);

  console.log("Disease Data: ", id, diseaseData);
  const [plantType, setPlantType] = useState(type);
  const plantTypeRecord = plantTypes.find(plantTypeEntry=> plantTypeEntry.id == plantType);

  return (
    <div id="subject-page" data-key="subject" className="grid grid-cols-2">
    <header className="modal-header rounded">
      <div style={{ textAlign: "center", color: "black", fontSize: "120%", width: "50%"}}>
        <Typography variant="h5" component="span" className="underline" sx={{ fontWeight: "bold" }}>Plant Name: </Typography>
        <Typography variant="h5" component="span" >{name ?? "name not found "}</Typography>
        <br />
        <Typography variant="h5" component="span" className="underline" sx={{ fontWeight: "bold" }} >Genus: </Typography>
    
        <SelectField value={plantType} onChange={(e) => setPlantType(e.target.value)}>       
        {
          plantTypes.map( ({id, type}) => 
          <option key={id} value={id} >{type}</option> )
        }
        </SelectField>
 
        {diseaseData && treatmentPlan(diseaseData.label)}
      </div>
      <div style={{ textAlign: "center", color: "black", fontSize: "120%", width: "50%" }}></div>
      {diseaseData ? (
      <div style={{ width: "50%", textAlign: "center", color: "black", fontSize: "120%" }}>
        <Typography variant="h5" component="span" sx={{ fontWeight: "bold" }}>
        Diseased: </Typography> {diseaseData.diseased.toString()}  
        <br /> 
        <Typography variant="h5" sx={{ fontWeight: "bold" }}>Label: </Typography>{diseaseData.label}  
      </div>
      ) : (
      <div style={{ width: "50%", textAlign: "center", color: "black", fontSize: "120%" }}>
        <Typography variant="h5" sx={{ fontWeight: "bold" }}>Loading ...</Typography>
      </div>
  )}
  </header>
      <div className="modal-body rounded">
      <img
          src={imageUrl}
          alt={imageAlt}
          className="subject-image border-8 border-sky-500 hover:border-double rounded"
      />
      <div>
      <Button 
          variant="contained" 
          endIcon={<CloudUploadIcon />}
          onClick={handleClick}>
          Upload new image
      </Button>
      {/* This is the hidden file input. It's setup to call handleUploadClick when a file is selected. 
      The ref created by useRef() is attached to it, and it's hidden using inline CSS. */}
      <input
          type="file"
          ref={hiddenFileInput}
          onChange={handleUpload}
          style={{display: 'none'}} 
      />
      </div>
        <p className="border-primary rounded">
        <ModalLineChart id={id} chartData={chartData} />
        </p>
      </div>
      <div >
      <h2 className="w-1/2 py-1/2 px-1/2 text-center text-2xl font-semibold bg-primary rounded">
        Tips and Tricks
      </h2>
      <section className="table table-fixed">
        <div className="text-black text-center">{"For more information about your "}{name}{" click here: "} <a href={ plantTypeRecord.link } target="_blank" className="hover:underline text-blue-500" rel="noreferrer">garden.org</a></div>      
        <table className="modal-bodyborder-collapse 
          border-separate border-spacing-2 border-slate-500 bg-slate-900/20 rounded">
        <tbody>
          <tr>  
            <td className="border-2 border-slate-600 hover:border-dashed bg-white">
              <p className="text-black">
                <b>Sun Requirements:</b> {plantTypeRecord.sun ?? <span style={{color: "red"}}>Information Not Available</span>}
              </p>
            </td>
          </tr>
          <tr>
            <td className="border-2 border-slate-600 bg-gray-300 rounded hover:border-dashed">
              <p className="text-black">
                <b>Water Preferences:</b> {plantTypeRecord.water ?? <span style={{color: "red"}}>Information Not Available</span>}  
              </p>
            </td>
          </tr>
          <tr>
                <td className="border-2 border-slate-600 rounded hover:border-dashed bg-white">
                  <p className="text-black">
                  <b>Soil pH Preferences:</b> {plantTypeRecord.soil ?? <span style={{color: "red"}}>Information Not Available</span>}  
                  </p>
                </td>
              </tr>
          <tr>
                <td className="border-2 border-slate-600 bg-gray-300 rounded hover:border-dashed">
                  <p className="text-black">
                  <b>Minimum cold hardiness:</b> {plantTypeRecord.minColdHard ?? <span style={{color: "red"}}>Information Not Available</span>}  
                  </p>
                </td>
          </tr>
          <tr>
                <td className="border-2 border-slate-600 rounded hover:border-dashed bg-white">
                  <p className="text-black">
                  <b>Leaves:</b> {plantTypeRecord.leaves ?? <span style={{color: "red"}}>Information Not Available</span>}  
                  </p>
                </td>
          </tr>
          <tr>
                <td className="border-2 border-slate-600 bg-gray-300 rounded hover:border-dashed">
                  <p className="text-black">
                  <b>Flowers:</b> {plantTypeRecord.flowers ?? <span style={{color: "red"}}>Information Not Available</span>}  
                  </p>
                </td>
          </tr>
          <tr>
                <td className="border-2 border-slate-600 rounded hover:border-dashed bg-white">
                  <p className="text-black">
                  <b>Flower color:</b> {plantTypeRecord.flowerColor ?? <span style={{color: "red"}}>Information Not Available</span>}  
                  </p>
                </td>
          </tr>
          <tr>
                <td className="border-2 border-slate-600 bg-gray-300 rounded hover:border-dashed">
                  <p className="text-black">
                  <b>Bloom size:</b> {plantTypeRecord.bloomSize ?? <span style={{color: "red"}}>Information Not Available</span>}  
                  </p>
                </td>
          </tr>
          <tr>
                <td className="border-2 border-slate-600 rounded hover:border-dashed bg-white">
                  <p className="text-black">
                  <b>Flower time:</b> {plantTypeRecord.flowerTime ?? <span style={{color: "red"}}>Information Not Available</span>}  
                  </p>
                </td>
          </tr>
          <tr>
                <td className="border-2 border-slate-600 bg-gray-300 rounded hover:border-dashed">
                  <p className="text-black">
                  <b>Suitable locations:</b> {plantTypeRecord.suitableLocations ?? <span style={{color: "red"}}>Information Not Available</span>}  
                  </p>
                </td>
          </tr>
          <tr>
            <td className="border-2 border-slate-600 rounded hover:border-dashed bg-white">
              <p className="text-black">
                <b>Propagation:</b> {plantTypeRecord.propMethods ?? <span style={{color: "red"}}>Information Not Available</span>}  
              </p>
            </td>
          </tr>
          <tr>
            <td className="border-2 border-slate-600 bg-gray-300 rounded hover:border-dashed">
              <p className="text-black">
                <b>Other methods:</b> {plantTypeRecord.otherMethods ?? <span style={{color: "red"}}>Information Not Available</span>}  
              </p>
            </td>
          </tr>
          <tr>
            <td className="border-2 border-slate-600 rounded hover:border-dashed bg-white">
              <p className="text-black">
                <b>Containers:</b> {plantTypeRecord.containers ?? <span style={{color: "red"}}>Information Not Available</span>}  
              </p>
            </td>
          </tr>
          </tbody>
        </table>
        </section>
        </div>

        <div className="col-span-2"></div>
        </div>
  );
}

function treatmentPlan(diseaseLabel) {
  switch (diseaseLabel) {
    case "Mosaic Disease":
      return <div><p id="bad" className="bad">Remove Plant from garden</p></div>
    case 'Bacterial Blight':
      return <div>
        <p id="bad" className="bad">Pesticide: Copper fungicides</p><br/>
        <p id="bad" className="bad">Organic: <a href="https://wenkegardencenter.com/home-remedies-plant-disease/">https://wenkegardencenter.com/home-remedies-plant-disease/</a></p>
      </div>
    case 'Green Mite':
      return <div><p id="bad" className="bad"><a href="https://www.thespruce.com/control-aphids-on-houseplants-1902889">https://www.thespruce.com/control-aphids-on-houseplants-1902889</a></p></div>
    case 'Brown Streak Disease':
      return <div><p id="bad" className="bad">Cut off affected leaves and let your plant's soil dry out</p></div>
    case 'Unknown':
      return <div><p id="bad" className="bad">Not sure whats wrong with this plant</p></div>
    default:
      return <div><p id="good" className="good">Plant is looking good!</p></div>
  }
}

export default Subject;