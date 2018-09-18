"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Register = require("../Screens/User/Register");

var _Register2 = _interopRequireDefault(_Register);

var _Login = require("../Screens/User/Login");

var _Login2 = _interopRequireDefault(_Login);

var _OTP = require("../Screens/User/OTP");

var _OTP2 = _interopRequireDefault(_OTP);

var _MyComplaints = require("../Screens/MyComplaints");

var _MyComplaints2 = _interopRequireDefault(_MyComplaints);

var _ComplaintDetails = require("../Screens/ComplaintDetails");

var _ComplaintDetails2 = _interopRequireDefault(_ComplaintDetails);

var _ComplaintCreated = require("../Screens/ComplaintCreated");

var _ComplaintCreated2 = _interopRequireDefault(_ComplaintCreated);

var _Feedback = require("../Screens/Feedback");

var _Feedback2 = _interopRequireDefault(_Feedback);

var _AddComplaint = require("../Screens/AddComplaint");

var _AddComplaint2 = _interopRequireDefault(_AddComplaint);

var _FeedbackAcknowledgement = require("../Screens/FeedbackAcknowledgement");

var _FeedbackAcknowledgement2 = _interopRequireDefault(_FeedbackAcknowledgement);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// pgr citizen specific screens
var routes = [{
  path: "user/register",
  component: _Register2.default,
  needsAuthentication: false,
  redirectionUrl: "/"
}, {
  path: "user/login",
  component: _Login2.default,
  needsAuthentication: false,
  redirectionUrl: "/"
}, {
  path: "user/otp",
  component: _OTP2.default,
  needsAuthentication: false,
  redirectionUrl: "/"
}, {
  path: "my-complaints",
  component: _MyComplaints2.default,
  needsAuthentication: true,
  options: { title: "CS_HOME_MY_COMPLAINTS" }
}, {
  path: "complaint-details/:serviceRequestId?",
  component: _ComplaintDetails2.default,
  needsAuthentication: true,
  options: { hideFooter: true, title: "CS_HEADER_COMPLAINT_SUMMARY" }
}, {
  path: "complaint-submitted",
  component: _ComplaintCreated2.default,
  needsAuthentication: true,
  options: {
    hideFooter: true,
    title: "CS_HEADER_COMPLAINT_SUBMITTED",
    hideTitle: true,
    hideBackButton: true
  }
}, {
  path: "feedback/:serviceRequestId?",
  component: _Feedback2.default,
  needsAuthentication: true,
  options: {
    title: "CS_HEADER_FEEDBACK",
    titleBackground: true // Use this if you need white background for title in web version
  }
}, {
  path: "feedback-acknowledgement",
  component: _FeedbackAcknowledgement2.default,
  needsAuthentication: true,
  options: {
    hideFooter: true,
    hideBackButton: true,
    title: "CS_HEADER_FEEDBACK_ACKNOWLEDGEMENT",
    hideTitle: true
  }
}, {
  path: "add-complaint",
  component: _AddComplaint2.default,
  needsAuthentication: true,
  options: {
    hideFooter: true,
    title: "CS_ADD_COMPLAINT_COMPLAINT_SUBMISSION"
  }
}]; // user routes
exports.default = routes;