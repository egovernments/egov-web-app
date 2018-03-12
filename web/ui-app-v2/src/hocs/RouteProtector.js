// Dependencies
import React, { Component } from "react";
import PropTypes from "prop-types";
import { graphql } from "react-apollo";
import { withRouter } from "react-router";

// Components
import Loading from "./Loading";

// Queries
import CurrentUser from "./CurrentUser";

export default (ProtectedRoute) => {
  class AuthHOC extends Component {
    constructor(props, context) {
      super(props, context);
    }

    // Check if there is validated user logged
    isLoggedin = () => {
      return this.props.Authorization.user;
    };

    // Check if the Authorization query is loading
    isLoading = () => {
      return this.props.Authorization.loading;
    };

    render() {
      // Return a Loading component while the isLoading function is 'true'
      if (this.isLoading()) {
        return <Loading />;
      }
      // Pass the received 'props' and created functions to the ProtectedRoute component
      return <ProtectedRoute {...this.props} isLoggedin={this.isLoggedin} isLoading={this.isLoading} />;
    }
  }

  AuthHOC.contextTypes = {
    router: PropTypes.object.isRequired,
  };

  return graphql(CurrentUser, {
    name: "Authorization",
    options: { fetchPolicy: "network-only" },
  })(withRouter(AuthHOC));
};
