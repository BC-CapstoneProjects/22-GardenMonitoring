import { data } from "autoprefixer";
import "./Subject.css";
import BarChart from "../../components/charts/BarChart";
import { useState } from "react";
import { Text, StyleSheet } from "react-native";


function Subject({ id, state, name, imageSrc, imageAlt, type, sun, 
  water, soil, minColdHard, leaves, flowers, flowerColor, bloomSize, flowerTime, suitableLocations,
  propMethods, otherMethods, containers, link }) {
  
  
  
  return (
    <div id="subject-page" data-key="subject" class="grid grid-cols-2">   
    
      <header class="modal-rounded">
        <Text style={{textAlignVertical: "center",color:"white"
        ,fontSize:"130%"}}><a class="underline">Common plant-name:</a> {name + " \n\n" ?? "name not found "}
        <a class="underline">Genus:</a> {type ?? <Text style={{color: "red"}}>{'Information Not Available'}</Text>}</Text>
      </header>
      <div class="modal-body rounded">
          <img src={imageSrc} alt={imageAlt} class="border-8 border-sky-500 hover:border-double rounded"/>
          <p class="border-primary rounded">
            <BarChart />
          </p>
      </div>
      <div >
      <h2 class="w-1/2 py-1/2 px-1/2 text-center text-2xl font-semibold rounded bg-primary rounded">
          Tips and Tricks
        </h2>
        
      <section className="table" class="table-fixed">
          <table class="modal-bodyborder-collapse 
          border-separate border-spacing-2 border-slate-500 bg-slate-900/20 rounded">
        <tbody>
          <tr>
            <td class="border-2 border-slate-600 hover:border-dashed bg-white">
              <p class="text-black ">
                <b>Sun Requirements:</b> {sun ?? <Text style={{color: "red"}}>{'Information Not Available'}</Text>}
              </p>
            </td>
          </tr>
          
          <tr>
            <td class="border-2 border-slate-600 bg-gray-300 rounded hover:border-dashed">
              <p class="text-black ">
              <b>Water Preferences:</b> {water ?? <Text style={{color: "red"}}>{'Information Not Available'}</Text>}  
              </p>
            </td>
          </tr>
          <tr>
            <td class="border-2 border-slate-600 rounded hover:border-dashed bg-white">
              <p class="text-black">
              <b>Soil pH Preferences:</b> {soil ?? <Text style={{color: "red"}}>{'Information Not Available'}</Text>}  
              </p>
            </td>
          </tr>
          <tr>
            <td class="border-2 border-slate-600 bg-gray-300 rounded hover:border-dashed">
              <p class="text-black ">
              <b>Minimum cold hardiness:</b> {minColdHard ?? <Text style={{color: "red"}}>{'Information Not Available'}</Text>}  
              </p>
            </td>
          </tr>
          <tr>
            <td class="border-2 border-slate-600 rounded hover:border-dashed bg-white">
              <p class="text-black ">
              <b>Leaves:</b> {leaves ?? <Text style={{color: "red"}}>{'Information Not Available'}</Text>}  
              </p>
            </td>
          </tr>
          <tr>
            <td class="border-2 border-slate-600 bg-gray-300 rounded hover:border-dashed">
              <p class="text-black ">
              <b>Flowers:</b> {flowers ?? <Text style={{color: "red"}}>{'Information Not Available'}</Text>}  
              </p>
            </td>
          </tr>
          <tr>
            <td class="border-2 border-slate-600 rounded hover:border-dashed bg-white">
              <p class="text-black ">
              <b>Flower color:</b> {flowerColor ?? <Text style={{color: "red"}}>{'Information Not Available'}</Text>}  
              </p>
            </td>
          </tr>
          <tr>
            <td class="border-2 border-slate-600 bg-gray-300 rounded hover:border-dashed">
              <p class="text-black ">
              <b>Bloom size:</b> {bloomSize ?? <Text style={{color: "red"}}>{'Information Not Available'}</Text>}  
              </p>
            </td>
          </tr>
          <tr>
            <td class="border-2 border-slate-600 rounded hover:border-dashed bg-white">
              <p class="text-black ">
              <b>Flower time:</b> {flowerTime ?? <Text style={{color: "red"}}>{'Information Not Available'}</Text>}  
              </p>
            </td>
          </tr>
          <tr>
            <td class="border-2 border-slate-600 bg-gray-300 rounded hover:border-dashed">
              <p class="text-black ">
              <b>Suitable locations:</b> {suitableLocations ?? <Text style={{color: "red"}}>{'Information Not Available'}</Text>}  
              </p>
            </td>
          </tr>
          <tr>
            <td class="border-2 border-slate-600 rounded hover:border-dashed bg-white">
              <p class="text-black ">
              <b>Propagation:</b> {propMethods ?? <Text style={{color: "red"}}>{'Information Not Available'}</Text>}  
              </p>
            </td>
          </tr>
          <tr>
            <td class="border-2 border-slate-600 bg-gray-300 rounded hover:border-dashed">
              <p class="text-black ">
              <b>Other methods:</b> {otherMethods ?? <Text style={{color: "red"}}>{'Information Not Available'}</Text>}  
              </p>
            </td>
          </tr>
          <tr>
            <td class="border-2 border-slate-600 rounded hover:border-dashed bg-white">
              <p class="text-black ">
                <b>Containers:</b> {containers ?? <Text style={{color: "red"}}>{'Information Not Available'}</Text>}  
              </p>
            </td>
          </tr>
          </tbody>
        </table>
        <div class="text-black text-center">{"For more information about your "}{name}{" click here:"} <a href={link} target="_blank" class="hover:underline text-blue-500">garden.org</a></div>
        </section>
      </div>
      
    <div class="col-span-2"></div>
  </div>
  );
}

export default Subject;
