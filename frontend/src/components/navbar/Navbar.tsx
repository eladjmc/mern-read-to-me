import "./Navbar.scss";
import NavbarLinks from "./links/NavbarLinks";
const Navbar = () => {
  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <div className="logo">LOGO</div>
          <NavbarLinks />
        </div>
      </nav>
    </>
  );
};

export default Navbar;
