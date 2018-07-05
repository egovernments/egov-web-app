import React from "react";
import { Route, Switch,Redirect } from "react-router-dom";
import Employee from "modules/employee";
import { ImageModalDisplay } from "modules/common";

const Main = ({ routes }) => {
  return (
    <main>
      <Switch>
        <Route
          path={`/`}
          render={(props) => {
            return <Employee match={props.match} routes={routes.employee} />;
          }}
        />
        <Route path={`/image`} component={ImageModalDisplay} />
        <Redirect from="/" to="/user/language-selection" />
      </Switch>
    </main>
  );
};

export default Main;
