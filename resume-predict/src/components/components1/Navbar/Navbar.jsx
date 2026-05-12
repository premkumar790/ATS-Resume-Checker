import React, { useState } from "react";
import "./Navbar.css";
import NavbarLeft from "./NavbarLeft";
import NavbarCenter from "./NavbarCenter";
import NavbarRight from "./NavbarRight";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="nav-container">

        <NavbarLeft />

        {/* Desktop Menu */}
        <div className="nav-center desktop">
          <NavbarCenter />
        </div>

        <div className="nav-right desktop">
          <NavbarRight />
        </div>

        {/* Mobile Hamburger */}
        <div className="hamburger" onClick={() => setOpen(!open)}>
          ☰
        </div>
      </div>

      {/* Mobile Dropdown */}
      {open && (
        <div className="mobile-menu">
          <NavbarCenter mobile />
          <NavbarRight mobile />
        </div>
      )}
    </nav>
  );
};

export default Navbar;