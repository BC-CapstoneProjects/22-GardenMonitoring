import "./Card.css";

function Card({ title, src, alt }) {
  return (
    <div className="card group">
      <h3 className="title">{title}</h3>
      <figure className="preview">
        {/*<canvas className="preview"></canvas>*/}
        <img src={src} alt={alt} className="group-hover:opacity-75" />
      </figure>
    </div>
  );
}

export default Card;
