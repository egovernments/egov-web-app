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

const Checkbox = Loadable({
  loader: () => import("./Checkbox"),
  loading: () => <Loading />
});

const UploadFile = Loadable({
  loader: () => import("./UploadFile"),
  loading: () => <Loading />
});

export { TestAtoms, ApplicationNoContainer, UploadFile, Checkbox };
