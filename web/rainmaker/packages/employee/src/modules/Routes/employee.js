import Login from "modules/employee/User/Login";
import OTP from "modules/employee/User/OTP";
// import LanguageSelection from "modules/employee/User/LanguageSelection";
import ChangePassword from "modules/employee/User/ChangePassword";
// import ForgotPassword from "modules/employee/User/ForgotPassword";
import Profile from "modules/employee/User/Profile";
import { TrackLocation } from "modules/common";
import { ReOpenComplaint } from "modules/common";
import { ReopenAcknowledgement } from "modules/common";
import { ImageModalDisplay } from "modules/common";
import { PrivacyPolicy } from "modules/common";
import LandingPage from "modules/employee/LandingPage";
// Employee
import RequestReAssign from "modules/employee/pgr/RequestReAssign";
import AllComplaints from "modules/employee/pgr/AllComplaints";
import ComplaintResolved from "modules/employee/pgr/ComplaintResolved";
import ComplaintCreated from "modules/employee/pgr/ComplaintCreated";
import ComplaintSummary from "modules/employee/pgr/ComplaintDetails";
import AssignComplaint from "modules/employee/pgr/AssignComplaint";
import EmployeeDirectory from "modules/employee/pgr/EmployeeDirectory";
import ClosedComplaints from "modules/employee/pgr/ClosedComplaints";
import RejectComplaint from "modules/employee/pgr/RejectComplaint";
import ComplaintRejected from "modules/employee/pgr/ComplaintRejected";
import ComplaintAssigned from "modules/employee/pgr/ComplaintAssigned";
import ResolveSuccess from "modules/employee/pgr/ResolveSuccess";
import ReassignSuccess from "modules/employee/pgr/ReassignSuccess";
import CreateComplaint from "modules/employee/pgr/CreateComplaint";
import CreateEmployee from "modules/employee/pgr/CreateEmployee";
import MDMS from "modules/common/MDMS";
import Home from "modules/employee/Home";
import Report from "modules/employee/reports/report";
import ErpExpenseBill from "modules/employee/Erp/Expensebill";

//pt
import ptRoutes from "./pt";
// import PTHome from "modules/employee/PropertyTax/PTHome";

//Redirection Url
const redirectionUrl = "/user/login";

