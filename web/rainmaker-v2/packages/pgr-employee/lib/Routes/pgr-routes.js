"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _RequestReAssign = require("../Screens/RequestReAssign");

var _RequestReAssign2 = _interopRequireDefault(_RequestReAssign);

var _AllComplaints = require("../Screens/AllComplaints");

var _AllComplaints2 = _interopRequireDefault(_AllComplaints);

var _ComplaintResolved = require("../Screens/ComplaintResolved");

var _ComplaintResolved2 = _interopRequireDefault(_ComplaintResolved);

var _ComplaintCreated = require("../Screens/ComplaintCreated");

var _ComplaintCreated2 = _interopRequireDefault(_ComplaintCreated);

var _ComplaintDetails = require("../Screens/ComplaintDetails");

var _ComplaintDetails2 = _interopRequireDefault(_ComplaintDetails);

var _AssignComplaint = require("../Screens/AssignComplaint");

var _AssignComplaint2 = _interopRequireDefault(_AssignComplaint);

var _EmployeeDirectory = require("../Screens/EmployeeDirectory");

var _EmployeeDirectory2 = _interopRequireDefault(_EmployeeDirectory);

var _ClosedComplaints = require("../Screens/ClosedComplaints");

var _ClosedComplaints2 = _interopRequireDefault(_ClosedComplaints);

var _RejectComplaint = require("../Screens/RejectComplaint");

var _RejectComplaint2 = _interopRequireDefault(_RejectComplaint);

var _ComplaintRejected = require("../Screens/ComplaintRejected");

var _ComplaintRejected2 = _interopRequireDefault(_ComplaintRejected);

var _ComplaintAssigned = require("../Screens/ComplaintAssigned");

var _ComplaintAssigned2 = _interopRequireDefault(_ComplaintAssigned);

var _ResolveSuccess = require("../Screens/ResolveSuccess");

var _ResolveSuccess2 = _interopRequireDefault(_ResolveSuccess);

var _ReassignSuccess = require("../Screens/ReassignSuccess");

var _ReassignSuccess2 = _interopRequireDefault(_ReassignSuccess);

var _CreateComplaint = require("../Screens/CreateComplaint");

var _CreateComplaint2 = _interopRequireDefault(_CreateComplaint);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import CreateEmployee from "modules/employee/pgr/CreateEmployee";
// pgr employee specific screens
var redirectionUrl = "/user/login";
var routes = [{
  path: "all-complaints",
  component: _AllComplaints2.default,
  needsAuthentication: true,
  options: {
    hideFooter: true,
    title: "ES_OPEN_COMPLAINTS_HEADER",
    hideTitle: false,
    redirectionUrl: redirectionUrl,
    isHomeScreen: true,
    hideFor: "ao",
    customFor: "csr",
    customTitle: "ES_ALL_COMPLAINTS_HEADER"
  }
}, {
  path: "complaint-resolved/:serviceRequestId?",
  component: _ComplaintResolved2.default,
  needsAuthentication: true,
  options: {
    hideFooter: true,
    title: "CS_COMPLAINT_DETAILS_RESOLUTION_EVIDENCE",
    titleBackground: true, // Use this if you need white background for title in web version
    redirectionUrl: redirectionUrl
  }
}, {
  path: "complaint-details/:serviceRequestId",
  component: _ComplaintDetails2.default,
  needsAuthentication: true,
  options: {
    hideFooter: true,
    title: "CS_HEADER_COMPLAINT_SUMMARY",
    redirectionUrl: redirectionUrl
  }
}, {
  path: "closed-complaints",
  component: _ClosedComplaints2.default,
  needsAuthentication: true,
  options: {
    hideFooter: true,
    title: "ES_CLOSED_COMPLAINTS_HEADER",
    redirectionUrl: redirectionUrl
  }
}, {
  path: "complaint-reassigned/:serviceRequestId?",
  component: _ComplaintAssigned2.default,
  needsAuthentication: true,
  options: {
    hideFooter: true,
    title: "ES_COMPLAINT_REASSIGNED_HEADER",
    hideTitle: true,
    redirectionUrl: redirectionUrl
  }
}, {
  path: "resolve-success",
  component: _ResolveSuccess2.default,
  needsAuthentication: true,
  options: {
    hideBackButton: true,
    hideFooter: true,
    title: "CS_COMPLAINT_DETAILS_COMPLAINT_RESOLVED",
    hideTitle: true,
    redirectionUrl: redirectionUrl
  }
}, {
  path: "reassign-success",
  component: _ReassignSuccess2.default,
  needsAuthentication: true,
  options: {
    hideBackButton: true,
    hideFooter: true,
    hideTitle: true,
    title: "CS_COMMON_RE-ASSIGN REQUESTED",
    redirectionUrl: redirectionUrl
  }
}, {
  path: "complaint-assigned/:serviceRequestId?",
  component: _ComplaintAssigned2.default,
  needsAuthentication: true,
  options: {
    hideBackButton: true,
    hideFooter: true,
    hideTitle: true,
    title: "ES_COMPLAINT_ASSIGNED_HEADER",
    redirectionUrl: redirectionUrl
  }
}, {
  path: "complaint-rejected",
  component: _ComplaintRejected2.default,
  needsAuthentication: true,
  options: {
    title: "ES_COMPLAINT_REJECTED_HEADER",
    hideTitle: true,
    hideFooter: true,
    redirectionUrl: redirectionUrl,
    hideBackButton: true
  }
}, {
  path: "assign-complaint/:serviceRequestId?",
  component: _AssignComplaint2.default,
  needsAuthentication: true,
  options: {
    title: "ES_ASSIGN_TO_EMPLOYEE_HEADER",
    hideFooter: true,
    redirectionUrl: redirectionUrl
  }
}, {
  path: "reassign-complaint/:serviceRequestId?",
  component: _AssignComplaint2.default,
  needsAuthentication: true,
  options: {
    title: "ES_REASSIGN_TO_EMPLOYEE_HEADER",
    hideFooter: true,
    redirectionUrl: redirectionUrl
  }
}, {
  path: "employee-directory",
  component: _EmployeeDirectory2.default,
  needsAuthentication: true,
  options: {
    title: "ES_EMPLOYEE_DIRECTORY_HEADER",
    hideFooter: true,
    redirectionUrl: redirectionUrl
  }
}, {
  path: "reject-complaint/:serviceRequestId?",
  component: _RejectComplaint2.default,
  needsAuthentication: true,
  options: {
    title: "ES_REASON_TO_REJECT_HEADER",
    titleBackground: true, // Use this if you need white background for title in web version
    hideFooter: true,
    redirectionUrl: redirectionUrl
  }
}, {
  path: "request-reassign/:serviceRequestId?",
  component: _RequestReAssign2.default,
  needsAuthentication: true,
  options: {
    title: "CS_HEADER_REQUEST_REASSIGN",
    titleBackground: true, // Use this if you need white background for title in web version
    hideFooter: true,
    redirectionUrl: redirectionUrl
  }
}, {
  path: "create-complaint",
  component: _CreateComplaint2.default,
  needsAuthentication: true,
  options: {
    title: "CS_ADD_COMPLAINT_COMPLAINT_SUBMISSION",
    hideFooter: true,
    redirectionUrl: redirectionUrl,
    isHomeScreen: true
  }
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
}];

exports.default = routes;