// pgr citizen specific screens
import MyComplaints from "../Screens/MyComplaints";
import ComplaintDetails from "../Screens/ComplaintDetails";
import ComplaintCreated from "../Screens/ComplaintCreated";
import Feedback from "../Screens/Feedback";
import AddComplaint from "../Screens/AddComplaint";
import FeedbackAcknowledge from "../Screens/FeedbackAcknowledgement";

const routes = [
  {
    path: "my-complaints",
    component: MyComplaints,
    needsAuthentication: true,
    options: { title: "CS_HOME_MY_COMPLAINTS" }
  },
  {
    path: "complaint-details/:serviceRequestId?",
    component: ComplaintDetails,
    needsAuthentication: true,
    options: { hideFooter: true, title: "CS_HEADER_COMPLAINT_SUMMARY" }
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
    path: "feedback/:serviceRequestId?",
    component: Feedback,
    needsAuthentication: true,
    options: {
      title: "CS_HEADER_FEEDBACK",
      titleBackground: true // Use this if you need white background for title in web version
    }
  },
  {
    path: "feedback-acknowledgement",
    component: FeedbackAcknowledge,
    needsAuthentication: true,
    options: {
      hideFooter: true,
      hideBackButton: true,
      title: "CS_HEADER_FEEDBACK_ACKNOWLEDGEMENT",
      hideTitle: true
    }
  },
  {
    path: "add-complaint",
    component: AddComplaint,
    needsAuthentication: true,
    options: {
      hideFooter: true,
      title: "CS_ADD_COMPLAINT_COMPLAINT_SUBMISSION"
    }
  }
];

export default routes;
