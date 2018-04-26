import React from "react";
import { Route,Redirect } from "react-router-dom";
import withAuthorization from "hocs/withAuthorization";

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

      {/*<Redirect from={match.url} to={`${match.url}/user/`}/>*/}
    </div>
  );
};

export default Employee;
