import React from "react";
import RenderRoutes from "modules/common/RenderRoutes";

// user routes
import Register from "./User/Register";
import Login from "./User/Login";
import OTP from "./User/OTP";
import LanguageSelection from "./User/LanguageSelection";
import Profile from "./User/Profile";

// common screens
import Home from "./Home";
import HowItWorks from "./HowItWorks";
import ContactUs from "./ContactUs";

// pgr specific screens
import MyComplaints from "./pgr/MyComplaints";
import ComplaintDetails from "./pgr/ComplaintDetails";
import ComplaintSubmited from "./pgr/ComplaintSubmited";
import TrackLocation from "modules/common/TrackLocation";
import Feedback from "./pgr/Feedback";
import ReOpenComplaint from "./pgr/ReOpenComplaint";
import ComplaintType from "./pgr/ComplaintType";
import AddComplaint from "./pgr/AddComplaint";
import FeedbackAcknowledge from "./pgr/FeedbackAcknowledgement";
import ReopenAcknowledgement from "./pgr/ReopenAcknowledgement";

//property tax
import PropertyTaxPaymentStepOne from "./PropertyTax/PaymentStepOne";

const routes = [
  {
    path: "user/register",
    component: Register,
    needsAuthentication: false,
    redirectionUrl: "/citizen",
  },
  {
    path: "user/login",
    component: Login,
    needsAuthentication: false,
    redirectionUrl: "/citizen",
  },
  {
    path: "user/otp",
    component: OTP,
    needsAuthentication: false,
    redirectionUrl: "/citizen",
  },
  {
    path: "user/language-selection",
    component: LanguageSelection,
    needsAuthentication: false,
    redirectionUrl: "/citizen",
  },
  {
    path: "user/profile",
    component: Profile,
    needsAuthentication: true,
    options: { hideFooter: true, title: "Edit Profile" },
  },
  {
    path: "",
    component: Home,
    needsAuthentication: true,
    options: { title: "CS_HOME_HEADER_HOME", hideHeader: true, isHomeScreen: true },
  },
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
    options: { hideHeader: true, hideFooter: true, title: "CS_HEADER_TRACK_LOCATION" },
  },
  {
    path: "complaint-submitted",
    component: ComplaintSubmited,
    needsAuthentication: true,
    options: { hideFooter: true, title: "CS_HEADER_COMPLAINT_SUBMITTED", hideBackButton: true },
  },
  {
    path: "reopen-complaint/:serviceRequestId?",
    component: ReOpenComplaint,
    needsAuthentication: true,
    options: { title: "CS_HEADER_REOPEN_COMPLAINT" },
  },
  {
    path: "feedback/:serviceRequestId?",
    component: Feedback,
    needsAuthentication: true,
    options: { title: "CS_HEADER_FEEDBACK" },
  },
  {
    path: "feedback-acknowledgement",
    component: FeedbackAcknowledge,
    needsAuthentication: true,
    options: { hideFooter: true, hideBackButton: true, title: "CS_HEADER_FEEDBACK_ACKNOWLEDGEMENT" },
  },
  {
    path: "complaint-type",
    component: ComplaintType,
    needsAuthentication: true,
    options: { hideFooter: true, title: "CS_ADDCOMPLAINT_COMPLAINT_TYPE" },
  },
  {
    path: "how-it-works",
    component: HowItWorks,
    needsAuthentication: true,
    options: { hideFooter: true, title: "CS_HOME_HEADER_HOW_IT_WORKS" },
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
    options: { hideFooter: true, hideBackButton: true, title: "CS_COMMON_COMPLAINT_REOPENED" },
  },
  //property tax routes
  {
    path: "pt-payment-step-one",
    component: PropertyTaxPaymentStepOne,
    needsAuthentication: true,
    options: {
      title: "Property Tax",
    }
  }
];

const Citizen = ({ match }) => {
  return <RenderRoutes match={match} routes={routes} />;
};

export default Citizen;
