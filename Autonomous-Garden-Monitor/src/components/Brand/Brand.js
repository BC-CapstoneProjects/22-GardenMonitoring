import "./Brand.css";

function Brand({ children }) {
  return (
    <div className="brand">
      <h1>{children}</h1>
    </div>
  );
}

export default Brand;
