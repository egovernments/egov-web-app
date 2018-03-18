import React from "react";
import PropTypes from "prop-types";
import { Redirect, Route } from "react-router-dom";
import App from "./App";

const auth = {
  isAuthenticated: true, // hardcode it to true
  authenticate(cb) {
    this.isAuthenticated = true;
    setTimeout(cb, 100); // fake async
  },
  signout(cb) {
    this.isAuthenticated = false;
    setTimeout(cb, 100); // fake async
  },
};

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => (auth.isAuthenticated === true ? <App Component={Component} {...{ ...props, ...rest }} /> : <Redirect to="/login" />)}
    />
  );
};

PrivateRoute.propTypes = {
  component: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
};

export default PrivateRoute;