const routes = [
  {
    path: "user/login",
    component: Login,
    needsAuthentication: false,
    redirectionUrl: "/landing-page",
  },
  {
    path: "user/otp",
    component: OTP,
    needsAuthentication: false,
    redirectionUrl: "/landing-page",
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
  // {
  //   path: "all-complaints",
  //   component: AllComplaints,
  //   needsAuthentication: true,
  //   options: {
  //     hideFooter: true,
  //     title: "ES_OPEN_COMPLAINTS_HEADER",
  //     hideTitle: false,
  //     redirectionUrl,
  //     isHomeScreen: true,
  //     hideFor: "ao",
  //     customFor: "csr",
  //     customTitle: "ES_ALL_COMPLAINTS_HEADER",
  //   },
  // },
  {
    path: "all-complaints",
    component: ErpExpenseBill,
    needsAuthentication: true,
    options: {
      hideFooter: true,
     // title: "ES_OPEN_COMPLAINTS_HEADER",
      hideTitle: true,
     // redirectionUrl,
      isHomeScreen: true,
      hideFor: "ao",
      customFor: "csr",
      //customTitle: "ES_ALL_COMPLAINTS_HEADER",
    },
  },
  {
    path: "landing-page",
    component: LandingPage,
    needsAuthentication: true,
    options: {
      hideFooter: true,
      redirectionUrl,
      hideTitle: true,
      isHomeScreen: true,
    },
  },
  {
    path: "complaint-resolved/:serviceRequestId?",
    component: ComplaintResolved,
    needsAuthentication: true,
    options: {
      hideFooter: true,
      title: "CS_COMPLAINT_DETAILS_RESOLUTION_EVIDENCE",
      titleBackground: true, // Use this if you need white background for title in web version
      redirectionUrl,
    },
  },
  {
    path: "complaint-details/:serviceRequestId",
    component: ComplaintSummary,
    needsAuthentication: true,
    options: {
      hideFooter: true,
      title: "CS_HEADER_COMPLAINT_SUMMARY",
      redirectionUrl,
    },
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
    path: "closed-complaints",
    component: ClosedComplaints,
    needsAuthentication: true,
    options: {
      hideFooter: true,
      title: "ES_CLOSED_COMPLAINTS_HEADER",
      redirectionUrl,
    },
  },
  {
    path: "complaint-reassigned/:serviceRequestId?",
    component: ComplaintAssigned,
    needsAuthentication: true,
    options: {
      hideFooter: true,
      title: "ES_COMPLAINT_REASSIGNED_HEADER",
      hideTitle: true,
      redirectionUrl,
    },
  },
  {
    path: "resolve-success",
    component: ResolveSuccess,
    needsAuthentication: true,
    options: {
      hideBackButton: true,
      hideFooter: true,
      title: "CS_COMPLAINT_DETAILS_COMPLAINT_RESOLVED",
      hideTitle: true,
      redirectionUrl,
    },
  },
  {
    path: "reassign-success",
    component: ReassignSuccess,
    needsAuthentication: true,
    options: {
      hideBackButton: true,
      hideFooter: true,
      hideTitle: true,
      title: "CS_COMMON_RE-ASSIGN REQUESTED",
      redirectionUrl,
    },
  },
  {
    path: "complaint-assigned/:serviceRequestId?",
    component: ComplaintAssigned,
    needsAuthentication: true,
    options: {
      hideBackButton: true,
      hideFooter: true,
      hideTitle: true,
      title: "ES_COMPLAINT_ASSIGNED_HEADER",
      redirectionUrl,
    },
  },
  {
    path: "complaint-rejected",
    component: ComplaintRejected,
    needsAuthentication: true,
    options: {
      title: "ES_COMPLAINT_REJECTED_HEADER",
      hideTitle: true,
      hideFooter: true,
      redirectionUrl,
      hideBackButton: true,
    },
  },
  {
    path: "assign-complaint/:serviceRequestId?",
    component: AssignComplaint,
    needsAuthentication: true,
    options: {
      title: "ES_ASSIGN_TO_EMPLOYEE_HEADER",
      hideFooter: true,
      redirectionUrl,
    },
  },
  {
    path: "reassign-complaint/:serviceRequestId?",
    component: AssignComplaint,
    needsAuthentication: true,
    options: {
      title: "ES_REASSIGN_TO_EMPLOYEE_HEADER",
      hideFooter: true,
      redirectionUrl,
    },
  },
  {
    path: "employee-directory",
    component: EmployeeDirectory,
    needsAuthentication: true,
    options: {
      title: "ES_EMPLOYEE_DIRECTORY_HEADER",
      hideFooter: true,
      redirectionUrl,
    },
  },
  {
    path: "reject-complaint/:serviceRequestId?",
    component: RejectComplaint,
    needsAuthentication: true,
    options: {
      title: "ES_REASON_TO_REJECT_HEADER",
      titleBackground: true, // Use this if you need white background for title in web version
      hideFooter: true,
      redirectionUrl,
    },
  },

  {
    path: "request-reassign/:serviceRequestId?",
    component: RequestReAssign,
    needsAuthentication: true,
    options: {
      title: "CS_HEADER_REQUEST_REASSIGN",
      titleBackground: true, // Use this if you need white background for title in web version
      hideFooter: true,
      redirectionUrl,
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
    path: "create-complaint",
    component: CreateComplaint,
    needsAuthentication: true,
    options: {
      title: "CS_ADD_COMPLAINT_COMPLAINT_SUBMISSION",
      hideFooter: true,
      redirectionUrl,
      isHomeScreen: true,
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
];

export default routes;
