import React from "react";
import { Route, Switch } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";

// Home page
import Home from "./screens/citizen/Home";

// complaint related routes
import MyComplaints from "./screens/citizen/MyComplaints";
import ComplaintDetails from "./screens/citizen/ComplaintDetails";
import ComplaintSubmited from "./screens/citizen/ComplaintSubmited";
import TrackLocation from "./screens/common/TrackLocation";
import Feedback from "./screens/citizen/Feedback";
import ReOpenComplaint from "./screens/citizen/ReOpenComplaint";
import ComplaintType from "./screens/citizen/ComplaintType";
import AddComplaint from "./screens/citizen/AddComplaint";

// static pages
import HowItWorks from "./screens/citizen/HowItWorks";
import ContactUs from "./screens/citizen/ContactUs";

// user related screens
import Citizen from "./screens/citizen/User";

// Employee
import AllComplaints from "./screens/employee/AllComplaints";

const Main = () => {
  return (
    <main>
      <Switch>
        <Route path="/citizen/user" component={Citizen} />
        <PrivateRoute exact path="/citizen/" title="Home" component={Home} />
        <PrivateRoute exact hideBottomNavigation={true} path="/citizen/contact-us" title="Contact Us" component={ContactUs} />
        <PrivateRoute exact path="/citizen/my-complaints" title="My Complaints" component={MyComplaints} />
        <PrivateRoute exact path="/citizen/complaint-details/:status?" title="Complaint Details" component={ComplaintDetails} />
        <PrivateRoute exact path="/citizen/map" hideBottomNavigation={true} hideAppBar={true} title="Track Location" component={TrackLocation} />
        <PrivateRoute
          exact
          path="/citizen/complaint-submitted"
          hideBottomNavigation={true}
          title="Complaint Submitted"
          component={ComplaintSubmited}
        />
        <PrivateRoute exact path="/citizen/feedback" title="Feedback" component={Feedback} />
        <PrivateRoute exact path="/citizen/reopen-complaint" title="Reopen Complaint" component={ReOpenComplaint} />
        <PrivateRoute exact hideBottomNavigation={true} path="/citizen/complaint-type" title="Complaint Type" component={ComplaintType} />
        <PrivateRoute exact hideBottomNavigation={true} path="/citizen/how-it-works" title="How it works" component={HowItWorks} />
        <PrivateRoute exact hideBottomNavigation={true} path="/citizen/add-complaint" title="Add Complaint" component={AddComplaint} />
        {/* Employee routes */}
        <PrivateRoute exact hideBottomNavigation={true} path="/employee/all-complaints" title="All Complaints" component={AllComplaints} />
      </Switch>
    </main>
  );
};

export default Main;
