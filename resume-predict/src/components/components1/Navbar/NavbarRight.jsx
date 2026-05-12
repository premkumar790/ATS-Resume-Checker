const NavbarRight = ({ mobile }) => {
  return (
    <div className={mobile ? "nav-actions mobile" : "nav-actions"}>
      <button className="login-btn">Login</button>
      <button className="signup-btn">Signup</button>
    </div>
  );
};

export default NavbarRight;