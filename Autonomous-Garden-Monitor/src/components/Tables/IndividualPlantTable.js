import React from 'react';
//import { useParams } from "react-router-dom";
import "./IndividualPlantTable.css";
import { Text } from "react-native";
import plants from "../../components/Plants/PlantDescriptions";



// table for individual plant view 
function PlantInfo(  ) {
    const [plantData, setPlantState] = React.useState(plants);
    return (
        <div className="PlantInfo">
        <table class="modal-bodyborder-collapse 
            border-separate border-spacing-2 border-slate-500 bg-slate-900/20 rounded">
            { plantData && plantData.map(({ sun, id, water, soil, minColdHard, leaves, flowers, flowerColor, bloomSize, flowerTime, suitableLocations, propMethods, otherMethods, containers }) => ( 
            <tbody>
                <div key={id} clasName="row">
                    <tr>
                        <td class="border-2 border-slate-600 hover:border-dashed bg-white">
                        <p class="text-black ">
                            <b>Sun Requirements:</b> { sun ?? <Text style={{color: "red"}}>{'Information Not Available'}</Text>}
                        </p>
                        </td>
                    </tr>
                </div>
                <div key={id} clasName="row">
                    <tr>
                        <td class="border-2 border-slate-600 bg-gray-300 rounded hover:border-dashed">
                        <p class="text-black ">
                        <b>Water Preferences:</b> { water ?? <Text style={{color: "red"}}>{'Information Not Available'}</Text>}  
                        </p>
                        </td>
                    </tr>
                </div><div key={id} clasName="row">
                    <tr>
                        <td class="border-2 border-slate-600 rounded hover:border-dashed bg-white">
                        <p class="text-black">
                        <b>Soil pH Preferences:</b> { soil ?? <Text style={{color: "red"}}>{'Information Not Available'}</Text>}  
                        </p>
                        </td>
                    </tr></div>
                <div key={id} clasName="row">
                    <tr>
                        <td class="border-2 border-slate-600 bg-gray-300 rounded hover:border-dashed">
                        <p class="text-black ">
                        <b>Minimum cold hardiness:</b> { minColdHard ?? <Text style={{color: "red"}}>{'Information Not Available'}</Text>}  
                        </p>
                        </td>
                    </tr></div>
                    <div key={id} clasName="row">
                    <tr>
                        <td class="border-2 border-slate-600 rounded hover:border-dashed bg-white">
                        <p class="text-black ">
                        <b>Leaves:</b> { leaves ?? <Text style={{color: "red"}}>{'Information Not Available'}</Text>}  
                        </p>
                        </td>
                    </tr></div>
                    <div key={id} clasName="row">
                    <tr>
                        <td class="border-2 border-slate-600 bg-gray-300 rounded hover:border-dashed">
                        <p class="text-black ">
                        <b>Flowers:</b> { flowers ?? <Text style={{color: "red"}}>{'Information Not Available'}</Text>}  
                        </p>
                        </td>
                    </tr></div>
                    <div key={id} clasName="row">
                    <tr>
                        <td class="border-2 border-slate-600 rounded hover:border-dashed bg-white">
                        <p class="text-black ">
                        <b>Flower color:</b> { flowerColor ?? <Text style={{color: "red"}}>{'Information Not Available'}</Text>}  
                        </p>
                        </td>
                    </tr></div>
                    <div key={id} clasName="row">
                    <tr>
                        <td class="border-2 border-slate-600 bg-gray-300 rounded hover:border-dashed">
                        <p class="text-black ">
                        <b>Bloom size:</b> { bloomSize ?? <Text style={{color: "red"}}>{'Information Not Available'}</Text>}  
                        </p>
                        </td>
                    </tr></div>
                    <div key={id} clasName="row">
                    <tr>
                        <td class="border-2 border-slate-600 rounded hover:border-dashed bg-white">
                        <p class="text-black ">
                        <b>Flower time:</b> { flowerTime ?? <Text style={{color: "red"}}>{'Information Not Available'}</Text>}  
                        </p>
                        </td>
                    </tr></div>
                    <div key={id} clasName="row">
                    <tr>
                        <td class="border-2 border-slate-600 bg-gray-300 rounded hover:border-dashed">
                        <p class="text-black ">
                        <b>Suitable locations:</b> { suitableLocations ?? <Text style={{color: "red"}}>{'Information Not Available'}</Text>}  
                        </p>
                        </td>
                    </tr></div>
                    <div key={id} clasName="row">
                    <tr>
                        <td class="border-2 border-slate-600 rounded hover:border-dashed bg-white">
                        <p class="text-black ">
                        <b>Propagation:</b> { propMethods ?? <Text style={{color: "red"}}>{'Information Not Available'}</Text>}  
                        </p>
                        </td>
                    </tr></div>
                    <div key={id} clasName="row">
                    <tr>
                        <td class="border-2 border-slate-600 bg-gray-300 rounded hover:border-dashed">
                        <p class="text-black ">
                        <b>Other methods:</b> { otherMethods ?? <Text style={{color: "red"}}>{'Information Not Available'}</Text>}  
                        </p>
                        </td>
                    </tr></div>
                    <div key={id} clasName="row">
                    <tr>
                        <td class="border-2 border-slate-600 rounded hover:border-dashed bg-white">
                        <p class="text-black ">
                            <b>Containers:</b> { containers ?? <Text style={{color: "red"}}>{'Information Not Available'}</Text>}  
                        </p>
                        </td>
                    </tr>
                    </div>
            </tbody>
            ))}
            </table>
            </div>
            
    );
}

export default PlantInfo;
