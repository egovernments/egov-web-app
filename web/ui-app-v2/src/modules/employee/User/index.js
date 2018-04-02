import React from "react";
import { Route } from "react-router-dom";
import PrivateRoute from "../../PrivateRoute";

// routes
import Login from "./Login";
import OTP from "./OTP";
import ForgotPassword from "./ForgotPassword";
import Profile from "./Profile";

const Citizen = ({ match }) => {
  return (
    <div>
      <Route exact path={`${match.url}/login`} component={Login} />
      <Route exact path={`${match.url}/otp`} component={OTP} />
      <Route exact path={`${match.url}/forgot-password`} component={ForgotPassword} />
      {/* <PrivateRoute exact path={`${match.url}/profile`} hideBottomNavigation={true} title="Profile" component={Profile} /> */}
    </div>
  );
};

export default Citizen;
