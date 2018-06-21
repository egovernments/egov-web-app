import React from "react";

// user routes
import Register from "modules/citizen/User/Register";
import Login from "modules/citizen/User/Login";
import OTP from "modules/citizen/User/OTP";
import LanguageSelection from "modules/citizen/User/LanguageSelection";
import Profile from "modules/citizen/User/Profile";

// common screens
import Home from "modules/citizen/Home";
import HowItWorks from "modules/citizen/HowItWorks";
import ContactUs from "modules/citizen/ContactUs";

// pgr specific screens
import MyComplaints from "modules/citizen/pgr/MyComplaints";
import ComplaintDetails from "modules/citizen/pgr/ComplaintDetails";
import ComplaintSubmited from "modules/citizen/pgr/ComplaintSubmited";
import { TrackLocation } from "modules/common";
import Feedback from "modules/citizen/pgr/Feedback";
import { ReOpenComplaint } from "modules/common";
import { ComplaintType } from "modules/common";
import AddComplaint from "modules/citizen/pgr/AddComplaint";
import FeedbackAcknowledge from "modules/citizen/pgr/FeedbackAcknowledgement";
import { ReopenAcknowledgement } from "modules/common";

//property tax
import PTHome from "modules/citizen/PropertyTax/PTHome";
import MyProperties from "modules/citizen/PropertyTax/MyProperties";
import Drafts from "modules/citizen/PropertyTax/Drafts";
import MyReceipts from "modules/citizen/PropertyTax/MyReceipts";
import PropertyTaxAssessmentFormWizard from "modules/citizen/PropertyTax/AssessmentFormWizard";
import PaymentSuccess from "modules/citizen/PropertyTax/PaymentSuccess";
import PaymentFailure from "modules/citizen/PropertyTax/PaymentFailure";
import Events from "modules/citizen/PropertyTax/Events";
import Notifications from "modules/citizen/PropertyTax/Notifications";
import PoliceStations from "modules/citizen/PropertyTax/PoliceStations";
import Payments from "modules/citizen/PropertyTax/Payments";
import ReviewForm from "modules/citizen/PropertyTax/ReviewForm";
import PropertyAddress from "modules/citizen/PropertyTax/AssessmentFormWizard/components/PropertyAddress";
import FormWizard from "modules/citizen/PropertyTax/FormWizard";

