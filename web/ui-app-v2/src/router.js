import React from "react";
import { Route, Switch } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import Home from "./screens/Home";
import MyComplaints from "./screens/MyComplaints";
import ComplaintDetails from "./screens/ComplaintDetails";
import Login from "./screens/User/Login";
import OTP from "./screens/User/OTP";
import MapDemo from "./screens/common/MapDemo";

const urlParts = window.location.pathname.split("/");
const base = urlParts.slice(0, urlParts.length - 1).join("/");

const Main = () => {
  return (
    <main>
      <Switch>
        <Route exact path={`${base}/login`} component={Login} />
        <Route exact path={`${base}/otp`} component={OTP} />
        <PrivateRoute exact path={`${base}/`} component={Home} />
        <PrivateRoute exact path={`${base}/my-complaints`} component={MyComplaints} />
        <PrivateRoute exact path={`${base}/complaint-details`} component={ComplaintDetails} />
        <Route exact path={`${base}/map`} component={MapDemo} />
      </Switch>
    </main>
  );
};

export default Main;
