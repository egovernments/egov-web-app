import React from "react";
import { Image } from "../../../../components";
import logoMuncipal from "../../../../assets/images/PB logo.png";
import "./index.css";

const Banner = ({ children, className = "" }) => {
  return (
    <div className={`${className} home-screen-wrapper user-screens-wrapper col-xs-12`}>
      <div className="row">
        <div className="imageContainer" />
        <div className="logo-container">
          <Image className="logo" circular={true} source={`${logoMuncipal}`} />
        </div>
        {children}
      </div>
    </div>
  );
};

export default Banner;
