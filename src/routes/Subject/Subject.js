import { data } from "autoprefixer";
import "./Subject.css";
import BarChart from "../../components/charts/BarChart";
import { useState } from "react";


function Subject({ id, state, name, imageSrc, imageAlt, type, sun, 
  water, soil, minColdHard, leaves, flowers, flowerColor, bloomSize, flowerTime, suitableLocations,
  propMethods, otherMethods, containers }) {



  return (
    <div id="subject-page" data-key="subject" className="grid grid-cols-2">   
      <header className="rounded">
        <div style={{textAlignVertical: "center",color:"white"
        ,fontSize:"130%"}}>User plant-name: {name + " \n" ?? "name not found "}
        Genus: {type ?? <div className="warn">{'Information Not Available'}</div>}</div>
      </header>
      <div >
      <h2 class="w-1/2 py-1/2 px-1/2 text-center text-2xl font-semibold rounded bg-primary">
          Tips and Tricks
        </h2>
      <section className="table table-fixed">
          <table className="modal-bodyborder-collapse 
          border-separate border-spacing-2 border-slate-500 bg-slate-900/20 rounded">
        <tbody>
          <tr>
            <td className="border-2 border-slate-600 hover:border-dashed bg-white">
              <p className="text-black ">
                <b>Sun Requirements:</b> {sun ?? <div className="warn">{'Information Not Available'}</div>}
              </p>
            </td>
          </tr>

          <tr>
            <td className="border-2 border-slate-600 bg-gray-300 rounded hover:border-dashed">
              <p className="text-black ">
              <b>Water Preferences:</b> {water ?? <div className="warn">{'Information Not Available'}</div>}  
              </p>
            </td>
          </tr>
          <tr>
            <td className="border-2 border-slate-600 rounded hover:border-dashed bg-white">
              <p className="text-black">
              <b>Soil pH Preferences:</b> {soil ?? <div className="warn">{'Information Not Available'}</div>}  
              </p>
            </td>
          </tr>
          <tr>
            <td className="border-2 border-slate-600 bg-gray-300 rounded hover:border-dashed">
              <p className="text-black ">
              <b>Minimum cold hardiness:</b> {minColdHard ?? <div className="warn">{'Information Not Available'}</div>}  
              </p>
            </td>
          </tr>
          <tr>
            <td className="border-2 border-slate-600 rounded hover:border-dashed bg-white">
              <p className="text-black ">
              <b>Leaves:</b> {leaves ?? <div className="warn">{'Information Not Available'}</div>}  
              </p>
            </td>
          </tr>
          <tr>
            <td className="border-2 border-slate-600 bg-gray-300 rounded hover:border-dashed">
              <p className="text-black ">
              <b>Flowers:</b> {flowers ?? <div className="warn">{'Information Not Available'}</div>}  
              </p>
            </td>
          </tr>
          <tr>
            <td className="border-2 border-slate-600 rounded hover:border-dashed bg-white">
              <p className="text-black ">
              <b>Flower color:</b> {flowerColor ?? <div className="warn">{'Information Not Available'}</div>}  
              </p>
            </td>
          </tr>
          <tr>
            <td className="border-2 border-slate-600 bg-gray-300 rounded hover:border-dashed">
              <p className="text-black ">
              <b>Bloom size:</b> {bloomSize ?? <div className="warn">{'Information Not Available'}</div>}  
              </p>
            </td>
          </tr>
          <tr>
            <td className="border-2 border-slate-600 rounded hover:border-dashed bg-white">
              <p className="text-black ">
              <b>Flower time:</b> {flowerTime ?? <div className="warn">{'Information Not Available'}</div>}  
              </p>
            </td>
          </tr>
          <tr>
            <td className="border-2 border-slate-600 bg-gray-300 rounded hover:border-dashed">
              <p className="text-black ">
              <b>Suitable locations:</b> {suitableLocations ?? <div className="warn">{'Information Not Available'}</div>}  
              </p>
            </td>
          </tr>
          <tr>
            <td className="border-2 border-slate-600 rounded hover:border-dashed bg-white">
              <p className="text-black ">
              <b>Propagation:</b> {propMethods ?? <div className="warn">{'Information Not Available'}</div>}  
              </p>
            </td>
          </tr>
          <tr>
            <td className="border-2 border-slate-600 bg-gray-300 rounded hover:border-dashed">
              <p className="text-black ">
              <b>Other methods:</b> {otherMethods ?? <div className="warn">{'Information Not Available'}</div>}  
              </p>
            </td>
          </tr>
          <tr>
            <td className="border-2 border-slate-600 rounded hover:border-dashed bg-white">
              <p className="text-black ">
              <b>Containers:</b> {containers ?? <div className="warn">{'Information Not Available'}</div>}  
              </p>
            </td>
          </tr>
          </tbody>
        </table>
        <div className="text-secondary">{"Table information sourced from: garden.org"}</div>
        </section>
      </div>
      <div className="modal-body rounded">
          <img src={imageSrc} alt={imageAlt} className="border-8 border-sky-500 hover:border-double"/>

          <p className="border-primary rounded">
            <BarChart />

          </p>
        </div>
      <div className="col-span-2">
        </div>
    </div>
  );
}

export default Subject;