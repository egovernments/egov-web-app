import React from "react";
import { Route, Switch } from "react-router-dom";
import PrivateRoute from "../../PrivateRoute";

// routes
import Login from "./Login";
import OTP from "./OTP";
import LanguageSelection from "./LanguageSelection";
import ChangePassword from "./ChangePassword";
import ForgotPassword from "./ForgotPassword";
import Profile from "./Profile";

const Employee = ({ match }) => {
  return (
    <Switch>
      <Route exact path={`${match.url}/login`} component={Login} />
      <Route exact path={`${match.url}/otp`} component={OTP} />
      <Route exact path={`${match.url}/language-selection`} component={LanguageSelection} />
      <Route exact path={`${match.url}/change-password`} component={ChangePassword} />
      <Route exact path={`${match.url}/forgot-password`} component={ForgotPassword} />
      <PrivateRoute exact path={`${match.url}/profile`} hideBottomNavigation={true} title="Edit Profile" component={Profile} />
    </Switch>
  );
};

export default Employee;
