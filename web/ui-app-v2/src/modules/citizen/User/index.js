import React from "react";
import { Route, Switch } from "react-router-dom";
import PrivateRoute from "modules/PrivateRoute";
import withoutAuthorization from "hocs/withoutAuthorization";

// routes
import Register from "./Register";
import Login from "./Login";
import OTP from "./OTP";
import LanguageSelection from "./LanguageSelection";
import Profile from "./Profile";

const redirectionUrl = "/citizen";

const Citizen = ({ match }) => {
  return (
    <Switch>
      <Route exact path={`${match.url}/register`} component={withoutAuthorization(Register, redirectionUrl)} />
      <Route exact path={`${match.url}/login`} component={withoutAuthorization(Login, redirectionUrl)} />
      <Route exact path={`${match.url}/otp`} component={withoutAuthorization(OTP, redirectionUrl)} />
      <Route exact path={`${match.url}/language-selection`} component={withoutAuthorization(LanguageSelection, redirectionUrl)} />
      <PrivateRoute exact path={`${match.url}/profile`} hideBottomNavigation={true} title="Edit Profile" component={Profile} />
    </Switch>
  );
};

export default Citizen;
