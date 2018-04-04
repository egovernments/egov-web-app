import React from "react";
import { connect } from "react-redux";
import { setRoute } from "redux/app/actions";
import { Image, Icon } from "components";
import logo from "assets/images/logo.png";
import "./index.css";

const Banner = ({ children, setRoute, previousRoute = "", className = "" }) => {
  return (
    <div>
      <div className={`${className} user-screens-wrapper`}>
        <div className="row">
          {previousRoute.length ? (
            <Icon onClick={() => setRoute(previousRoute)} className="banner-back-button" action="navigation" name="arrow-back" />
          ) : (
            ""
          )}
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

const mapStateToProps = (state) => {
  const { previousRoute } = state.app;
  return { previousRoute };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setRoute: (route) => dispatch(setRoute(route)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Banner);
