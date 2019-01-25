import React from "react";
import Loadable from "react-loadable";
import LinearProgress from "egov-ui-framework//ui-atoms/LinearSpinner";

const Loading = () => <LinearProgress />;

const DocumentList = Loadable({
  loader: () => import("./DocumentList"),
  loading: () => <Loading />
});

const Footer = Loadable({
  loader: () => import("./Footer"),
  loading: () => <Loading />
});

const ActionDialog = Loadable({
  loader: () => import("./ActionDialog"),
  loading: () => <Loading />
});

const TaskDialog = Loadable({
  loader: () => import("./TaskDialog"),
  loading: () => <Loading />
});

const TaskStatusComponents = Loadable({
  loader: () => import("./TaskStatusComponents"),
  loading: () => <Loading />
});

export { DocumentList, Footer, ActionDialog, TaskDialog, TaskStatusComponents };
