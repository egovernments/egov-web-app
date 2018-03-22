import React from "react";
import { Route, Switch } from "react-router-dom";
import PrivateRoute from "../../../PrivateRoute";

// routes
import Register from "./Register";
import Login from "./Login";
import OTP from "./OTP";
import LanguageSelection from "./LanguageSelection";
import Profile from "./Profile";

const Citizen = () => {
  return (
    <div>
      <Route exact path="/citizen/user/register" component={Register} />
      <Route exact path="/citizen/user/login" component={Login} />
      <Route exact path="/citizen/user/otp" component={OTP} />
      <Route exact path="/citizen/user/language-selection" component={LanguageSelection} />
      <PrivateRoute exact path="/citizen/user/profile" hideBottomNavigation={true} title="Profile" component={Profile} />
    </div>
  );
};

export default Citizen;
