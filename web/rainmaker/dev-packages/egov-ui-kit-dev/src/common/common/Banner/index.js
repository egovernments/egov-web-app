import React from "react";
import { withRouter } from "react-router";
import { Icon, Image } from "components";
import logo from "egov-ui-kit/assets/images/punjab-logo.png";
import "./index.css";

const Banner = ({ children, history, className = "" }) => {
  return (
    <div>
      <div className={`${className} user-screens-wrapper`}>
        <div className="banner-image">
          <div className="banner-overlay" />
          <div className="banner-main-content">
            <Icon onClick={() => history.goBack()} className="banner-back-button" action="navigation" name="arrow-back" />
            <div className="logo-wrapper user-logo-wrapper">
              <Image className="mseva-logo" source={`${logo}`} />
            </div>
            <div className="banner-form-cont">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(Banner);
