import React from "react";
import { Route, Switch } from "react-router-dom";
import FileUploader from "../create-job";
import UserJobs from "../jobs";

const urlParts = window.location.pathname.split("/");
const base = urlParts.slice(0, urlParts.length - 1).join("/");

const Main = () => {
  return (
    <main>
      <Switch>
        <Route path={`${base}/user-jobs`} component={UserJobs} />
        <Route exact path={`${base}/`} component={FileUploader} />
      </Switch>
    </main>
  );
};

export default Main;
