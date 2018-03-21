import React from "react";
import { Route, Switch } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import routes from "./config/routes";

const Main = () => {
  return (
    <main>
      <Switch>
        {routes.map((route, routeKey) => {
          if (route.isPrivate) {
            return <PrivateRoute key={routeKey} exact {...route} />;
          } else {
            return <Route exact key={routeKey} {...route} />;
          }
        })}
      </Switch>
    </main>
  );
};

export default Main;
