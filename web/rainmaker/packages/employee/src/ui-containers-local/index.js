import React from "react";
import Loadable from "react-loadable";
import CircularProgress from "@material-ui/core/CircularProgress";

const Loading = () => <CircularProgress />;

const Iframe = Loadable({
  loader: () => import("./iframe"),
  loading: Loading,
});
const WorkFlowContainer = Loadable({
  loader: () => import("./WorkFlowContainer"),
  loading: () => <Loading />,
});
const TaskStatusContainer = Loadable({
  loader: () => import("./TaskStatusContainer"),
  loading: () => <Loading />,
});

export { Iframe, WorkFlowContainer, TaskStatusContainer };
