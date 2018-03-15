import React from "react";
import { Route, Switch } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import Home from "./screens/Home";
import MyComplaints from "./screens/MyComplaints";
import ComplaintDetails from "./screens/ComplaintDetails";
import ComplaintSubmited from "./screens/ComplaintSubmited";
import Profile from "./screens/profile";
import TrackLocation from "./screens/common/TrackLocation";
import Feedback from "./screens/Feedback";
import ReOpenComplaint from "./screens/ReOpenComplaint";
import SearchComplaint from "./screens/SearchComplaint";
import LocationDetails from "./screens/LocationDetails";
import ContactUs from "./screens/ContactUs";
// user related screens
import Register from "./screens/User/Register";
import Login from "./screens/User/Login";
import OTP from "./screens/User/OTP";
import LanguageSelection from "./screens/User/LanguageSelection";
import CityPicker from "./screens/common/CityPicker";

const Main = () => {
  return (
    <main>
      <Switch>
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/otp" component={OTP} />
        <Route exact path="/language-selection" component={LanguageSelection} />
        <PrivateRoute exact path="/contact-us" component={ContactUs} />
        <PrivateRoute exact path="/" component={Home} />
        <PrivateRoute exact path="/my-complaints" component={MyComplaints} />
        <PrivateRoute exact path="/complaint-details/:status?" component={ComplaintDetails} />
        <PrivateRoute exact path="/map" component={TrackLocation} />
        <PrivateRoute exact path="/complaint-submitted" component={ComplaintSubmited} />
        <PrivateRoute exact path="/profile" component={Profile} />
        <PrivateRoute exact path="/feedback" component={Feedback} />
        <PrivateRoute exact path="/reopen-complaint" component={ReOpenComplaint} />
        <PrivateRoute exact path="/search-complaint" component={SearchComplaint} />
        <PrivateRoute exact path="/location-details" component={LocationDetails} />
      </Switch>
    </main>
  );
};

export default Main;
