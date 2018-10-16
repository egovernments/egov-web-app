import React from "react";
import Loadable from 'react-loadable';

const Loading = () => <div></div>;


const ScreenInterface=Loadable({
  loader:()=>import ('../../ui-views/ScreenInterface'),
  loading:Loading
})

const routes = [
  // property tax routes
  {
    path: ":path/:screenKey",
    component: ScreenInterface,
    needsAuthentication: true,
    options: {
      title: "",
      hideFooter: true,
      hideBackButton: true,
      isHomeScreen: true,
    }
  }
]

export default routes;
