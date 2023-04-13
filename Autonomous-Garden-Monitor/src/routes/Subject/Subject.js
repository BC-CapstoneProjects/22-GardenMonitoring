import "./Subject.css";
import LineChart from "../../components/Charts/LineChart";
import AWS from "aws-sdk";

import { useEffect, useState } from "react";

AWS.config.update({ region: "us-west-2" }); // Set the region

const dynamoDB = new AWS.DynamoDB({
  apiVersion: "2012-08-10",
});

function Subject({ id, disease, state, name, imageSrc, imageAlt, type, sun, 
  water, soil, minColdHard, leaves, flowers, flowerColor, bloomSize, flowerTime, suitableLocations,
  propMethods, otherMethods, containers, link }) {
    
  const [diseaseData, setDiseaseData] = useState(null);

  useEffect(() => {
    if (id !== undefined) {
      const params = {
        TableName: "Garden",
        Key: {
          "PlantID": { S: id.toString() }
        }
      };
      
      console.log("Getting Disease Record:", params);
      dynamoDB.getItem(params, function(err, data) {
        if (err) console.error("Error:", err, err.stack);
        else {
          console.info("Found Disease Record:", data);
          setDiseaseData(data.Item);
        }
      });
    }
  }, [id]);

  console.log("Disease Data: ", id, diseaseData);

  return (
    <div id="subject-page" data-key="subject" className="grid grid-cols-2">
      <header className="rounded">
        <p style={{textAlign: "center", color: "white", fontSize: "130%", width: "50%"}}>
          <span className="underline">Common plant-name:</span> {name + " \n\n" ?? "name not found "}
          <span className="underline">Genus:</span> 
          { type ?? <span style={{color: "red"}}>{'Information Not Available'}</span> }
        </p>
        <p style={{width: "50%", textAlign: "center", color: "white", fontSize: "130%"}}>
          Diseased: {diseaseData?.diseased?.BOOL?.toString() || "Loading .."} <br/><br/>Label: {diseaseData?.label.S || "Loading .."}</p>
          {diseaseData && treatmentPlan(diseaseData?.label?.S)}
      </header>
      <div className="modal-body rounded">
        <img src={imageSrc} alt={imageAlt} className="border-8 border-sky-500 hover:border-double rounded"/>
        <p className="border-primary rounded">

          <LineChart />

        </p>
      </div>
      <div >
      <h2 className="w-1/2 py-1/2 px-1/2 text-center text-2xl font-semibold rounded bg-primary rounded">
        Tips and Tricks
      </h2>
      <section className="table table-fixed">
        <div className="text-black text-center">{"For more information about your "}{name}{" click here: "} <a href={ link } target="_blank" className="hover:underline text-blue-500" rel="noreferrer">garden.org</a></div>      
        <table className="modal-bodyborder-collapse 
          border-separate border-spacing-2 border-slate-500 bg-slate-900/20 rounded">
        <tbody>
          <tr>  
            <td className="border-2 border-slate-600 hover:border-dashed bg-white">
              <p className="text-black">
                <b>Sun Requirements:</b> {sun ?? <span style={{color: "red"}}>Information Not Available</span>}
              </p>
            </td>
          </tr>
          <tr>
            <td className="border-2 border-slate-600 bg-gray-300 rounded hover:border-dashed">
              <p className="text-black">
                <b>Water Preferences:</b> {water ?? <span style={{color: "red"}}>Information Not Available</span>}  
              </p>
            </td>
          </tr>
          <tr>
                <td className="border-2 border-slate-600 rounded hover:border-dashed bg-white">
                  <p className="text-black">
                  <b>Soil pH Preferences:</b> {soil ?? <span style={{color: "red"}}>Information Not Available</span>}  
                  </p>
                </td>
              </tr>
          <tr>
                <td className="border-2 border-slate-600 bg-gray-300 rounded hover:border-dashed">
                  <p className="text-black">
                  <b>Minimum cold hardiness:</b> {minColdHard ?? <span style={{color: "red"}}>Information Not Available</span>}  
                  </p>
                </td>
          </tr>
          <tr>
                <td className="border-2 border-slate-600 rounded hover:border-dashed bg-white">
                  <p className="text-black">
                  <b>Leaves:</b> {leaves ?? <span style={{color: "red"}}>Information Not Available</span>}  
                  </p>
                </td>
          </tr>
          <tr>
                <td className="border-2 border-slate-600 bg-gray-300 rounded hover:border-dashed">
                  <p className="text-black">
                  <b>Flowers:</b> {flowers ?? <span style={{color: "red"}}>Information Not Available</span>}  
                  </p>
                </td>
          </tr>
          <tr>
                <td className="border-2 border-slate-600 rounded hover:border-dashed bg-white">
                  <p className="text-black">
                  <b>Flower color:</b> {flowerColor ?? <span style={{color: "red"}}>Information Not Available</span>}  
                  </p>
                </td>
          </tr>
          <tr>
                <td className="border-2 border-slate-600 bg-gray-300 rounded hover:border-dashed">
                  <p className="text-black">
                  <b>Bloom size:</b> {bloomSize ?? <span style={{color: "red"}}>Information Not Available</span>}  
                  </p>
                </td>
          </tr>
          <tr>
                <td className="border-2 border-slate-600 rounded hover:border-dashed bg-white">
                  <p className="text-black">
                  <b>Flower time:</b> {flowerTime ?? <span style={{color: "red"}}>Information Not Available</span>}  
                  </p>
                </td>
          </tr>
          <tr>
                <td className="border-2 border-slate-600 bg-gray-300 rounded hover:border-dashed">
                  <p className="text-black">
                  <b>Suitable locations:</b> {suitableLocations ?? <span style={{color: "red"}}>Information Not Available</span>}  
                  </p>
                </td>
          </tr>
          <tr>
            <td className="border-2 border-slate-600 rounded hover:border-dashed bg-white">
              <p className="text-black">
                <b>Propagation:</b> {propMethods ?? <span style={{color: "red"}}>Information Not Available</span>}  
              </p>
            </td>
          </tr>
          <tr>
            <td className="border-2 border-slate-600 bg-gray-300 rounded hover:border-dashed">
              <p className="text-black">
                <b>Other methods:</b> {otherMethods ?? <span style={{color: "red"}}>Information Not Available</span>}  
              </p>
            </td>
          </tr>
          <tr>
            <td className="border-2 border-slate-600 rounded hover:border-dashed bg-white">
              <p className="text-black">
                <b>Containers:</b> {containers ?? <span style={{color: "red"}}>Information Not Available</span>}  
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
      return <div><p>Remove Plant from garden</p></div>
    case 'Bacterial Blight':
      return <div>
        <p>Pestidce: Copper fungicides are labeled for control of bacterial blight on soybeans but need to be applied early in the disease cycle to be effective.</p><br/>
        <p>Orgainc: https://wenkegardencenter.com/home-remedies-plant-disease/</p>
      </div>
    case 'Green Mite':
      return <div><p>https://www.almanac.com/pest/aphids</p></div>
    case 'Unknown':
      return <div><p>Not sure whats wrong with this plant</p></div>
    default:
      return <div><p>Plant is looking good!</p></div>
  }
}

export default Subject;