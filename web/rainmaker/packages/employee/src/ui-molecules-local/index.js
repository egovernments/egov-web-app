import React from "react";
import Loadable from "react-loadable";
import LinearProgress from "mihy-ui-framework//ui-atoms/LinearSpinner";

const Loading = () => <LinearProgress />;
const TestMolecules = Loadable({
  loader: () => import("./TestMolecules"),
  loading: () => <Loading />
});
const RadioButtonsGroup = Loadable({
  loader: () => import("./RadioGroup"),
  loading: () => <Loading />
});

const Table = Loadable({
  loader: () => import("./Table"),
  loading: () => <Loading />
});

const Tooltip = Loadable({
  loader: () => import("./Tooltip"),
  loading: () => <Loading />
});

const CustomTab = Loadable({
  loader: () => import("./CustomTab"),
  loading: () => <Loading />
});

const UploadMultipleFiles = Loadable({
  loader: () => import("./UploadMultipleFiles"),
  loading: () => <Loading />
});

const UploadSingleFile = Loadable({
  loader: () => import("./UploadSingleFile"),
  loading: () => <Loading />
});

const DocumentList = Loadable({
  loader: () => import("./DocumentList"),
  loading: () => <Loading />
});

const AutoSelector = Loadable({
  loader: () => import("./AutoSelector"),
  loading: () => <Loading />
});

const MapLocator = Loadable({
  loader: () => import("./MapLocator"),
  loading: () => <Loading />
});

const FeesEstimateCard = Loadable({
  loader: () => import("./FeesEstimateCard"),
  loading: () => <Loading />
});

export {
  TestMolecules,
  Table,
  RadioButtonsGroup,
  Tooltip,
  CustomTab,
  UploadMultipleFiles,
  UploadSingleFile,
  DocumentList,
  AutoSelector,
  MapLocator,
  FeesEstimateCard
};
