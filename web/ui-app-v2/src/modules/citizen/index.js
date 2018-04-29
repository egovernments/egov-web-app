import React from "react";
import { Route, Switch } from "react-router-dom";
import withAuthorization from "hocs/withAuthorization";

// Common Screen
import Home from "./Home";
import HowItWorks from "./HowItWorks";
import ContactUs from "./ContactUs";
import User from "./User";

// pgr specific screens
import MyComplaints from "./pgr/MyComplaints";
import ComplaintDetails from "./pgr/ComplaintDetails";
import ComplaintSubmited from "./pgr/ComplaintSubmited";
import TrackLocation from "modules/common/TrackLocation";
import Feedback from "./pgr/Feedback";
import ReOpenComplaint from "./pgr/ReOpenComplaint";
import ComplaintType from "./pgr/ComplaintType";
import AddComplaint from "./pgr/AddComplaint";
import FeedbackAcknowledge from "./pgr/FeedbackAcknowledgement";
import ReopenAcknowledgement from "./pgr/ReopenAcknowledgement";

const redirectionUrl = "/citizen/user/login";

const Citizen = ({ match }) => {
  return (
    <Switch>
      <Route path={`${match.url}/user/`} component={User} />
      <Route exact path={`${match.url}/`} component={withAuthorization({ title: "CS_HOME_HEADER_HOME" })(Home)} />
      <Route
        exact
        path={`${match.url}/contact-us`}
        component={withAuthorization({ title: "CS_HOME_HEADER_CONTACT_US", hideFooter: true })(ContactUs)}
      />
      <Route exact path={`${match.url}/my-complaints`} component={withAuthorization({ title: "CS_HOME_MY_COMPLAINTS" })(MyComplaints)} />
      <Route
        exact
        path={`${match.url}/complaint-details/:serviceRequestId?`}
        component={withAuthorization({ title: "CS_HEADER_COMPLAINT_SUMMARY" })(ComplaintDetails)}
      />
      <Route
        exact
        path={`${match.url}/map`}
        component={withAuthorization({ hideHeader: true, hideFooter: true, title: "CS_HEADER_TRACK_LOCATION" })(TrackLocation)}
      />
      <Route
        exact
        path={`${match.url}/complaint-submitted`}
        component={withAuthorization({ hideFooter: true, title: "CS_HEADER_COMPLAINT_SUBMITTED" })(ComplaintSubmited)}
      />
      <Route
        exact
        path={`${match.url}/reopen-complaint/:serviceRequestId?`}
        component={withAuthorization({ title: "CS_HEADER_REOPEN_COMPLAINT" })(ReOpenComplaint)}
      />
      <Route exact path={`${match.url}/feedback/:serviceRequestId?`} component={withAuthorization({ title: "CS_HEADER_FEEDBACK" })(Feedback)} />
      <Route
        exact
        path={`${match.url}/feedback-acknowledgement`}
        component={withAuthorization({ hideFooter: true, title: "CS_HOME_MY_COMPLAINTS" })(FeedbackAcknowledge)}
      />
      <Route
        exact
        path={`${match.url}/complaint-type`}
        component={withAuthorization({ hideFooter: true, title: "CS_ADDCOMPLAINT_COMPLAINT_TYPE" })(ComplaintType)}
      />
      <Route
        exact
        path={`${match.url}/how-it-works`}
        component={withAuthorization({ hideFooter: true, title: "CS_HOME_HEADER_HOW_IT_WORKS" })(HowItWorks)}
      />
      <Route
        exact
        path={`${match.url}/add-complaint`}
        component={withAuthorization({ hideFooter: true, title: "CS_ADD_COMPLAINT_COMPLAINT_SUBMISSION" })(AddComplaint)}
      />
      <Route
        exact
        path={`${match.url}/reopen-acknowledgement`}
        component={withAuthorization({
          hideFooter: true,
          title: "CS_HOME_MY_COMPLAINTS",
          redirectionUrl,
        })(ReopenAcknowledgement)}
      />
    </Switch>
  );
};

export default Citizen;
