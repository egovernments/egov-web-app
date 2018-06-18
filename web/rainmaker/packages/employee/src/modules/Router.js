import React from "react";
import { Route, Switch } from "react-router-dom";
import Employee from "modules/employee";
import { ImageModalDisplay } from "modules/common";

const Main = ({ routes }) => {
  return (
    <main>
      <Switch>
        <Route
          path={`/employee/`}
          render={(props) => {
            return <Employee match={props.match} routes={routes.employee} />;
          }}
        />
        <Route path={`/image`} component={ImageModalDisplay} />
      </Switch>
    </main>
  );
};

export default Main;
