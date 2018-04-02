import React from "react";
import { Route, Switch } from "react-router-dom";
import PrivateRoute from "modules/PrivateRoute";

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

// static pages
import HowItWorks from "modules/citizen/HowItWorks";
import ContactUs from "modules/citizen/ContactUs";

// user related screens
import Citizen from "modules/citizen/User";

// Employee
import ReAssignComplaint from "modules/employee/ReAssignComplaint";
import AllComplaints from "modules/employee/AllComplaints";
import ComplaintResolved from "modules/employee/ComplaintResolved";
import ResolveSuccess from "modules/employee/ResolveSuccess";
import ReAssignSuccess from "modules/employee/ReAssignSuccess";
import ComplaintSummary from "modules/employee/ComplaintDetails";
import EmpUser from "modules/employee/User";
import AssignComplaint from "modules/employee/AssignComplaint";

const Main = () => {
  return (
    <main>
      <Switch>
        <Route path="/citizen/user" component={Citizen} />
        <PrivateRoute exact path="/citizen/" title="Home" component={Home} />
        <PrivateRoute exact hideBottomNavigation={true} path="/citizen/contact-us" title="Contact Us" component={ContactUs} />
        <PrivateRoute exact path="/citizen/my-complaints" title="My Complaints" component={MyComplaints} />
        <PrivateRoute exact path="/citizen/complaint-details/:serviceRequestId?" title="Complaint Details" component={ComplaintDetails} />
        <PrivateRoute exact path="/citizen/map" hideBottomNavigation={true} hideAppBar={true} title="Track Location" component={TrackLocation} />
        <PrivateRoute
          exact
          path="/citizen/complaint-submitted"
          hideBottomNavigation={true}
          title="Complaint Submitted"
          component={ComplaintSubmited}
        />
        <PrivateRoute exact path="/citizen/reopen-complaint/:serviceRequestId?" title="Reopen Complaint" component={ReOpenComplaint} />
        <PrivateRoute exact path="/citizen/feedback/:serviceRequestId?" title="Feedback" component={Feedback} />
        <PrivateRoute exact hideBottomNavigation={true} path="/citizen/complaint-type" title="Complaint Type" component={ComplaintType} />
        <PrivateRoute exact hideBottomNavigation={true} path="/citizen/how-it-works" title="How it works" component={HowItWorks} />
        <PrivateRoute exact hideBottomNavigation={true} path="/citizen/add-complaint" title="Add Complaint" component={AddComplaint} />
        {/* Employee routes */}
        <PrivateRoute exact hideBottomNavigation={true} path="/employee/all-complaints" title="All Complaints" component={AllComplaints} />
        <PrivateRoute exact hideBottomNavigation={true} path="/employee/reassign-complaint" title="Request Re-Assign" component={ReAssignComplaint} />
        <PrivateRoute
          exact
          hideBottomNavigation={true}
          path="/employee/complaint-resolved"
          title="Complaint Resolved"
          component={ComplaintResolved}
        />
        <PrivateRoute
          exact
          hideBottomNavigation={true}
          path="/employee/complaint-details/:serviceRequestId?"
          title="Complaint Summary"
          component={ComplaintSummary}
        />
        <PrivateRoute exact hideBottomNavigation={true} path="/employee/resolve-success" title="Complaint Resolved" component={ResolveSuccess} />
        <PrivateRoute exact hideBottomNavigation={true} path="/employee/reassign-success" title="Re-Assign Complaint" component={ReAssignSuccess} />
        <Route path="/employee/user" component={EmpUser} />
        <PrivateRoute exact hideBottomNavigation={true} path="/employee/assign-complaint" title="Assign Complaint" component={AssignComplaint} />
      </Switch>
    </main>
  );
};

export default Main;
