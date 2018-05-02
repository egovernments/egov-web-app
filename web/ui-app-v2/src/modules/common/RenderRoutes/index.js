import React from "react";
import { Route, Switch } from "react-router-dom";
import withAuthorization from "hocs/withAuthorization";
import withoutAuthorization from "hocs/withoutAuthorization";

const RenderRoutes = ({ match, routes }) => {
  return (
    <Switch>
      {routes.map((route, index) => {
        let { component: Component, path, options, redirectionUrl, needsAuthentication } = route;
        return (
          <Route
            key={index}
            exact
            path={`${match.url}/${path}`}
            render={(props) => {
              if (needsAuthentication) {
                Component = withAuthorization(options)(Component);
              } else {
                Component = withoutAuthorization(redirectionUrl)(Component);
              }
              return <Component {...props} />;
            }}
          />
        );
      })}
    </Switch>
  );
};

export default RenderRoutes;
