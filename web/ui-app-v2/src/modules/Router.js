import React from "react";
import { Route, Switch } from "react-router-dom";
import withAuthorization from "hocs/withAuthorization";
import Label from "utils/translationNode";

import Citizen from "modules/citizen";
import Employee from "modules/employee";

const Main = () => {
  return (
    <main>
      <Switch>
        <Route path={`/citizen/`} component={Citizen} />
        <Route path={`/employee/`} component={Employee} />
      </Switch>
    </main>
  );
};

export default Main;
