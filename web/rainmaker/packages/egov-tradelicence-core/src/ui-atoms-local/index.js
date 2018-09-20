import React from "react";
import Loadable from "react-loadable";
import LinearProgress from "mihy-ui-framework/ui-atoms/LinearSpinner";

const Loading = () => <LinearProgress />;
const TestAtoms = Loadable({
  loader: () => import("./TestAtoms"),
  loading: () => <Loading />
});

const ApplicationNoContainer = Loadable({
  loader: () => import("./ApplicationNo"),
  loading: () => <Loading />
});

export { TestAtoms, ApplicationNoContainer };
