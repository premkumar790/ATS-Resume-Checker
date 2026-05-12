import { NavLink } from "react-router-dom";

const links = [
  { name: "Home",           path: "/home" },
  // { name: "ATS Checker",    path: "/ats" },
  { name: "Resume Builder", path: "/builder" }, 
  // { name: "How It Works",   path: "/how" },
];

const NavbarCenter = ({ mobile }) => {
  return (
    <ul className={mobile ? "nav-links mobile" : "nav-links"}>
      {links.map((link) => (
        <NavLink
          key={link.path}
          to={link.path}
          className="nav-item"
        >
          {({ isActive }) => (
            <span className={isActive ? "active-link" : ""}>{link.name}</span>
          )}
        </NavLink>
      ))}
    </ul>
  );
};

export default NavbarCenter;