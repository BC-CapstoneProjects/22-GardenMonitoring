import "./Subject.css";
//import { useParams } from "react-router-dom";
import BarChart from "../../components/Charts/BarChart";
//import PlantInfo from "../../components/Tables/IndividualPlantTable";
import { Text } from "react-native";
//import PlantDescriptions from "../../components/Plants/PlantDescriptions";
import AWS from "aws-sdk";
import { useEffect, useState } from "react";

const dynamoDB = new AWS.DynamoDB({
  apiVersion: "2012-08-10",
  region: "us-west-2",
  accessKeyId: "",
  secretAccessKey: "",  
});

function Subject({ id, state, name, imageSrc, imageAlt, type, sun, 
  water, soil, minColdHard, leaves, flowers, flowerColor, bloomSize, flowerTime, suitableLocations,
  propMethods, otherMethods, containers, link }) {
    
  const [diseaseData, setDiseaseData] = useState(null);

  useEffect(() => {
    if (id !== undefined) {
      const params = {
        TableName: "Garden",
        Key: {
          "Garden_Id": { N: id.toString() }
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
        <Text style={{textAlignVertical: "center", color: "white", fontSize: "130%", width: "50%"}}>
          <Text className="underline">Common plant-name:</Text> {name + " \n\n" ?? "name not found "}
          <Text className="underline">Genus:</Text> {type ?? <Text style={{color: "red"}}>{'Information Not Available'}</Text>}
        </Text>
        <Text style={{width: "50%", textAlignVertical: "center", textAlign: "right", color: "white", fontSize: "130%"}}>
          Diseased: {diseaseData?.diseased?.BOOL?.toString() || "Loading .."} <br/><br/>Label: {diseaseData?.label.S || "Loading .."}</Text>
      </header>
      <div className="modal-body rounded">
        <img src={imageSrc} alt={imageAlt} className="border-8 border-sky-500 hover:border-double rounded"/>
        <p className="border-primary rounded">
          <BarChart />
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
              <p className="text-black ">
                <b>Sun Requirements:</b> {sun ?? <Text style={{color: "red"}}>{'Information Not Available'}</Text>}
              </p>
            </td>
          </tr>
          
          <tr>
            <td className="border-2 border-slate-600 bg-gray-300 rounded hover:border-dashed">
              <p className="text-black ">
              <b>Water Preferences:</b> {water ?? <Text style={{color: "red"}}>{'Information Not Available'}</Text>}  
              </p>
            </td>
          </tr>
          <tr>
            <td className="border-2 border-slate-600 rounded hover:border-dashed bg-white">
              <p className="text-black">
              <b>Soil pH Preferences:</b> {soil ?? <Text style={{color: "red"}}>{'Information Not Available'}</Text>}  
              </p>
            </td>
          </tr>
          <tr>
            <td className="border-2 border-slate-600 bg-gray-300 rounded hover:border-dashed">
              <p className="text-black ">
              <b>Minimum cold hardiness:</b> {minColdHard ?? <Text style={{color: "red"}}>{'Information Not Available'}</Text>}  
              </p>
            </td>
          </tr>
          <tr>
            <td className="border-2 border-slate-600 rounded hover:border-dashed bg-white">
              <p className="text-black ">
              <b>Leaves:</b> {leaves ?? <Text style={{color: "red"}}>{'Information Not Available'}</Text>}  
              </p>
            </td>
          </tr>
          <tr>
            <td className="border-2 border-slate-600 bg-gray-300 rounded hover:border-dashed">
              <p className="text-black ">
              <b>Flowers:</b> {flowers ?? <Text style={{color: "red"}}>{'Information Not Available'}</Text>}  
              </p>
            </td>
          </tr>
          <tr>
            <td className="border-2 border-slate-600 rounded hover:border-dashed bg-white">
              <p className="text-black ">
              <b>Flower color:</b> {flowerColor ?? <Text style={{color: "red"}}>{'Information Not Available'}</Text>}  
              </p>
            </td>
          </tr>
          <tr>
            <td className="border-2 border-slate-600 bg-gray-300 rounded hover:border-dashed">
              <p className="text-black ">
              <b>Bloom size:</b> {bloomSize ?? <Text style={{color: "red"}}>{'Information Not Available'}</Text>}  
              </p>
            </td>
          </tr>
          <tr>
            <td className="border-2 border-slate-600 rounded hover:border-dashed bg-white">
              <p className="text-black ">
              <b>Flower time:</b> {flowerTime ?? <Text style={{color: "red"}}>{'Information Not Available'}</Text>}  
              </p>
            </td>
          </tr>
          <tr>
            <td className="border-2 border-slate-600 bg-gray-300 rounded hover:border-dashed">
              <p className="text-black ">
              <b>Suitable locations:</b> {suitableLocations ?? <Text style={{color: "red"}}>{'Information Not Available'}</Text>}  
              </p>
            </td>
          </tr>
          <tr>
            <td className="border-2 border-slate-600 rounded hover:border-dashed bg-white">
              <p className="text-black ">
              <b>Propagation:</b> {propMethods ?? <Text style={{color: "red"}}>{'Information Not Available'}</Text>}  
              </p>
            </td>
          </tr>
          <tr>
            <td className="border-2 border-slate-600 bg-gray-300 rounded hover:border-dashed">
              <p className="text-black ">
              <b>Other methods:</b> {otherMethods ?? <Text style={{color: "red"}}>{'Information Not Available'}</Text>}  
              </p>
            </td>
          </tr>
          <tr>
            <td className="border-2 border-slate-600 rounded hover:border-dashed bg-white">
              <p className="text-black ">
                <b>Containers:</b> {containers ?? <Text style={{color: "red"}}>{'Information Not Available'}</Text>}  
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

export default Subject;
