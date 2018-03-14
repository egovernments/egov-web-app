import React from "react";
import "./index.css";

const Banner = ({ children, className = "" }) => {
  return (
    <div className={`${className} home-screen-wrapper user-screens-wrapper col-xs-12`}>
      <div className="row">
        <div className="imageContainer" />
        {children}
      </div>
    </div>
  );
};

export default Banner;
