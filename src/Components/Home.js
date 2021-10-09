import React from "react";
import Navbar from "./Navbar.js";
import { Link } from "react-router-dom";
import Lottie from "react-lottie";
import animationData from "../lotties/moon";
const Home = ({ user }) => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };

  return (
    <div className="home">
      <Navbar />
      <div className="home-desc">
        <div>
          <h1>Hello,{user.displayName}</h1>
          <h2>Track your sleep pattern</h2>
          <h2>
            <Link to="/entry">
              <button className="add-entry">Click here</button>
            </Link>{" "}
          </h2>
        </div>
        <div className="lottie">
          <Lottie options={defaultOptions} height={400} />
        </div>
      </div>
    </div>
  );
};
export default Home;
