import "./Brand.css";

function Brand({ alt, children }) {
  return (
    <div className="brand">
      {children ?? <h1>{alt}</h1>}
    </div>
  );
}

export default Brand;
