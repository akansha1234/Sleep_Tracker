import React from "react";
import { auth } from "../Config/firebase";
import { Link } from "react-router-dom";
const Navbar = () => {
  const signOut = () => {
    auth.signOut();
  };
  return (
    <div className="navbar">
      <div className="nav-items">
        <Link to="/">
          <p>Dashboard</p>
        </Link>
        <Link to="/entry">
          <p>Entry </p>
        </Link>
      </div>
      <div>
        <button onClick={signOut} className="logOut">
          {" "}
          Log out{" "}
        </button>
      </div>
    </div>
  );
};
export default Navbar;
