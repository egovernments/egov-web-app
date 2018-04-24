import React from "react";
import { Route } from "react-router-dom";
import withAuthorization from "hocs/withAuthorization";

// Employee
import RequestReAssign from "modules/employee/RequestReAssign";
import AllComplaints from "modules/employee/AllComplaints";
import ComplaintResolved from "modules/employee/ComplaintResolved";
import ComplaintSummary from "modules/employee/ComplaintDetails";
import EmpUser from "modules/employee/User";
import AssignComplaint from "modules/employee/AssignComplaint";
import EmployeeDirectory from "modules/employee/EmployeeDirectory";
import ClosedComplaints from "modules/employee/ClosedComplaints";
import RejectComplaint from "modules/employee/RejectComplaint";

//Employee static screens
import ComplaintRejected from "modules/employee/ComplaintRejected";
import ComplaintAssigned from "modules/employee/ComplaintAssigned";
import ResolveSuccess from "modules/employee/ResolveSuccess";
import ReassignSuccess from "modules/employee/ReassignSuccess";

import User from "./User";

//Redirection Url
const redirectionUrl = "/employee/user/login";

const Employee = ({ match }) => {
  return (
    <div>
      <Route path={`${match.url}/user/`} component={User} />
      {/* Employee routes */}
      <Route
        exact
        path={`${match.url}/all-complaints`}
        component={withAuthorization(AllComplaints, {
          hideFooter: true,
          title: "ES_ALL_COMPLAINTS_HEADER",
          redirectionUrl,
        })}
      />
      <Route
        exact
        path={`${match.url}/request-reassign/:serviceRequestId?`}
        component={withAuthorization(RequestReAssign, {
          hideFooter: true,
          title: "CS_HEADER_REQUEST_REASSIGN",
          redirectionUrl,
        })}
      />
      <Route
        exact
        path={`${match.url}/complaint-resolved/:serviceRequestId?`}
        component={withAuthorization(ComplaintResolved, {
          hideFooter: true,
          title: "CS_COMPLAINT_DETAILS_RESOLUTION_EVIDENCE",
          redirectionUrl,
        })}
      />
      <Route
        exact
        path={`${match.url}/complaint-details/:serviceRequestId`}
        component={withAuthorization(ComplaintSummary, {
          hideFooter: true,
          title: "CS_HEADER_COMPLAINT_SUMMARY",
          redirectionUrl,
        })}
      />

      <Route
        exact
        path={`${match.url}/closed-complaints`}
        component={withAuthorization(ClosedComplaints, {
          hideFooter: true,
          title: "ES_CLOSED_COMPLAINTS_HEADER",
          redirectionUrl,
        })}
      />
      <Route
        exact
        path={`${match.url}/complaint-reassigned/:serviceRequestId?`}
        component={withAuthorization(ComplaintAssigned, {
          hideFooter: true,
          title: "ES_COMPLAINT_REASSIGNED_HEADER",
          redirectionUrl,
        })}
      />
      <Route
        exact
        path={`${match.url}/resolve-success`}
        component={withAuthorization(ResolveSuccess, {
          hideFooter: true,
          title: "CS_COMPLAINT_DETAILS_COMPLAINT_RESOLVED",
          redirectionUrl,
        })}
      />
      <Route
        exact
        path={`${match.url}/reassign-success`}
        component={withAuthorization(ReassignSuccess, {
          hideFooter: true,
          title: "CS_COMMON_RE-ASSIGN REQUESTED",
          redirectionUrl,
        })}
      />
      <Route
        exact
        path={`${match.url}/complaint-assigned/:serviceRequestId?`}
        component={withAuthorization(ComplaintAssigned, {
          hideFooter: true,
          title: "ES_COMPLAINT_ASSIGNED_HEADER",
          redirectionUrl,
        })}
      />
      <Route
        exact
        path={`${match.url}/complaint-rejected`}
        component={withAuthorization(ComplaintRejected, {
          title: "ES_COMPLAINT_REJECTED_HEADER",
          hideFooter: true,
          redirectionUrl,
        })}
      />
      <Route
        exact
        path={`${match.url}/assign-complaint/:serviceRequestId?`}
        component={withAuthorization(AssignComplaint, {
          title: "ES_ASSIGN_TO_EMPLOYEE_HEADER",
          hideFooter: true,
          redirectionUrl,
        })}
      />
      <Route
        exact
        path={`${match.url}/reassign-complaint/:serviceRequestId?`}
        component={withAuthorization(AssignComplaint, {
          title: "ES_REASSIGN_TO_EMPLOYEE_HEADER",
          hideFooter: true,
          redirectionUrl,
        })}
      />
      <Route
        exact
        path={`${match.url}/employee-directory`}
        component={withAuthorization(EmployeeDirectory, {
          title: "ES_EMPLOYEE_DIRECTORY_HEADER",
          hideFooter: true,
          redirectionUrl,
        })}
      />
      <Route
        exact
        path={`${match.url}/reject-complaint/:serviceRequestId?`}
        component={withAuthorization(RejectComplaint, {
          title: "ES_REASON_TO_REJECT_HEADER",
          hideFooter: true,
          redirectionUrl,
        })}
      />
    </div>
  );
};

export default Employee;
