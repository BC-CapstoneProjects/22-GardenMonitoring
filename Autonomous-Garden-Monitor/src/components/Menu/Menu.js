import "./Menu.css";

function Menu({ children }) {
  return (
    
    <nav data-menu="main">
      {children}
    </nav>
  );
}

export default Menu;
