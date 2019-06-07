import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Citizen from "modules/citizen";

const Main = ({ routes, hasLocalisation, defaultUrl }) => {
  return (
    <main>
      <Switch>
        <Route
          path={`/`}
          render={(props) => {
            return <Citizen match={props.match} routes={routes.citizen} />;
          }}
        />

        <Redirect from="/" to={"/user/otp?smsLink=true"} />
      </Switch>
    </main>
  );
};

export default Main;
