import React from "react";
import { Route, Switch } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import Home from "./screens/Home";
import MyComplaints from "./screens/MyComplaints";
import ComplaintDetails from "./screens/ComplaintDetails";
import Login from "./screens/User/Login";
import OTP from "./screens/User/OTP";
// adddng comment back; testing only
const Main = () => {
  return (
    <main>
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/otp" component={OTP} />
        <PrivateRoute exact path="/" component={Home} />
        <PrivateRoute exact path="/my-complaints" component={MyComplaints} />
        <PrivateRoute exact path="/complaint-details" component={ComplaintDetails} />
      </Switch>
    </main>
  );
};

export default Main;
