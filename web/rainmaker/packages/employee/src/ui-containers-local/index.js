import React from "react";
import Loadable from "react-loadable";
import LinearProgress from "mihy-ui-framework/ui-atoms/LinearSpinner";

const Loading = () => <LinearProgress />;

const CustomTabContainer = Loadable({
  loader: () => import("./CustomTabContainer"),
  loading: () => <Loading />
});
const LabelContainer = Loadable({
  loader: () => import("./LabelContainer"),
  loading: () => <Loading />
});
const RadioGroupContainer = Loadable({
  loader: () => import("./RadioGroupContainer"),
  loading: () => <Loading />
});
const CheckboxContainer = Loadable({
  loader: () => import("./CheckboxContainer"),
  loading: () => <Loading />
});

export {
  CustomTabContainer,
  LabelContainer,
  RadioGroupContainer,
  CheckboxContainer
};
