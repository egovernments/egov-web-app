import React from "react";
import Loadable from "react-loadable";
import LinearProgress from "../ui-atoms/LinearSpinner";
const Loading = () => <LinearProgress />;

const LabelContainer = Loadable({
  loader: () => import("./LabelContainer"),
  loading: () => <Loading />
});

const TextFieldContainer = Loadable({
  loader: () => import("./TextFieldContainer"),
  loading: () => <Loading />
});

const MultiItem = Loadable({
  loader: () => import("./MultiItem"),
  loading: () => <Loading />
});


const SnackbarContainer = Loadable({
  loader: () => import("./SnackbarContainer"),
  loading: () => <Loading />
});

const CustomTabContainer = Loadable({
  loader: () => import("./CustomTabContainer"),
  loading: () => <Loading />
});

export { TextFieldContainer, LabelContainer, MultiItem, SnackbarContainer,CustomTabContainer };

