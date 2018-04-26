import React from "react";
import { Route, Switch,Redirect } from "react-router-dom";
import withoutAuthorization from "hocs/withoutAuthorization";
import withAuthorization from "hocs/withAuthorization";

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
      <Route
        exact
        path={`${match.url}/change-password`}
        component={withAuthorization(ChangePassword, { hideFooter: true, title: "Change Password" })}
      />
      />
      <Route exact path={`${match.url}/profile`} component={withAuthorization(Profile, { hideFooter: true, title: "Edit Profile" })} />
      <Redirect from={match.url} to={`${match.url}/login`} />
    </Switch>
  );
};

export default Employee;
