import "./Subject.css";
import LineChart from "../../components/Charts/LineChart";
import AWS from "aws-sdk";

import { useEffect, useState } from "react";

// Retrieve disease label from the json of a given plant's 'scan' url from PlantDescriptions
async function fetchDiseaseLabel(scanUrl) {
  try {
    const response = await fetch(scanUrl);
    const json = await response.json();
    return json[0].disease; // Fetch only the first disease label (most recent)
  }
  catch (error) {
    console.error("Error fetching disease label for Garden chart:", error)
    return null;
  }
}

function Subject({ id, scan, state, name, imageSrc, imageAlt, type, sun, 
  water, soil, minColdHard, leaves, flowers, flowerColor, bloomSize, flowerTime, suitableLocations,
  propMethods, otherMethods, containers, link }) {
    
  const [diseaseData, setDiseaseData] = useState(null);

  useEffect(() => {
    // Fetch the disease label only for the given 'scan' prop
    fetchDiseaseLabel(scan).then(diseaseLabel => {
      setDiseaseData({
        diseased: diseaseLabel !== 'Healthy',
        label: diseaseLabel,
      });
    });
  }, [id, scan]);

  console.log("Disease Data: ", id, diseaseData);

  return (
    <div id="subject-page" data-key="subject" className="grid grid-cols-2">
    <header className="rounded">
      <p style={{textAlign: "center", color: "white", fontSize: "130%", width: "50%"}}>
        <span className="underline">Common plant-name:</span> {name + " \n\n" ?? "name not found "}
        <span className="underline">Genus:</span> 
        { type ?? <span style={{color: "red"}}>{'Information Not Available'}</span> }
      </p>
      <p style={{textAlign: "center", color: "white", fontSize: "130%", width: "50%"}}>
      </p>
      {diseaseData ? (
        <p style={{width: "50%", textAlign: "center", color: "white", fontSize: "130%"}}>
          Diseased: {diseaseData.diseased.toString()} <br/><br/>Label: {diseaseData.label}
        </p>
      ) : (
        <p style={{width: "50%", textAlign: "center", color: "white", fontSize: "130%"}}>
          Loading ...
        </p>
      )}
      {diseaseData && treatmentPlan(diseaseData.label)}
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


//old way

// import "./Subject.css";
// import LineChart from "../../components/Charts/LineChart";
// import AWS from "aws-sdk";

// import { useEffect, useState } from "react";

// // AWS.config.update({ region: "us-west-2" }); // Set the region

// // const dynamoDB = new AWS.DynamoDB({
// //   apiVersion: "2012-08-10",
// // });
// const dynamoDB = new AWS.DynamoDB({
//   apiVersion: "2012-08-10",
//   region: "us-west-2",
//   accessKeyId: "AKIAXCHIDAXBA4JRU2KJ",
//   secretAccessKey: "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",
// });

// function Subject({ id, scan, state, name, imageSrc, imageAlt, type, sun, 
//   water, soil, minColdHard, leaves, flowers, flowerColor, bloomSize, flowerTime, suitableLocations,
//   propMethods, otherMethods, containers, link }) {
    
//   const [diseaseData, setDiseaseData] = useState(null);

//   useEffect(() => {
//     if (id !== undefined) {
//       const params = {
//         TableName: "Garden",
//         Key: {
//           "PlantID": { S: id.toString() }
//         }
//       };
      
//       console.log("Getting Disease Record:", params);
//       dynamoDB.getItem(params, function(err, data) {
//         if (err) console.error("Error:", err, err.stack);
//         else {
//           console.info("Found Disease Record:", data);
//           setDiseaseData(data.Item);
//         }
//       });
//     }
//   }, [id]);

//   console.log("Disease Data: ", id, diseaseData);

//   return (
//     <div id="subject-page" data-key="subject" className="grid grid-cols-2">
//       <header className="rounded">
//         <p style={{textAlign: "center", color: "white", fontSize: "130%", width: "50%"}}>
//           <span className="underline">Common plant-name:</span> {name + " \n\n" ?? "name not found "}
//           <span className="underline">Genus:</span> 
//           { type ?? <span style={{color: "red"}}>{'Information Not Available'}</span> }
//         </p>
//         <p style={{width: "50%", textAlign: "center", color: "white", fontSize: "130%"}}>
//           Diseased: {diseaseData?.diseased?.BOOL?.toString() || "Loading .."} <br/><br/>Label: {diseaseData?.label.S || "Loading .."}</p>
//           {diseaseData && treatmentPlan(diseaseData?.label?.S)}
//       </header>
//       <div className="modal-body rounded">
//         <img src={imageSrc} alt={imageAlt} className="border-8 border-sky-500 hover:border-double rounded"/>
//         <p className="border-primary rounded">

//           <LineChart />

//         </p>
//       </div>
//       <div >
//       <h2 className="w-1/2 py-1/2 px-1/2 text-center text-2xl font-semibold rounded bg-primary rounded">
//         Tips and Tricks
//       </h2>
//       <section className="table table-fixed">
//         <div className="text-black text-center">{"For more information about your "}{name}{" click here: "} <a href={ link } target="_blank" className="hover:underline text-blue-500" rel="noreferrer">garden.org</a></div>      
//         <table className="modal-bodyborder-collapse 
//           border-separate border-spacing-2 border-slate-500 bg-slate-900/20 rounded">
//         <tbody>
//           <tr>  
//             <td className="border-2 border-slate-600 hover:border-dashed bg-white">
//               <p className="text-black">
//                 <b>Sun Requirements:</b> {sun ?? <span style={{color: "red"}}>Information Not Available</span>}
//               </p>
//             </td>
//           </tr>
//           <tr>
//             <td className="border-2 border-slate-600 bg-gray-300 rounded hover:border-dashed">
//               <p className="text-black">
//                 <b>Water Preferences:</b> {water ?? <span style={{color: "red"}}>Information Not Available</span>}  
//               </p>
//             </td>
//           </tr>
//           <tr>
//                 <td className="border-2 border-slate-600 rounded hover:border-dashed bg-white">
//                   <p className="text-black">
//                   <b>Soil pH Preferences:</b> {soil ?? <span style={{color: "red"}}>Information Not Available</span>}  
//                   </p>
//                 </td>
//               </tr>
//           <tr>
//                 <td className="border-2 border-slate-600 bg-gray-300 rounded hover:border-dashed">
//                   <p className="text-black">
//                   <b>Minimum cold hardiness:</b> {minColdHard ?? <span style={{color: "red"}}>Information Not Available</span>}  
//                   </p>
//                 </td>
//           </tr>
//           <tr>
//                 <td className="border-2 border-slate-600 rounded hover:border-dashed bg-white">
//                   <p className="text-black">
//                   <b>Leaves:</b> {leaves ?? <span style={{color: "red"}}>Information Not Available</span>}  
//                   </p>
//                 </td>
//           </tr>
//           <tr>
//                 <td className="border-2 border-slate-600 bg-gray-300 rounded hover:border-dashed">
//                   <p className="text-black">
//                   <b>Flowers:</b> {flowers ?? <span style={{color: "red"}}>Information Not Available</span>}  
//                   </p>
//                 </td>
//           </tr>
//           <tr>
//                 <td className="border-2 border-slate-600 rounded hover:border-dashed bg-white">
//                   <p className="text-black">
//                   <b>Flower color:</b> {flowerColor ?? <span style={{color: "red"}}>Information Not Available</span>}  
//                   </p>
//                 </td>
//           </tr>
//           <tr>
//                 <td className="border-2 border-slate-600 bg-gray-300 rounded hover:border-dashed">
//                   <p className="text-black">
//                   <b>Bloom size:</b> {bloomSize ?? <span style={{color: "red"}}>Information Not Available</span>}  
//                   </p>
//                 </td>
//           </tr>
//           <tr>
//                 <td className="border-2 border-slate-600 rounded hover:border-dashed bg-white">
//                   <p className="text-black">
//                   <b>Flower time:</b> {flowerTime ?? <span style={{color: "red"}}>Information Not Available</span>}  
//                   </p>
//                 </td>
//           </tr>
//           <tr>
//                 <td className="border-2 border-slate-600 bg-gray-300 rounded hover:border-dashed">
//                   <p className="text-black">
//                   <b>Suitable locations:</b> {suitableLocations ?? <span style={{color: "red"}}>Information Not Available</span>}  
//                   </p>
//                 </td>
//           </tr>
//           <tr>
//             <td className="border-2 border-slate-600 rounded hover:border-dashed bg-white">
//               <p className="text-black">
//                 <b>Propagation:</b> {propMethods ?? <span style={{color: "red"}}>Information Not Available</span>}  
//               </p>
//             </td>
//           </tr>
//           <tr>
//             <td className="border-2 border-slate-600 bg-gray-300 rounded hover:border-dashed">
//               <p className="text-black">
//                 <b>Other methods:</b> {otherMethods ?? <span style={{color: "red"}}>Information Not Available</span>}  
//               </p>
//             </td>
//           </tr>
//           <tr>
//             <td className="border-2 border-slate-600 rounded hover:border-dashed bg-white">
//               <p className="text-black">
//                 <b>Containers:</b> {containers ?? <span style={{color: "red"}}>Information Not Available</span>}  
//               </p>
//             </td>
//           </tr>
//           </tbody>
//         </table>
//         </section>
//         </div>

//         <div className="col-span-2"></div>
//         </div>
//   );
// }

// function treatmentPlan(diseaseLabel) {
//   switch (diseaseLabel) {
//     case "Mosaic Disease":
//       return <div><p id="bad" className="bad">Remove Plant from garden</p></div>
//     case 'Bacterial Blight':
//       return <div>
//         <p id="bad" className="bad">Pesticide: Copper fungicides</p><br/>
//         <p id="bad" className="bad">Organic: <a href="https://wenkegardencenter.com/home-remedies-plant-disease/">https://wenkegardencenter.com/home-remedies-plant-disease/</a></p>
//       </div>
//     case 'Green Mite':
//       return <div><p id="bad" className="bad"><a href="https://www.thespruce.com/control-aphids-on-houseplants-1902889">https://www.thespruce.com/control-aphids-on-houseplants-1902889</a></p></div>
//     case 'Brown Streak Disease':
//       return <div><p id="bad" className="bad">Cut off affected leaves and let your plant's soil dry out</p></div>
//     case 'Unknown':
//       return <div><p id="bad" className="bad">Not sure whats wrong with this plant</p></div>
//     default:
//       return <div><p id="good" className="good">Plant is looking good!</p></div>
//   }
// }

// export default Subject;