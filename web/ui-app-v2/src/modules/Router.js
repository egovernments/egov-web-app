import React from "react";
import { Route, Switch } from "react-router-dom";
import Citizen from "modules/citizen";
import Employee from "modules/employee";
import ImageModalDisplay from "modules/common/common-components/ImageModalDisplay";

const Main = () => {
  return (
    <main>
      <Switch>
        <Route path={`/citizen/`} component={Citizen} />
        <Route path={`/employee/`} component={Employee} />
        <Route path={`/image`} component={ImageModalDisplay} />
      </Switch>
    </main>
  );
};

export default Main;
