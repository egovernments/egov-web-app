import React from "react";
import { Image } from "../../../components";
import logo from "../../../assets/images/logo.png";
import "./index.css";

const Banner = ({ children, className = "" }) => {
  return (
    <div>
      <div className={`${className} user-screens-wrapper col-xs-12 col-lg-6 col-sm-6 col-md-6 col-lg-offset-3 col-sm-offset-3 col-md-offset-3`}>
        <div className="row">
          <div className="banner-image" />
          <div className="banner-overlay" />
          <div className="logo-wrapper">
            <Image className="mseva-logo" source={`${logo}`} />
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Banner;
