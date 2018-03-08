import React from "react";
import { Route, Switch } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import Home from "./screens/Home";
import MyComplaints from "./screens/MyComplaints";
import ComplaintDetails from "./screens/ComplaintDetails";
import Profile from "./screens/profile";
import Login from "./screens/User/Login";
import OTP from "./screens/User/OTP";
import TrackLocation from "./screens/common/TrackLocation";
import Feedback from "./screens/Feedback";
import LanguageSelection from "./screens/LanguageSelection";
import ReOpenComplaint from "./screens/ReOpenComplaint";
import LanguageSelection from "./screens/User/LanguageSelection";
import SearchComplaint from "./screens/SearchComplaint";
// user related screens
import Login from "./screens/User/Login";
import OTP from "./screens/User/OTP";
import LanguageSelection from "./screens/User/LanguageSelection";

const Main = () => {
  return (
    <main>
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/otp" component={OTP} />
        <Route exact path="/language-selection" component={LanguageSelection} />
        <PrivateRoute exact path="/" component={Home} />
        <PrivateRoute exact path="/my-complaints" component={MyComplaints} />
        <PrivateRoute exact path="/complaint-details" component={ComplaintDetails} />
        <PrivateRoute exact path="/map" component={TrackLocation} />
        <PrivateRoute exact path="/profile" component={Profile} />
        <PrivateRoute exact path="/feedback" component={Feedback} />
        <PrivateRoute exact path="/reopen-complaint" component={ReOpenComplaint} />
        <PrivateRoute exact path="/search-complaint" component={SearchComplaint} />
      </Switch>
    </main>
  );
};

export default Main;
