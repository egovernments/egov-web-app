import React from "react";
import { withRouter } from "react-router";
import { Image, Icon } from "components";
import logo from "egov-ui-kit/assets/images/logo-white.png";
import "./index.css";

const backgroundImage = {
  backgroundImage: "url(assets/images/banner.png)",
};

const Banner = ({ children, history, className = "" }) => {
  return (
    <div>
      <div className={`${className} user-screens-wrapper`}>
        <div className="row">
          <Icon onClick={() => history.goBack()} className="banner-back-button" action="navigation" name="arrow-back" />
          <div style={backgroundImage} className="banner-image" />
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

export default withRouter(Banner);
