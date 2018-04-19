import React from "react";
import { Route, Switch } from "react-router-dom";
import PrivateRoute from "modules/PrivateRoute";
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

import "assets/styles/app.css";

const Main = () => {
  return (
    <main>
      <Switch>
        <Route path="/citizen/user" component={Citizen} />
        <PrivateRoute exact path="/citizen/" title={<Label className="screenHeaderLabelStyle" label="CS_HOME_HEADER_HOME" />} component={Home} />
        <PrivateRoute
          exact
          hideBottomNavigation={true}
          path="/citizen/contact-us"
          title={<Label className="screenHeaderLabelStyle" label="CS_HOME_HEADER_CONTACT_US" />}
          component={ContactUs}
        />
        <PrivateRoute
          exact
          path="/citizen/my-complaints"
          title={<Label className="screenHeaderLabelStyle" label="CS_HOME_MY_COMPLAINTS" />}
          component={MyComplaints}
        />
        <PrivateRoute
          exact
          path="/citizen/complaint-details/:serviceRequestId?"
          title={<Label className="screenHeaderLabelStyle" label="CS_HEADER_COMPLAINT_SUMMARY" />}
          component={ComplaintDetails}
        />
        <PrivateRoute
          exact
          path="/citizen/map"
          hideBottomNavigation={true}
          hideAppBar={true}
          title={<Label className="screenHeaderLabelStyle" label="CS_HEADER_TRACK_LOCATION" />}
          component={TrackLocation}
        />
        <PrivateRoute
          exact
          path="/citizen/complaint-submitted"
          hideBottomNavigation={true}
          title={<Label className="screenHeaderLabelStyle" label="CS_HEADER_COMPLAINT_SUBMITTED" />}
          component={ComplaintSubmited}
        />
        <PrivateRoute
          exact
          path="/citizen/reopen-complaint/:serviceRequestId?"
          title={<Label className="screenHeaderLabelStyle" label="CS_HEADER_REOPEN_COMPLAINT" />}
          component={ReOpenComplaint}
        />
        <PrivateRoute
          exact
          path="/citizen/feedback/:serviceRequestId?"
          title={<Label className="screenHeaderLabelStyle" label="CS_HEADER_FEEDBACK" />}
          component={Feedback}
        />
        <PrivateRoute
          exact
          path="/citizen/feedback-acknowledgement"
          hideBottomNavigation={true}
          title={<Label className="screenHeaderLabelStyle" label="CS_HOME_MY_COMPLAINTS" />}
          component={FeedbackAcknowledge}
        />
        <PrivateRoute
          exact
          hideBottomNavigation={true}
          path="/citizen/complaint-type"
          title={<Label className="screenHeaderLabelStyle" label="CS_ADDCOMPLAINT_COMPLAINT_TYPE" />}
          component={ComplaintType}
        />
        <PrivateRoute
          exact
          hideBottomNavigation={true}
          path="/citizen/how-it-works"
          title={<Label className="screenHeaderLabelStyle" label="CS_HOME_HEADER_HOW_IT_WORKS" />}
          component={HowItWorks}
        />
        <PrivateRoute
          exact
          hideBottomNavigation={true}
          path="/citizen/add-complaint"
          title={<Label className="screenHeaderLabelStyle" label="CS_ADD_COMPLAINT_COMPLAINT_SUBMISSION" />}
          component={AddComplaint}
        />
        {/* Employee routes */}
        <PrivateRoute
          exact
          hideBottomNavigation={true}
          path="/employee/all-complaints"
          title={<Label className="screenHeaderLabelStyle" label="ES_ALL_COMPLAINTS_HEADER" />}
          component={AllComplaints}
        />
        <PrivateRoute
          exact
          hideBottomNavigation={true}
          path="/employee/request-reassign/:serviceRequestId?"
          title={<Label className="screenHeaderLabelStyle" label="CS_HEADER_REQUEST_REASSIGN" />}
          component={RequestReAssign}
        />
        <PrivateRoute
          exact
          hideBottomNavigation={true}
          path="/employee/complaint-resolved/:serviceRequestId?"
          title={<Label className="screenHeaderLabelStyle" label="CS_COMPLAINT_DETAILS_RESOLUTION_EVIDENCE" />}
          component={ComplaintResolved}
        />
        <PrivateRoute
          exact
          hideBottomNavigation={true}
          path="/employee/complaint-details/:serviceRequestId?"
          title={<Label className="screenHeaderLabelStyle" label="CS_HEADER_COMPLAINT_SUMMARY" />}
          component={ComplaintSummary}
        />

        <Route path="/employee/user" component={EmpUser} />
        <PrivateRoute
          exact
          hideBottomNavigation={true}
          path="/employee/closed-complaints"
          title={<Label className="screenHeaderLabelStyle" label="ES_CLOSED_COMPLAINTS_HEADER" />}
          component={ClosedComplaints}
        />
        {/*Employee static screens */}
        <PrivateRoute
          exact
          hideBottomNavigation={true}
          path="/employee/complaint-reassigned/:serviceRequestId?"
          title={<Label className="screenHeaderLabelStyle" label="ES_COMPLAINT_REASSIGNED_HEADER" />}
          component={ComplaintAssigned}
        />
        <PrivateRoute
          exact
          hideBottomNavigation={true}
          path="/employee/resolve-success"
          title={<Label className="screenHeaderLabelStyle" label="CS_COMPLAINT_DETAILS_COMPLAINT_RESOLVED" />}
          component={ResolveSuccess}
        />
        <PrivateRoute
          exact
          hideBottomNavigation={true}
          path="/employee/reassign-success"
          title={<Label className="screenHeaderLabelStyle" label="CS_COMMON_RE-ASSIGN REQUESTED" />}
          component={ReassignSuccess}
        />
        <PrivateRoute
          exact
          hideBottomNavigation={true}
          path="/employee/complaint-assigned/:serviceRequestId?"
          title={<Label className="screenHeaderLabelStyle" label="ES_COMPLAINT_ASSIGNED_HEADER" />}
          component={ComplaintAssigned}
        />
        <PrivateRoute
          exact
          hideBottomNavigation={true}
          path="/employee/complaint-rejected"
          title={<Label className="screenHeaderLabelStyle" label="ES_COMPLAINT_REJECTED_HEADER" />}
          component={ComplaintRejected}
        />
        {/* assijgn */}
        <PrivateRoute
          exact
          hideBottomNavigation={true}
          path="/employee/assign-complaint/:serviceRequestId?"
          title={<Label className="screenHeaderLabelStyle" label="ES_ASSIGN_TO_EMPLOYEE_HEADER" />}
          component={AssignComplaint}
        />
        <PrivateRoute
          exact
          hideBottomNavigation={true}
          path="/employee/reassign-complaint/:serviceRequestId?"
          title={<Label className="screenHeaderLabelStyle" label="ES_REASSIGN_TO_EMPLOYEE_HEADER" />}
          component={AssignComplaint}
        />

        <PrivateRoute
          exact
          hideBottomNavigation={true}
          path="/employee/employee-directory"
          title={<Label className="screenHeaderLabelStyle" label="ES_EMPLOYEE_DIRECTORY_HEADER" />}
          component={EmployeeDirectory}
        />
        <PrivateRoute
          exact
          hideBottomNavigation={true}
          path="/employee/reject-complaint/:serviceRequestId?"
          title={<Label className="screenHeaderLabelStyle" label="ES_REASON_TO_REJECT_HEADER" />}
          component={RejectComplaint}
        />
        <PrivateRoute
          exact
          path="/citizen/reopen-acknowledgement"
          hideBottomNavigation={true}
          title={<Label className="screenHeaderLabelStyle" label="CS_HOME_MY_COMPLAINTS" />}
          component={ReopenAcknowledgement}
        />
      </Switch>
    </main>
  );
};

export default Main;
