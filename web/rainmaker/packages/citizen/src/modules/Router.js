import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Citizen from "modules/citizen";

const Main = ({ routes }) => {
  return (
    <main>
      <Switch>
        <Route
          path={`/`}
          render={(props) => {
            return <Citizen match={props.match} routes={routes.citizen} />;
          }}
        />
        {/* <Route exact path={`/image`} component={ImageModalDisplay} /> */}
        <Redirect from="/" to="/user/register" />
      </Switch>
    </main>
  );
};

export default Main;
