import React from "react";
import { connect } from "react-redux";

const withAuthorization = (Component, roles, redirectionUrl) => {
  class Wrapper extends React.Component {
    componentDidMount() {
      const { authenticated } = this.props;
      if (!this.props.authenticated) {
        this.props.history.push(redirectionUrl);
      }
    }

    getCurrentUserRoles = (userInfo = {}) => {
      return (userInfo.roles || []).map((role) => role.CODE);
    };

    render() {
      return <Component {...this.props} />;
    }
  }
  const mapStateToProps = (state) => {
    const { authenticated, userInfo } = state.auth;
    return { authenticated, userInfo };
  };
  return connect(mapStateToProps)(Wrapper);
};

export default withAuthorization;
