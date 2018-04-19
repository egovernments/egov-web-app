import React from "react";
import { Route, Switch } from "react-router-dom";
import PrivateRoute from "modules/PrivateRoute";
import withoutAuthorization from "hocs/withoutAuthorization";
import Label from "utils/translationNode";

// routes
import Login from "./Login";
import OTP from "./OTP";
import LanguageSelection from "./LanguageSelection";
import ChangePassword from "./ChangePassword";
import ForgotPassword from "./ForgotPassword";
import Profile from "./Profile";

const redirectionUrl = "/employee/all-complaints";

const Employee = ({ match }) => {
  return (
    <Switch>
      <Route exact path={`${match.url}/login`} component={withoutAuthorization(Login, redirectionUrl)} />
      <Route exact path={`${match.url}/otp`} component={withoutAuthorization(OTP, redirectionUrl)} />
      <Route exact path={`${match.url}/language-selection`} component={withoutAuthorization(LanguageSelection, redirectionUrl)} />
      <Route exact path={`${match.url}/forgot-password`} component={withoutAuthorization(ForgotPassword, redirectionUrl)} />
      <PrivateRoute
        exact
        path={`${match.url}/change-password`}
        component={ChangePassword}
        hideBottomNavigation={true}
        title={<Label className="screenHeaderLabelStyle" label="Change Password" />}
      />
      <PrivateRoute exact path={`${match.url}/profile`} hideBottomNavigation={true} title="Edit Profile" component={Profile} />
    </Switch>
  );
};

export default Employee;
