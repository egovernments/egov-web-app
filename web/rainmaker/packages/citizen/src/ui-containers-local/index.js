import React from "react";
import Loadable from "react-loadable";
import LinearProgress from "egov-ui-framework/ui-atoms/LinearSpinner";

const Loading = () => <LinearProgress />;

const Iframe = Loadable({
  loader: () => import("./iframe"),
  loading: () => <Loading />,
});

const Home = Loadable({
  loader: () => import("./home"),
  loading: () => <Loading />,
});

export { Iframe, Home };
