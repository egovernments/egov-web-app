// pgr employee specific screens
import RequestReAssign from "../Screens/RequestReAssign";
import AllComplaints from "../Screens/AllComplaints";
import ComplaintResolved from "../Screens/ComplaintResolved";
import ComplaintCreated from "../Screens/ComplaintCreated";
import ComplaintSummary from "../Screens/ComplaintDetails";
import AssignComplaint from "../Screens/AssignComplaint";
import EmployeeDirectory from "../Screens/EmployeeDirectory";
import ClosedComplaints from "../Screens/ClosedComplaints";
import RejectComplaint from "../Screens/RejectComplaint";
import ComplaintRejected from "../Screens/ComplaintRejected";
import ComplaintAssigned from "../Screens/ComplaintAssigned";
import ResolveSuccess from "../Screens/ResolveSuccess";
import ReassignSuccess from "../Screens/ReassignSuccess";
import CreateComplaint from "../Screens/CreateComplaint";
import SearchScreen from "../Screens/SearchScreen";
import { ReOpenComplaint, ReopenAcknowledgement } from "../modules/common";

// import CreateEmployee from "modules/employee/pgr/CreateEmployee";
const redirectionUrl = "/user/login";
const routes = [
  {
    path: "all-complaints",
    component: AllComplaints,
    needsAuthentication: true,
    options: {
      hideFooter: true,
      title: "ES_OPEN_COMPLAINTS_HEADER",
      hideTitle: false,
      redirectionUrl,
      isHomeScreen: true,
      hideFor: "ao",
      customFor: "csr",
      customTitle: "ES_ALL_COMPLAINTS_HEADER"
    }
  },
  {
    path: "search-complaint",
    component: SearchScreen,
    needsAuthentication: true,
    options: { hideFooter: true, title: "CORE_COMMON_SEARCH_COMPLAINT" }
  },
  {
    path: "complaint-resolved/:serviceRequestId?",
    component: ComplaintResolved,
    needsAuthentication: true,
    options: {
      hideFooter: true,
      title: "CS_COMPLAINT_DETAILS_RESOLUTION_EVIDENCE",
      titleBackground: true, // Use this if you need white background for title in web version
      redirectionUrl
    }
  },
  {
    path: "complaint-details/:serviceRequestId",
    component: ComplaintSummary,
    needsAuthentication: true,
    options: {
      hideFooter: true,
      title: "CS_HEADER_COMPLAINT_SUMMARY",
      redirectionUrl
    }
  },
  {
    path: "closed-complaints",
    component: ClosedComplaints,
    needsAuthentication: true,
    options: {
      hideFooter: true,
      title: "ES_CLOSED_COMPLAINTS_HEADER",
      redirectionUrl
    }
  },
  {
    path: "complaint-reassigned/:serviceRequestId?",
    component: ComplaintAssigned,
    needsAuthentication: true,
    options: {
      hideFooter: true,
      title: "ES_COMPLAINT_REASSIGNED_HEADER",
      hideTitle: true,
      redirectionUrl
    }
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
      redirectionUrl
    }
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
      redirectionUrl
    }
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
      redirectionUrl
    }
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
      hideBackButton: true
    }
  },
  {
    path: "assign-complaint/:serviceRequestId?",
    component: AssignComplaint,
    needsAuthentication: true,
    options: {
      title: "ES_ASSIGN_TO_EMPLOYEE_HEADER",
      hideFooter: true,
      redirectionUrl
    }
  },
  {
    path: "reassign-complaint/:serviceRequestId?",
    component: AssignComplaint,
    needsAuthentication: true,
    options: {
      title: "ES_REASSIGN_TO_EMPLOYEE_HEADER",
      hideFooter: true,
      redirectionUrl
    }
  },
  {
    path: "employee-directory",
    component: EmployeeDirectory,
    needsAuthentication: true,
    options: {
      title: "ES_EMPLOYEE_DIRECTORY_HEADER",
      hideFooter: true,
      redirectionUrl
    }
  },
  {
    path: "reject-complaint/:serviceRequestId?",
    component: RejectComplaint,
    needsAuthentication: true,
    options: {
      title: "ES_REASON_TO_REJECT_HEADER",
      titleBackground: true, // Use this if you need white background for title in web version
      hideFooter: true,
      redirectionUrl
    }
  },

  {
    path: "request-reassign/:serviceRequestId?",
    component: RequestReAssign,
    needsAuthentication: true,
    options: {
      title: "CS_HEADER_REQUEST_REASSIGN",
      titleBackground: true, // Use this if you need white background for title in web version
      hideFooter: true,
      redirectionUrl
    }
  },
  {
    path: "create-complaint",
    component: CreateComplaint,
    needsAuthentication: true,
    options: {
      title: "CS_ADD_COMPLAINT_COMPLAINT_SUBMISSION",
      hideFooter: true,
      redirectionUrl,
      isHomeScreen: true
    }
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
  }
  // {
  //   path: "create-employee",
  //   component: CreateEmployee,
  //   needsAuthentication: true,
  //   options: {
  //     hideFooter: true,
  //     title: "Create Employee",
  //     hideTitle: true,
  //     hideBackButton: true
  //   }
  // }
];

export default routes;
