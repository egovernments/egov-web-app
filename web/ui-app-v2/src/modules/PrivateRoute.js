import React, { Component } from "react";
import { connect } from "react-redux";
import { LoadingIndicator } from "../components";
import PropTypes from "prop-types";
import { Redirect, Route } from "react-router-dom";
import App from "./App";

class PrivateRoute extends Component {
  static propTypes = {
    component: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
    authenticated: PropTypes.bool,
    authenticating: PropTypes.bool,
    authenticationFailed: PropTypes.bool,
  };

  render() {
    const { component: Component, authenticating, authenticated, authenticationFailed, ...rest } = this.props;
    return (
      <Route
        {...rest}
        render={(props) =>
          authenticated ? (
            <App Component={Component} {...{ ...props, ...rest }} />
          ) : authenticating ? (
            <LoadingIndicator loading={true} />
          ) : (
            <Redirect to="/citizen/user/register" />
          )
        }
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { authenticated, authenticating, authenticationFailed } = state.auth;
  return { authenticated, authenticating, authenticationFailed };
};

export default connect(mapStateToProps, null)(PrivateRoute);
