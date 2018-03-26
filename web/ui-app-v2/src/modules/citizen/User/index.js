import React, { Component } from "react";
import { connect } from "react-redux";
import { Route } from "react-router-dom";
import PrivateRoute from "../../PrivateRoute";

// routes
import Register from "./Register";
import Login from "./Login";
import OTP from "./OTP";
import LanguageSelection from "./LanguageSelection";
import Profile from "./Profile";

class Citizen extends Component {
  componentWillReceiveProps(nextProps) {
    const { route: nextRoute } = nextProps;
    const { route: currentRoute,history } = this.props;
    if (nextRoute && currentRoute !== nextRoute) {
      this.props.history.push(nextRoute);
    }
  }

  render() {
    const { match } = this.props;
    return (
      <div>
        <Route exact path={`${match.url}/register`} component={Register} />
        <Route exact path={`${match.url}/login`} component={Login} />
        <Route exact path={`${match.url}/otp`} component={OTP} />
        <Route exact path={`${match.url}/language-selection`} component={LanguageSelection} />
        <PrivateRoute exact path={`${match.url}/profile`} hideBottomNavigation={true} title="Profile" component={Profile} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { route } = state.app;
  return { route };
};

export default connect(mapStateToProps, null)(Citizen);
