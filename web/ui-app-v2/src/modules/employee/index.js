import React from "react";
import RenderRoutes from "modules/common/RenderRoutes";

//user routes
import Login from "./User/Login";
import OTP from "./User/OTP";
import LanguageSelection from "./User/LanguageSelection";
import ChangePassword from "./User/ChangePassword";
import ForgotPassword from "./User/ForgotPassword";
import Profile from "./User/Profile";

// Employee
import RequestReAssign from "./pgr/RequestReAssign";
import AllComplaints from "./pgr/AllComplaints";
import ComplaintResolved from "./pgr/ComplaintResolved";
import ComplaintSummary from "./pgr/ComplaintDetails";
import AssignComplaint from "./pgr/AssignComplaint";
import EmployeeDirectory from "./pgr/EmployeeDirectory";
import ClosedComplaints from "./pgr/ClosedComplaints";
import RejectComplaint from "./pgr/RejectComplaint";
import ComplaintRejected from "./pgr/ComplaintRejected";
import ComplaintAssigned from "./pgr/ComplaintAssigned";
import ResolveSuccess from "./pgr/ResolveSuccess";
import ReassignSuccess from "./pgr/ReassignSuccess";

//Redirection Url
const redirectionUrl = "/employee/user/login";

const routes = [
  {
    path: "user/login",
    component: Login,
    needsAuthentication: false,
    redirectionUrl: "/employee/all-complaints",
  },
  {
    path: "user/otp",
    component: OTP,
    needsAuthentication: false,
    redirectionUrl: "/employee/all-complaints",
  },
  {
    path: "user/language-selection",
    component: LanguageSelection,
    needsAuthentication: false,
    redirectionUrl: "/employee/all-complaints",
  },
  {
    path: "user/forgot-password",
    component: ForgotPassword,
    needsAuthentication: false,
    redirectionUrl: "/employee/all-complaints",
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
    path: "all-complaints",
    component: AllComplaints,
    needsAuthentication: true,
    options: {
      hideFooter: true,
      title: "ES_ALL_COMPLAINTS_HEADER",
      redirectionUrl,
    },
  },
  {
    path: "complaint-resolved/:serviceRequestId?",
    component: ComplaintResolved,
    needsAuthentication: true,
    options: {
      hideFooter: true,
      title: "CS_COMPLAINT_DETAILS_RESOLUTION_EVIDENCE",
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
      redirectionUrl,
    },
  },
  {
    path: "resolve-success",
    component: ResolveSuccess,
    needsAuthentication: true,
    options: {
      hideFooter: true,
      title: "CS_COMPLAINT_DETAILS_COMPLAINT_RESOLVED",
      redirectionUrl,
    },
  },
  {
    path: "reassign-success",
    component: ReassignSuccess,
    needsAuthentication: true,
    options: {
      hideFooter: true,
      title: "CS_COMMON_RE-ASSIGN REQUESTED",
      redirectionUrl,
    },
  },
  {
    path: "complaint-assigned/:serviceRequestId?",
    component: ComplaintAssigned,
    needsAuthentication: true,
    options: {
      hideFooter: true,
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
      hideFooter: true,
      redirectionUrl,
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
      hideFooter: true,
      redirectionUrl,
    },
  },
];

const Employee = ({ match }) => {
  return <RenderRoutes match={match} routes={routes} />;
};

export default Employee;
