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
      <Route exact path={`${match.url}/`} component={withAuthorization(Home, { title: "CS_HOME_HEADER_HOME" })} />
      <Route
        exact
        path={`${match.url}/contact-us`}
        component={withAuthorization(ContactUs, { title: "CS_HOME_HEADER_CONTACT_US", hideFooter: true })}
      />
      <Route exact path={`${match.url}/my-complaints`} component={withAuthorization(MyComplaints, { title: "CS_HOME_MY_COMPLAINTS" })} />
      <Route
        exact
        path={`${match.url}/complaint-details/:serviceRequestId?`}
        component={withAuthorization(ComplaintDetails, { title: "CS_HEADER_COMPLAINT_SUMMARY" })}
      />
      <Route
        exact
        path={`${match.url}/map`}
        component={withAuthorization(TrackLocation, { hideHeader: true, hideFooter: true, title: "CS_HEADER_TRACK_LOCATION" })}
      />
      <Route
        exact
        path={`${match.url}/complaint-submitted`}
        component={withAuthorization(ComplaintSubmited, { hideFooter: true, title: "CS_HEADER_COMPLAINT_SUBMITTED" })}
      />
      <Route
        exact
        path={`${match.url}/reopen-complaint/:serviceRequestId?`}
        component={withAuthorization(ReOpenComplaint, { title: "CS_HEADER_REOPEN_COMPLAINT" })}
      />
      <Route exact path={`${match.url}/feedback/:serviceRequestId?`} component={withAuthorization(Feedback, { title: "CS_HEADER_FEEDBACK" })} />
      <Route
        exact
        path={`${match.url}/feedback-acknowledgement`}
        component={withAuthorization(FeedbackAcknowledge, { hideFooter: true, title: "CS_HOME_MY_COMPLAINTS" })}
      />
      <Route
        exact
        path={`${match.url}/complaint-type`}
        component={withAuthorization(ComplaintType, { hideFooter: true, title: "CS_ADDCOMPLAINT_COMPLAINT_TYPE" })}
      />
      <Route
        exact
        path={`${match.url}/how-it-works`}
        component={withAuthorization(HowItWorks, { hideFooter: true, title: "CS_HOME_HEADER_HOW_IT_WORKS" })}
      />
      <Route
        exact
        path={`${match.url}/add-complaint`}
        component={withAuthorization(AddComplaint, { hideFooter: true, title: "CS_ADD_COMPLAINT_COMPLAINT_SUBMISSION" })}
      />
      <Route
        exact
        path={`${match.url}/reopen-acknowledgement`}
        component={withAuthorization(ReopenAcknowledgement, {
          hideFooter: true,
          title: "CS_HOME_MY_COMPLAINTS",
          redirectionUrl,
        })}
      />
    </Switch>
  );
};

export default Citizen;
