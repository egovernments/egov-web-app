// user routes
import Register from "modules/citizen/User/Register";
import Login from "modules/citizen/User/Login";
import OTP from "modules/citizen/User/OTP";
//import LanguageSelection from "modules/citizen/User/LanguageSelection";
import Profile from "modules/citizen/User/Profile";

// common screens
import Home from "modules/citizen/Home";
import HowItWorks from "modules/citizen/HowItWorks";
import ContactUs from "modules/citizen/ContactUs";
import { ImageModalDisplay } from "modules/common";

// pgr specific screens
import MyComplaints from "modules/citizen/pgr/MyComplaints";
import ComplaintDetails from "modules/citizen/pgr/ComplaintDetails";
import ComplaintCreated from "modules/citizen/pgr/ComplaintCreated";
import { TrackLocation } from "modules/common";
import Feedback from "modules/citizen/pgr/Feedback";
import { ReOpenComplaint } from "modules/common";
import { ComplaintType } from "modules/common";
import AddComplaint from "modules/citizen/pgr/AddComplaint";
import FeedbackAcknowledge from "modules/citizen/pgr/FeedbackAcknowledgement";
import { ReopenAcknowledgement } from "modules/common";
import asyncComponent from "./asyncComponent";
import ptRoutes from "./pt";
import { PrivacyPolicy } from "modules/common";

const routes = [
  {
    path: "user/register",
    component: Register,
    needsAuthentication: false,
    redirectionUrl: "/",
  },
  {
    path: "user/login",
    component: Login,
    needsAuthentication: false,
    redirectionUrl: "/",
  },
  {
    path: "user/otp",
    component: OTP,
    needsAuthentication: false,
    redirectionUrl: "/",
  },

  {
    path: "privacy-policy",
    component: PrivacyPolicy,
    needsAuthentication: false,
    redirectionUrl: "/",
  },

  // {
  //   path: "user/language-selection",
  //   component: LanguageSelection,
  //   needsAuthentication: false,
  //   redirectionUrl: "/",
  // },
  {
    path: "user/profile",
    component: Profile,
    needsAuthentication: true,
    options: { hideFooter: true, title: "Edit Profile" },
  },
  {
    path: "/",
    component: Home,
    needsAuthentication: true,
    options: { isHomeScreen: true, title: "Home", hideTitle: true,redirectionUrl: "/user/register" },
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

  // {
  //   path: "events",
  //   component: Events,
  //   needsAuthentication: true,
  //   options: { hideFooter: true, title: "Events" },
  // },

  // {
  //   path: "notifications",
  //   component: Notifications,
  //   needsAuthentication: true,
  //   options: { hideFooter: true, title: "Notifications" },
  // },
  // {
  //   path: "police-stations",
  //   component: PoliceStations,
  //   needsAuthentication: true,
  //   options: { hideFooter: true, title: "Police Stations" },
  // },
  // {
  //   path: "payments",
  //   component: Payments,
  //   needsAuthentication: true,
  //   options: { hideFooter: true, title: "Payments" },
  // },
  {
    path: "my-complaints",
    component: MyComplaints,
    needsAuthentication: true,
    options: { title: "CS_HOME_MY_COMPLAINTS" },
  },
  {
    path: "contact-us",
    component: ContactUs,
    needsAuthentication: true,
    options: { title: "CS_HOME_HEADER_CONTACT_US", hideFooter: true },
  },
  {
    path: "complaint-details/:serviceRequestId?",
    component: ComplaintDetails,
    needsAuthentication: true,
    options: { hideFooter: true, title: "CS_HEADER_COMPLAINT_SUMMARY" },
  },
  {
    path: "map",
    component: TrackLocation,
    needsAuthentication: true,
    options: { hideHeader: true, hideFooter: true, title: "CS_HEADER_TRACK_LOCATION", hideTitle: true, hideActionMenu: true },
  },
  // {
  //   path: "complaint-submitted",
  //   component: ComplaintSubmited,
  //   needsAuthentication: true,
  //   options: {
  //     hideFooter: true,
  //     title: "CS_HEADER_COMPLAINT_SUBMITTED",
  //     hideTitle: true,
  //     hideBackButton: true,
  //   },
  // },
  {
    path: "complaint-submitted",
    component: ComplaintCreated,
    needsAuthentication: true,
    options: {
      hideFooter: true,
      title: "CS_HEADER_COMPLAINT_SUBMITTED",
      hideTitle: true,
      hideBackButton: true,
    },
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
    path: "feedback/:serviceRequestId?",
    component: Feedback,
    needsAuthentication: true,
    options: {
      title: "CS_HEADER_FEEDBACK",
      titleBackground: true, // Use this if you need white background for title in web version
    },
  },
  {
    path: "feedback-acknowledgement",
    component: FeedbackAcknowledge,
    needsAuthentication: true,
    options: { hideFooter: true, hideBackButton: true, title: "CS_HEADER_FEEDBACK_ACKNOWLEDGEMENT", hideTitle: true },
  },
  {
    path: "complaint-type",
    component: ComplaintType,
    needsAuthentication: true,
    options: { hideFooter: true, title: "CS_ADDCOMPLAINT_COMPLAINT_TYPE", hideTitle: true },
  },
  {
    path: "how-it-works",
    component: HowItWorks,
    needsAuthentication: true,
    options: {
      hideFooter: true,
      title: "CS_HOME_HEADER_HOW_IT_WORKS",
      titleBackground: true, // Use this if you need white background for title in web version
    },
  },
  {
    path: "add-complaint",
    component: AddComplaint,
    needsAuthentication: true,
    options: { hideFooter: true, title: "CS_ADD_COMPLAINT_COMPLAINT_SUBMISSION" },
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
  ...ptRoutes,
];

export default routes;
