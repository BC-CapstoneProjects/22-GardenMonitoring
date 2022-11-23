import { Link } from "react-router-dom";

import Brand from "../../components/Brand";

import Menu from "../../components/Menu";

import Card from "../../components/Card";

import "./Garden.css";

//TODO: Replace with real data.
const subjects = [
  {
    id: 1,
    name: 'Rose #03',
    href: '#',
    imageSrc: 'https://images.unsplash.com/photo-1446071103084-c257b5f70672?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=984&q=80',
    imageAlt: 'Tall slender porcelain bottle with natural clay textured body and cork stopper.',
    state: "success",
  },
  {
    id: 2,
    name: 'Big Boy A890',
    href: '#',
    imageSrc: 'https://images.unsplash.com/photo-1535882832-ac75c142f79f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1335&q=80',
    imageAlt: 'Olive drab green insulated bottle with flared screw lid and flat top.',
    state: "success",
  },
  {
    id: 3,
    name: 'Chandler',
    href: '#',
    imageSrc: 'https://images.unsplash.com/photo-1496062031456-07b8f162a322?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1365&q=80',
    imageAlt: 'Person using a pen to cross a task off a productivity paper card.',
    state: "success",
  },
  {
    id: 4,
    name: 'Rachel',
    href: '#',
    imageSrc: 'https://images.unsplash.com/photo-1491147334573-44cbb4602074?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80',
    imageAlt: 'Hand holding black machined steel mechanical pencil with brass tip and top.',
    state: "warning",
  },
  {
    id: 5,
    name: 'Rose #03',
    href: '#',
    imageSrc: 'https://images.unsplash.com/photo-1579599309119-7e07e600184e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2671&q=80',
    imageAlt: 'Tall slender porcelain bottle with natural clay textured body and cork stopper.',
    state: "success",
  },
  {
    id: 6,
    name: 'Big Boy A890',
    href: '#',
    imageSrc: 'https://images.unsplash.com/photo-1569114241780-d60b37693dbc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1335&q=80',
    imageAlt: 'Olive drab green insulated bottle with flared screw lid and flat top.',
    state: "warning",
  },
  {
    id: 7,
    name: 'Chandler',
    href: '#',
    imageSrc: 'https://images.unsplash.com/photo-1535242208474-9a2793260ca8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1364&q=80',
    imageAlt: 'Person using a pen to cross a task off a productivity paper card.',
    state: "error",
  },
  {
    id: 8,
    name: 'Rachel',
    href: '#',
    imageSrc: 'https://images.unsplash.com/photo-1479658744930-03854858a953?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1321&q=80',
    imageAlt: 'Hand holding black machined steel mechanical pencil with brass tip and top.',
    state: "success",
  },
];

function Garden() {
  return (
    <main id="garden-monitor">
      <header>
        <Brand>
          Autonomous Garden Monitoring
        </Brand>
        <Menu>
          <Link to="/settings">Setting</Link>
        </Menu>
      </header>
      <section className="content">
        <h2 className="name">Garden</h2>
        <div className="grid">
          {subjects.map((subject) => (
            <Link
              key={subject.id}
              to={subject.href}
              className="card group"
              data-state={subject.state}
            >
              <Card
                title={subject.name}
                src={subject.imageSrc}
                alt={subject.imageAlt}
              />
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}

export default Garden;
