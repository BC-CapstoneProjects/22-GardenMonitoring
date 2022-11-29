// import { useState } from "react";
import { Link, useParams } from "react-router-dom";

import Brand from "../../components/Brand";

import Menu from "../../components/Menu";

import Card from "../../components/Card";

import Subject from "../Subject";

import "./Garden.css";

//TODO: Replace with real data.
const subjects = [
  {
    id: 1,
    name: 'Rose #03',
    imageSrc: 'https://images.unsplash.com/photo-1446071103084-c257b5f70672?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=984&q=80',
    imageAlt: 'Tall slender porcelain bottle with natural clay textured body and cork stopper.',
    state: "success",
  },
  {
    id: 2,
    name: 'Big Boy A890',
    imageSrc: 'https://images.unsplash.com/photo-1535882832-ac75c142f79f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1335&q=80',
    imageAlt: 'Olive drab green insulated bottle with flared screw lid and flat top.',
    state: "success",
  },
  {
    id: 3,
    name: 'Chandler',
    imageSrc: 'https://images.unsplash.com/photo-1496062031456-07b8f162a322?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1365&q=80',
    imageAlt: 'Person using a pen to cross a task off a productivity paper card.',
    state: "success",
  },
  {
    id: 4,
    name: 'Rachel',
    imageSrc: 'https://images.unsplash.com/photo-1491147334573-44cbb4602074?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80',
    imageAlt: 'Hand holding black machined steel mechanical pencil with brass tip and top.',
    state: "warning",
  },
  {
    id: 5,
    name: 'Rose #03',
    imageSrc: 'https://images.unsplash.com/photo-1579599309119-7e07e600184e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2671&q=80',
    imageAlt: 'Tall slender porcelain bottle with natural clay textured body and cork stopper.',
    state: "success",
  },
  {
    id: 6,
    name: 'Big Boy A890',
    imageSrc: 'https://images.unsplash.com/photo-1569114241780-d60b37693dbc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1335&q=80',
    imageAlt: 'Olive drab green insulated bottle with flared screw lid and flat top.',
    state: "warning",
  },
  {
    id: 7,
    name: 'Chandler',
    imageSrc: 'https://images.unsplash.com/photo-1535242208474-9a2793260ca8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1364&q=80',
    imageAlt: 'Person using a pen to cross a task off a productivity paper card.',
    state: "error",
  },
  {
    id: 8,
    name: 'Rachel',
    imageSrc: 'https://images.unsplash.com/photo-1479658744930-03854858a953?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1321&q=80',
    imageAlt: 'Hand holding black machined steel mechanical pencil with brass tip and top.',
    state: "success",
  },
];

function Garden() {
  const { subjectID } = useParams();
  console.log("ID", subjectID);

  const onChangeHandler = () => {
    console.log("asdflaksjdf");
  };

  const subject = subjects.find((value) => {
    console.log("Filter Comparison:", (subjectID === value.id.toString()), subjectID, value.id.toString());
    return (subjectID === value.id.toString())
  });

  return (
    <main id="garden-monitor">

      <header>
        <Brand alt="Autonomous Garden Monitoring" />
        <Menu>
          <Link to="/settings">Setting</Link>
        </Menu>
      </header>
      <section className="content">
        <h2 className="name">Garden</h2>
        <div className="grid">
          {subjects.map(({ id, state, name, imageSrc, imageAlt }) => (
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
      <input type="checkbox" id="my-modal-5" checked={!!subjectID} onChange={onChangeHandler} className="modal-toggle" />
      <div className="modal bg-slate-900/90">
        <div className="modal-box bg-slate-600">
          <Subject {...subject} />
        </div>
      </div>
    </main>
  );
}

// function Modal() {
//   console.log("asdf");
//   return (
//     <div id="modal">
//     </div>
//   );
// }

export default Garden;
// export { Modal };
