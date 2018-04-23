import React from "react";
import { Route, Switch } from "react-router-dom";
import withAuthorization from "hocs/withAuthorization";
import Label from "utils/translationNode";

// Home page
import Home from "modules/citizen/Home";

// complaint related routes
import MyComplaints from "modules/citizen/MyComplaints";
import ComplaintDetails from "modules/citizen/ComplaintDetails";
import ComplaintSubmited from "modules/citizen/ComplaintSubmited";
import TrackLocation from "modules/common/TrackLocation";
import Feedback from "modules/citizen/Feedback";
import ReOpenComplaint from "modules/citizen/ReOpenComplaint";
import ComplaintType from "modules/citizen/ComplaintType";
import AddComplaint from "modules/citizen/AddComplaint";
import FeedbackAcknowledge from "modules/citizen/FeedbackAcknowledgement";
import ReopenAcknowledgement from "modules/citizen/ReopenAcknowledgement";

// static pages
import HowItWorks from "modules/citizen/HowItWorks";
import ContactUs from "modules/citizen/ContactUs";

// user related screens
import Citizen from "modules/citizen/User";

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

//Redirection Url
const citizenRedirectionUrl = "/citizen/user/login";
const employeeRedirectionUrl = "/employee/user/login";

const Main = () => {
  return (
    <main>
      <Switch>
        <Route path="/citizen/user" component={Citizen} />
        <Route exact path="/citizen/" component={withAuthorization(Home, { title: "CS_HOME_HEADER_HOME" })} />
        <Route exact path="/citizen/contact-us" component={withAuthorization(ContactUs, { title: "CS_HOME_HEADER_CONTACT_US", hideFooter: true })} />
        <Route exact path="/citizen/my-complaints" component={withAuthorization(MyComplaints, { title: "CS_HOME_MY_COMPLAINTS" })} />
        <Route
          exact
          path="/citizen/complaint-details/:serviceRequestId?"
          component={withAuthorization(ComplaintDetails, { title: "CS_HEADER_COMPLAINT_SUMMARY" })}
        />
        <Route
          exact
          path="/citizen/map"
          component={withAuthorization(TrackLocation, { hideHeader: true, hideFooter: true, title: "CS_HEADER_TRACK_LOCATION" })}
        />
        <Route
          exact
          path="/citizen/complaint-submitted"
          component={withAuthorization(ComplaintSubmited, { hideFooter: true, title: "CS_HEADER_COMPLAINT_SUBMITTED" })}
        />
        <Route
          exact
          path="/citizen/reopen-complaint/:serviceRequestId?"
          component={withAuthorization(ReOpenComplaint, { title: "CS_HEADER_REOPEN_COMPLAINT" })}
        />
        <Route exact path="/citizen/feedback/:serviceRequestId?" component={withAuthorization(Feedback, { title: "CS_HEADER_FEEDBACK" })} />
        <Route
          exact
          path="/citizen/feedback-acknowledgement"
          component={withAuthorization(FeedbackAcknowledge, { hideFooter: true, title: "CS_HOME_MY_COMPLAINTS" })}
        />
        <Route
          exact
          path="/citizen/complaint-type"
          component={withAuthorization(ComplaintType, { hideFooter: true, title: "CS_ADDCOMPLAINT_COMPLAINT_TYPE" })}
        />
        <Route
          exact
          path="/citizen/how-it-works"
          component={withAuthorization(HowItWorks, { hideFooter: true, title: "CS_HOME_HEADER_HOW_IT_WORKS" })}
        />
        <Route
          exact
          path="/citizen/add-complaint"
          component={withAuthorization(AddComplaint, { hideFooter: true, title: "CS_ADD_COMPLAINT_COMPLAINT_SUBMISSION" })}
        />
        {/* Employee routes */}
        <Route
          exact
          path="/employee/all-complaints"
          component={withAuthorization(AllComplaints, {
            hideFooter: true,
            title: "ES_ALL_COMPLAINTS_HEADER",
            redirectionUrl: employeeRedirectionUrl,
          })}
        />
        <Route
          exact
          path="/employee/request-reassign/:serviceRequestId?"
          component={withAuthorization(RequestReAssign, {
            hideFooter: true,
            title: "CS_HEADER_REQUEST_REASSIGN",
            redirectionUrl: employeeRedirectionUrl,
          })}
        />
        <Route
          exact
          path="/employee/complaint-resolved/:serviceRequestId?"
          component={withAuthorization(ComplaintResolved, {
            hideFooter: true,
            title: "CS_COMPLAINT_DETAILS_RESOLUTION_EVIDENCE",
            redirectionUrl: employeeRedirectionUrl,
          })}
        />
        <Route
          exact
          path="/employee/complaint-details/:serviceRequestId"
          component={withAuthorization(ComplaintSummary, {
            hideFooter: true,
            title: "CS_HEADER_COMPLAINT_SUMMARY",
            redirectionUrl: employeeRedirectionUrl,
          })}
        />

        <Route path="/employee/user" component={EmpUser} />
        <Route
          exact
          path="/employee/closed-complaints"
          component={withAuthorization(ClosedComplaints, {
            hideFooter: true,
            title: "ES_CLOSED_COMPLAINTS_HEADER",
            redirectionUrl: employeeRedirectionUrl,
          })}
        />
        <Route
          exact
          path="/employee/complaint-reassigned/:serviceRequestId?"
          component={withAuthorization(ComplaintAssigned, {
            hideFooter: true,
            title: "ES_COMPLAINT_REASSIGNED_HEADER",
            redirectionUrl: employeeRedirectionUrl,
          })}
        />
        <Route
          exact
          path="/employee/resolve-success"
          component={withAuthorization(ResolveSuccess, {
            hideFooter: true,
            title: "CS_COMPLAINT_DETAILS_COMPLAINT_RESOLVED",
            redirectionUrl: employeeRedirectionUrl,
          })}
        />
        <Route
          exact
          path="/employee/reassign-success"
          component={withAuthorization(ReassignSuccess, {
            hideFooter: true,
            title: "CS_COMMON_RE-ASSIGN REQUESTED",
            redirectionUrl: employeeRedirectionUrl,
          })}
        />
        <Route
          exact
          path="/employee/complaint-assigned/:serviceRequestId?"
          component={withAuthorization(ComplaintAssigned, {
            hideFooter: true,
            title: "ES_COMPLAINT_ASSIGNED_HEADER",
            redirectionUrl: employeeRedirectionUrl,
          })}
        />
        <Route
          exact
          path="/employee/complaint-rejected"
          component={withAuthorization(ComplaintRejected, {
            title: "ES_COMPLAINT_REJECTED_HEADER",
            hideFooter: true,
            redirectionUrl: employeeRedirectionUrl,
          })}
        />
        <Route
          exact
          path="/employee/assign-complaint/:serviceRequestId?"
          component={withAuthorization(AssignComplaint, {
            title: "ES_ASSIGN_TO_EMPLOYEE_HEADER",
            hideFooter: true,
            redirectionUrl: employeeRedirectionUrl,
          })}
        />
        <Route
          exact
          path="/employee/reassign-complaint/:serviceRequestId?"
          component={withAuthorization(AssignComplaint, {
            title: "ES_REASSIGN_TO_EMPLOYEE_HEADER",
            hideFooter: true,
            redirectionUrl: employeeRedirectionUrl,
          })}
        />
        <Route
          exact
          path="/employee/employee-directory"
          component={withAuthorization(EmployeeDirectory, {
            title: "ES_EMPLOYEE_DIRECTORY_HEADER",
            hideFooter: true,
            redirectionUrl: employeeRedirectionUrl,
          })}
        />
        <Route
          exact
          path="/employee/reject-complaint/:serviceRequestId?"
          component={withAuthorization(RejectComplaint, {
            title: "ES_REASON_TO_REJECT_HEADER",
            hideFooter: true,
            redirectionUrl: employeeRedirectionUrl,
          })}
        />
        <Route
          exact
          path="/citizen/reopen-acknowledgement"
          component={withAuthorization(ReopenAcknowledgement, {
            hideFooter: true,
            title: "CS_HOME_MY_COMPLAINTS",
            redirectionUrl: employeeRedirectionUrl,
          })}
        />
      </Switch>
    </main>
  );
};

export default Main;
