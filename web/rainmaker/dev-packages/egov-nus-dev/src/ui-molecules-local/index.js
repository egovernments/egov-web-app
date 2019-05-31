import React from "react";
import Loadable from "react-loadable";
import LinearProgress from "egov-ui-framework/ui-atoms/LinearSpinner";

const Loading = () => <LinearProgress />;
const SimpleTabs = Loadable({
  loader: () => import("./Tabs"),
  loading: () => <Loading />
});

const AboutCard = Loadable({
  loader: () => import("./About"),
  loading: () => <Loading />
});

const SimpleList = Loadable({
  loader: () => import("./List"),
  loading: () => <Loading />
});
export {
  SimpleTabs,
  AboutCard,
  SimpleList
 };
