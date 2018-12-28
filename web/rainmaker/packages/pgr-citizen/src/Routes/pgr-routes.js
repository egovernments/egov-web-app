// user routes
import Register from "../Screens/User/Register";
import Login from "../Screens/User/Login";
import OTP from "../Screens/User/OTP";

// pgr citizen specific screens
import MyComplaints from "../Screens/MyComplaints";
import ComplaintDetails from "../Screens/ComplaintDetails";
import ComplaintCreated from "../Screens/ComplaintCreated";
import Feedback from "../Screens/Feedback";
import PGRHome from "../Screens/Home";
import AddComplaint from "../Screens/AddComplaint";
import FeedbackAcknowledge from "../Screens/FeedbackAcknowledgement";
import {
  ReOpenComplaint,
  ReopenAcknowledgement,
  ComplaintType
} from "modules/common";

const routes = [
  {
    path: "user/register",
    component: Register,
    needsAuthentication: false,
    redirectionUrl: "/"
  },
  {
    path: "user/login",
    component: Login,
    needsAuthentication: false,
    redirectionUrl: "/"
  },
  {
    path: "user/otp",
    component: OTP,
    needsAuthentication: false,
    redirectionUrl: "/"
  },
  {
    path: "my-complaints",
    component: MyComplaints,
    needsAuthentication: true,
    options: { title: "CS_HOME_MY_COMPLAINTS" }
  },
  {
    path: "complaint-details/:serviceRequestId?",
    component: ComplaintDetails,
    needsAuthentication: true,
    options: { hideFooter: true, title: "CS_HEADER_COMPLAINT_SUMMARY" }
  },
  {
    path: "complaint-submitted",
    component: ComplaintCreated,
    needsAuthentication: true,
    options: {
      hideFooter: true,
      title: "CS_HEADER_COMPLAINT_SUBMITTED",
      hideTitle: true,
      hideBackButton: true
    }
  },
  {
    path: "feedback/:serviceRequestId?",
    component: Feedback,
    needsAuthentication: true,
    options: {
      title: "CS_HEADER_FEEDBACK",
      titleBackground: true // Use this if you need white background for title in web version
    }
  },
  {
    path: "feedback-acknowledgement",
    component: FeedbackAcknowledge,
    needsAuthentication: true,
    options: {
      hideFooter: true,
      hideBackButton: true,
      title: "CS_HEADER_FEEDBACK_ACKNOWLEDGEMENT",
      hideTitle: true
    }
  },
  {
    path: "add-complaint",
    component: AddComplaint,
    needsAuthentication: true,
    options: {
      hideFooter: true,
      title: "CS_ADD_COMPLAINT_COMPLAINT_SUBMISSION"
    }
  },
  {
    path: "pgr-home",
    component: PGRHome,
    needsAuthentication: true,
    options: {
      isHomeScreen: true,
      title: "Home",
      hideTitle: true,
      redirectionUrl: "/user/register"
    }
  },
  {
    path: "reopen-complaint/:serviceRequestId?",
    component: ReOpenComplaint,
    needsAuthentication: true,
    options: {
      title: "CS_HEADER_REOPEN_COMPLAINT",
      titleBackground: true // Use this if you need white background for title in web version
    }
  },
  {
    path: "reopen-acknowledgement",
    component: ReopenAcknowledgement,
    needsAuthentication: true,
    options: {
      hideFooter: true,
      hideBackButton: true,
      title: "CS_COMMON_COMPLAINT_REOPENED",
      hideTitle: true
    }
  },
  {
    path: "complaint-type",
    component: ComplaintType,
    needsAuthentication: true,
    options: {
      hideFooter: true,
      title: "CS_ADDCOMPLAINT_COMPLAINT_TYPE",
      hideTitle: true
    }
  }
];

export default routes;