const routes = [
  {
    path: "user/register",
    component: Register,
    needsAuthentication: false,
    redirectionUrl: "/citizen",
  },
  {
    path: "user/login",
    component: Login,
    needsAuthentication: false,
    redirectionUrl: "/citizen",
  },
  {
    path: "user/otp",
    component: OTP,
    needsAuthentication: false,
    redirectionUrl: "/citizen",
  },
  {
    path: "user/language-selection",
    component: LanguageSelection,
    needsAuthentication: false,
    redirectionUrl: "/citizen",
  },
  {
    path: "user/profile",
    component: Profile,
    needsAuthentication: true,
    options: { hideFooter: true, title: "Edit Profile" },
  },
  {
    path: "",
    component: Home,
    needsAuthentication: true,
    options: { isHomeScreen: true },
  },

  {
    path: "events",
    component: Events,
    needsAuthentication: true,
    options: { hideFooter: true, title: "Events" },
  },
  {
    path: "notifications",
    component: Notifications,
    needsAuthentication: true,
    options: { hideFooter: true, title: "Notifications" },
  },
  {
    path: "police-stations",
    component: PoliceStations,
    needsAuthentication: true,
    options: { hideFooter: true, title: "Police Stations" },
  },
  {
    path: "payments",
    component: Payments,
    needsAuthentication: true,
    options: { hideFooter: true, title: "Payments" },
  },
  {
    path: "my-complaints",
    component: MyComplaints,
    needsAuthentication: true,
    options: { title: "CS_HOME_MY_COMPLAINTS" },
  },
  {
    path: "contact-us",
    component: ContactUs,
    needsAuthentication: true,
    options: { title: "CS_HOME_HEADER_CONTACT_US", hideFooter: true },
  },
  {
    path: "complaint-details/:serviceRequestId?",
    component: ComplaintDetails,
    needsAuthentication: true,
    options: { hideFooter: true, title: "CS_HEADER_COMPLAINT_SUMMARY" },
  },
  {
    path: "map",
    component: TrackLocation,
    needsAuthentication: true,
    options: { hideHeader: true, hideFooter: true, title: "CS_HEADER_TRACK_LOCATION" },
  },
  {
    path: "complaint-submitted",
    component: ComplaintSubmited,
    needsAuthentication: true,
    options: {
      hideFooter: true,
      title: "CS_HEADER_COMPLAINT_SUBMITTED",
      hideTitle: true,
      hideBackButton: true,
    },
  },
  {
    path: "reopen-complaint/:serviceRequestId?",
    component: ReOpenComplaint,
    needsAuthentication: true,
    options: {
      title: "CS_HEADER_REOPEN_COMPLAINT",
      titleBackground: true, // Use this if you need white background for title in web version
    },
  },
  {
    path: "feedback/:serviceRequestId?",
    component: Feedback,
    needsAuthentication: true,
    options: {
      title: "CS_HEADER_FEEDBACK",
      titleBackground: true, // Use this if you need white background for title in web version
    },
  },
  {
    path: "feedback-acknowledgement",
    component: FeedbackAcknowledge,
    needsAuthentication: true,
    options: { hideFooter: true, hideBackButton: true, title: "CS_HEADER_FEEDBACK_ACKNOWLEDGEMENT", hideTitle: true },
  },
  {
    path: "complaint-type",
    component: ComplaintType,
    needsAuthentication: true,
    options: { hideFooter: true, title: "CS_ADDCOMPLAINT_COMPLAINT_TYPE", hideTitle: true },
  },
  {
    path: "how-it-works",
    component: HowItWorks,
    needsAuthentication: true,
    options: {
      hideFooter: true,
      title: "CS_HOME_HEADER_HOW_IT_WORKS",
      titleBackground: true, // Use this if you need white background for title in web version
    },
  },
  {
    path: "add-complaint",
    component: AddComplaint,
    needsAuthentication: true,
    options: { hideFooter: true, title: "CS_ADD_COMPLAINT_COMPLAINT_SUBMISSION" },
  },
  {
    path: "reopen-acknowledgement",
    component: ReopenAcknowledgement,
    needsAuthentication: true,
    options: {
      hideFooter: true,
      hideBackButton: true,
      title: "CS_COMMON_COMPLAINT_REOPENED",
      hideTitle: true,
    },
  },
  //property tax routes
  {
    path: "property-tax",
    component: PTHome,
    needsAuthentication: true,
    options: {
      hideFooter: true,
      title: "PUNJAB MUNICIPAL CORPORATION",
      hideBackButton: true,
      isHomeScreen: true,
    },
  },

  {
    path: "property-tax/my-properties",
    component: MyProperties,
    needsAuthentication: true,
    options: {
      hideFooter: true,
      title: "PUNJAB MUNICIPAL CORPORATION",
      hideBackButton: true,
    },
  },
  {
    path: "property-tax/drafts",
    component: Drafts,
    needsAuthentication: true,
    options: {
      hideFooter: true,
      title: "PUNJAB MUNICIPAL CORPORATION",
      hideBackButton: true,
    },
  },
  {
    path: "property-tax/my-receipts",
    component: MyReceipts,
    needsAuthentication: true,
    options: {
      hideFooter: true,
      title: "PUNJAB MUNICIPAL CORPORATION",
      hideBackButton: true,
    },
  },
  {
    path: "property-tax/payment-success",
    component: PaymentSuccess,
    needsAuthentication: true,
    options: {
      hideFooter: true,
      title: "PUNJAB MUNICIPAL CORPORATION",
      hideBackButton: true,
    },
  },
  {
    path: "property-tax/payment-failure",
    component: PaymentFailure,
    needsAuthentication: true,
    options: {
      hideFooter: true,
      title: "PUNJAB MUNICIPAL CORPORATION",
      hideBackButton: true,
    },
  },
  {
    path: "property-tax/property-address",
    component: PropertyAddress,
    needsAuthentication: true,
    options: {
      hideFooter: true,
    },
  },
  {
    path: "pt-payment-assessment-form-wizard",
    component: PropertyTaxAssessmentFormWizard,
    needsAuthentication: true,
    options: {
      title: "PT_PAYMENT_ASSESSMENT_FORM_WIZARD",
      hideFooter: true,
    },
  },
  {
    path: "property-tax/assessment-form",
    component: FormWizard,
    needsAuthentication: true,
    options: {
      hideFooter: true,
      title: "PUNJAB MUNICIPAL CORPORATION",
      hideBackButton: true,
    },
  },
  {
    path: "propert-tax/review-property",
    component: ReviewForm,
    needsAuthentication: true,
    options: {
      hideFooter: true,
      title: "PUNJAB MUNICIPAL CORPORATION",
      hideBackButton: true,
    },
  },
];

export default routes;
