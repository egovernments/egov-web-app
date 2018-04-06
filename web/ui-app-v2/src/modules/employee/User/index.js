import React from "react";
import { Route } from "react-router-dom";

// routes
import Login from "./Login";
import OTP from "./OTP";
import LanguageSelection from "./LanguageSelection";
// import ForgotPassword from "./ForgotPassword";
import Profile from "./Profile";

const Employee = ({ match }) => {
  return (
    <div>
      <Route exact path={`${match.url}/login`} component={Login} />
      <Route exact path={`${match.url}/otp`} component={OTP} />
      {/* <Route exact path={`${match.url}/forgot-password`} component={ForgotPassword} /> */}
      <Route exact path={`${match.url}/language-selection`} component={LanguageSelection} />
    </div>
  );
};

export default Employee;
