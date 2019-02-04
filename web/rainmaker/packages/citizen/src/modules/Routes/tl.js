import React from "react";
import Loadable from "react-loadable";
import ScreenInterface from "../../ui-views/ScreenInterface";
const Loading = () => <div />;

// const ScreenInterface = Loadable({
//   loader: () => import("../../ui-views/ScreenInterface"),
//   loading: Loading,
// });

const routes = [
  // property tax routes
  {
    path: ":path/:screenKey",
    component: ScreenInterface,
    needsAuthentication: true,
    options: {
      title: "",
      hideFooter: true,
      hideTitle: true,
      hideBackButton: true,
      isHomeScreen: true,
    },
  },
];

export default routes;
