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
import ComplaintType from "./screens/ComplaintType";
import ContactUs from "./screens/ContactUs";
import AddComplaint from "./screens/AddComplaint";
// user related screens
import Register from "./screens/User/Register";
import Login from "./screens/User/Login";
import OTP from "./screens/User/OTP";
import LanguageSelection from "./screens/User/LanguageSelection";
import HowItWorks from "./screens/HowItWorks";

const Main = () => {
  return (
    <main>
      <Switch>
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/otp" component={OTP} />
        <Route exact path="/language-selection" component={LanguageSelection} />
        <PrivateRoute exact hideBottomNavigation={true} path="/contact-us" component={ContactUs} />
        <PrivateRoute exact path="/" component={Home} />
        <PrivateRoute exact path="/my-complaints" component={MyComplaints} />
        <PrivateRoute exact path="/complaint-details/:status?" component={ComplaintDetails} />
        <PrivateRoute exact path="/map" hideAppBar={true} component={TrackLocation} />
        <PrivateRoute exact path="/complaint-submitted" component={ComplaintSubmited} />
        <PrivateRoute exact path="/profile" hideBottomNavigation={true} component={Profile} />
        <PrivateRoute exact path="/feedback" component={Feedback} />
        <PrivateRoute exact path="/reopen-complaint" component={ReOpenComplaint} />
        <PrivateRoute exact hideBottomNavigation={true} path="/complaint-type" component={ComplaintType} />
        <PrivateRoute exact path="/how-it-works" component={HowItWorks} />
        <PrivateRoute exact hideBottomNavigation={true} path="/add-complaint" component={AddComplaint} />
      </Switch>
    </main>
  );
};

export default Main;
