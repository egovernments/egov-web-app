import React from "react";
import Loadable from "react-loadable";
import LinearProgress from "egov-ui-framework//ui-atoms/LinearSpinner";

const Loading = () => <LinearProgress />;
const TestMolecules = Loadable({
  loader: () => import("./TestMolecules"),
  loading: () => <Loading />,
});
const Footer = Loadable({
  loader: () => import("./Footer"),
  loading: () => <Loading />,
});

const ActionDialog = Loadable({
  loader: () => import("./ActionDialog"),
  loading: () => <Loading />,
});

export { TestMolecules, Footer, ActionDialog };
