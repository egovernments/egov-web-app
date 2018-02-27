import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./screens/Home";
import MyComplaints from "./screens/MyComplaints";
import ComplaintDetails from "./screens/ComplaintDetails";
import Login from "./screens/User/Login";
import OTP from "./screens/User/OTP";

const Main = () => {
  return (
    <main>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/my-complaints" component={MyComplaints} />
        <Route exact path="/complaint-details" component={ComplaintDetails} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/otp" component={OTP} />
      </Switch>
    </main>
  );
};

export default Main;
