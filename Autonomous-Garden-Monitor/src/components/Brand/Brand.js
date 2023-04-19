import "./Brand.css";

function Brand({ alt, children, onClick }) {

  return (
    <div className="brand" onClick={onClick}>
      {children ?? <h1>{alt}</h1>}
    </div>
  );
}

export default Brand;