import React from "react";
import { Route } from "react-router-dom";
import PrivateRoute from "../../PrivateRoute";

// routes
import Register from "./Register";
import Login from "./Login";
import OTP from "./OTP";
import LanguageSelection from "./LanguageSelection";
import Profile from "./Profile";

const Citizen = ({ match }) => {
  return (
    <div>
      <Route exact path={`${match.url}/register`} component={Register} />
      <Route exact path={`${match.url}/login`} component={Login} />
      <Route exact path={`${match.url}/otp`} component={OTP} />
      <Route exact path={`${match.url}/language-selection`} component={LanguageSelection} />
      {/* <PrivateRoute exact path={`${match.url}/profile`} hideBottomNavigation={true} title="Profile" component={Profile} /> */}
    </div>
  );
};

export default Citizen;
