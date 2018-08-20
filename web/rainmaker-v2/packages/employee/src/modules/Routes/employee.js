import Login from "modules/employee/User/Login";
import OTP from "modules/employee/User/OTP";
import ChangePassword from "modules/employee/User/ChangePassword";
import Profile from "modules/employee/User/Profile";
// import LanguageSelection from "modules/employee/User/LanguageSelection";
// import ForgotPassword from "modules/employee/User/ForgotPassword";

//Common components in egov-ui-kit
import { TrackLocation } from "modules/common";
import { ReOpenComplaint } from "modules/common";
import { ReopenAcknowledgement } from "modules/common";
import { ImageModalDisplay } from "modules/common";
import { PrivacyPolicy } from "modules/common";

//Employee components in egov-ui-kit
import MDMS from "modules/common/MDMS";
import Home from "modules/employee/Home";
import Report from "modules/employee/reports/report";
import FormWizard from "modules/employee/PropertyTax/FormWizard";

//Employee modules path
import ptRoutes from "./pt";
import pgrRoutes from "pgr-employee/lib/Routes/pgr-routes";
// import PTHome from "modules/employee/PropertyTax/PTHome";

//Redirection Url
const redirectionUrl = "/user/login";

const routes = [
  {
    path: "user/login",
    component: Login,
    needsAuthentication: false,
    redirectionUrl: "/all-complaints",
  },
  {
    path: "user/otp",
    component: OTP,
    needsAuthentication: false,
    redirectionUrl: "/all-complaints",
  },
  {
    path: "privacy-policy",
    component: PrivacyPolicy,
    needsAuthentication: false,
    redirectionUrl: "/",
  },
  {
    path: "user/change-password",
    component: ChangePassword,
    needsAuthentication: true,
    options: { hideFooter: true, title: "CORE_COMMON_CHANGE_PASSWORD" },
  },
  {
    path: "user/profile",
    component: Profile,
    needsAuthentication: true,
    options: { hideFooter: true, title: "CS_HOME_HEADER_PROFILE" },
  },
  {
    path: "image",
    component: ImageModalDisplay,
    needsAuthentication: true,
    options: {
      hideFooter: true,
      hideTitle: true,
      hideHeader: true,
    },
  },
  {
    path: "mdms/:moduleName/:masterName",
    component: MDMS,
    needsAuthentication: true,
    options: {
      title: "CS_HEADER_MDMS_COMMON",
      hideFooter: true,
      redirectionUrl,
    },
  },
  {
    path: "",
    component: Home,
    needsAuthentication: true,
    options: {
      title: "HOME",
      hideFooter: false,
      redirectionUrl,
      //isHomeScreen: true,
    },
  },
  {
    path: "map",
    component: TrackLocation,
    needsAuthentication: true,
    options: { hideHeader: true, hideFooter: true, title: "CS_HEADER_TRACK_LOCATION", hideTitle: true, hideActionMenu: true },
  },
  {
    path: "reopen-complaint/:serviceRequestId?",
    component: ReOpenComplaint,
    needsAuthentication: true,
    options: {
      title: "CS_HEADER_REOPEN_COMPLAINT",
      titleBackground: true, // Use this if you need white background for title in web version
    },
  },
  {
    path: "reopen-acknowledgement",
    component: ReopenAcknowledgement,
    needsAuthentication: true,
    options: {
      hideFooter: true,
      hideBackButton: true,
      title: "CS_COMMON_COMPLAINT_REOPENED",
      hideTitle: true,
    },
  },
  {
    path: "report/:moduleName/:reportName",
    component: Report,
    needsAuthentication: true,

    options: {
      hideFooter: true,
      title: "PGR REPORTS",
      hideTitle: true,
      redirectionUrl,
    },
  },
  ...ptRoutes,
  ...pgrRoutes,
];

export default routes;
