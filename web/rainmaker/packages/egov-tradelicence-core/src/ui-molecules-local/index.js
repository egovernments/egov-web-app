import React from "react";
import Loadable from "react-loadable";
import LinearProgress from "mihy-ui-framework//ui-atoms/LinearSpinner";

const Loading = () => <LinearProgress />;
const TestMolecules = Loadable({
  loader: () => import("./TestMolecules"),
  loading: () => <Loading />
});

const Table = Loadable({
  loader: () => import("./Table"),
  loading: () => <Loading />
});

export {
  TestMolecules,
  Table,
}
