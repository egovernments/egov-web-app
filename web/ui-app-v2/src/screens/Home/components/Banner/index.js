import React, { Component } from "react";
import { Image } from "../../../../components";
import logoMuncipal from "../../../../assets/images/logo-muncipal.png";

import "./index.css";

class Banner extends Component {
  render() {
    return (
      <div className="banner">
        <div className="overlay" />
        <Image className="logo" circular={true} source={logoMuncipal} />
      </div>
    );
  }
}

export default Banner;
