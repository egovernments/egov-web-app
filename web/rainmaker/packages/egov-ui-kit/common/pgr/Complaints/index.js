"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _components = require("components");

var _translationNode = require("egov-ui-kit/utils/translationNode");

var _translationNode2 = _interopRequireDefault(_translationNode);

var _commons = require("egov-ui-kit/utils/commons");

require("./index.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var imageStyles = {
  maxHeight: "100px",
  minHeight: "100px"
};

var callIconStyle = {
  marginLeft: "17px",
  height: "17px",
  width: "17px",
  borderRadius: "50%",
  top: "0px"
};

var bottomInfoTemplate = function bottomInfoTemplate(item, role) {
  return role !== "citizen" ? _react2.default.createElement(
    "div",
    null,
    item.complaintStatus === "ASSIGNED" && _react2.default.createElement(
      "div",
      { className: "employee-bottom-info-cont" },
      _react2.default.createElement(
        "div",
        { className: "submitted-by-text" },
        role === "ao" ? item.assignedTo !== "NA" && _react2.default.createElement(
          "div",
          { className: "clearfix" },
          _react2.default.createElement(
            "div",
            { className: "inline-Localization-text" },
            _react2.default.createElement(_translationNode2.default, { containerStyle: { display: "inline-block" }, label: "ES_ALL_COMPLAINTS_ASSIGNED_TO" }),
            _react2.default.createElement(_translationNode2.default, {
              containerStyle: { display: "inline-block" },
              color: "#464646",
              labelStyle: { marginLeft: "3px" },
              label: item.assignedTo
            })
          ),
          _react2.default.createElement(
            "div",
            {
              style: { display: "inline-block" },
              onClick: function onClick(e) {
                e.stopPropagation();
                var link = "tel:+91" + item.employeePhoneNumber;
                window.location.href = link;
              }
            },
            _react2.default.createElement(_components.Icon, { action: "communication", name: "call", style: callIconStyle, color: "#22b25f" })
          )
        ) : item.submittedBy !== "NA" && _react2.default.createElement(
          "div",
          { className: "clearfix" },
          _react2.default.createElement(
            "div",
            { className: "inline-Localization-text" },
            _react2.default.createElement(_translationNode2.default, { containerStyle: { display: "inline-block" }, label: "ES_ALL_COMPLAINTS_SUBMITTED_BY" }),
            _react2.default.createElement(_translationNode2.default, {
              containerStyle: { display: "inline-block" },
              color: "#464646",
              labelStyle: { marginLeft: "3px" },
              label: item.submittedBy
            })
          ),
          _react2.default.createElement(
            "div",
            {
              style: { float: "left" },
              onClick: function onClick(e) {
                e.stopPropagation();
                var link = "tel:+91" + item.citizenPhoneNumber;
                window.location.href = link;
              }
            },
            _react2.default.createElement(_components.Icon, { action: "communication", name: "call", style: callIconStyle, color: "#22b25f" })
          )
        )
      )
    ),
    item.escalatedTo && _react2.default.createElement(
      "div",
      { className: "submitted-by-text" },
      "Escalated To: ",
      _react2.default.createElement(
        "span",
        { style: { color: "#464646" } },
        item.escalatedTo
      )
    ),
    item.reassign && _react2.default.createElement(
      "div",
      { className: "employee-bottom-msg" },
      _react2.default.createElement(_translationNode2.default, { label: role === "ao" ? item.reassignRequestedBy + " requested for re-assign" : "You have requested for re-assign", dark: true })
    )
  ) : "";
};
var getStatusAndChangeColor = function getStatusAndChangeColor(status, assignee) {
  var statusObj = {
    style: {},
    message: ""
  };
  switch (status) {
    case "CS_COMMON_OPEN_UCASE":
      statusObj.style = {
        color: "#f89a3f"
      };
      statusObj.message = _react2.default.createElement(
        "div",
        null,
        _react2.default.createElement(_translationNode2.default, { label: "Complaint " }),
        _react2.default.createElement(_translationNode2.default, { className: "complaint-status-reassigned", label: "CS_COMMON_RE_ASSIGNED" }),
        _react2.default.createElement(_translationNode2.default, { label: " to " }),
        _react2.default.createElement(_translationNode2.default, { className: "complaint-assignee", label: "" + assignee })
      );
      break;
    case "CS_COMMON_CLOSED_UCASE":
      statusObj.style = {
        color: "#5385a6"
      };
      statusObj.message = _react2.default.createElement(
        "div",
        null,
        _react2.default.createElement(_translationNode2.default, { label: "Complaint " }),
        _react2.default.createElement(_translationNode2.default, { className: "complaint-status-resolved", label: "CS_COMMON_RESOLVED" }),
        _react2.default.createElement(_translationNode2.default, { label: ". Please rate" })
      );
      break;
    case "CS_COMMON_REJECTED_UCASE":
      statusObj.style = {
        color: "#484848"
      };
      statusObj.message = _react2.default.createElement(
        "div",
        null,
        _react2.default.createElement(_translationNode2.default, { label: "Complaint has been " }),
        _react2.default.createElement(_translationNode2.default, { className: "complaint-status-rejected", label: "CS_COMMON_REJECTED" }),
        _react2.default.createElement(_translationNode2.default, { label: ". Please rate" })
      );
      break;
    default:
      statusObj.style = {
        color: "#484848"
      };
      statusObj.message = "Complaint Re-assigned to " + assignee;
  }
  if (status && status.includes("Overdue")) {
    statusObj.style = { color: "#e74c3c" };
    statusObj.message = "";
  }
  if (status && status.includes("left")) {
    statusObj.style = { color: "#22b25f" };
    statusObj.message = "";
  }
  return statusObj;
};

var Complaints = function Complaints(_ref) {
  var index = _ref.index,
      complaints = _ref.complaints,
      onClick = _ref.onClick,
      complaintLocation = _ref.complaintLocation,
      track = _ref.track,
      role = _ref.role,
      onComplaintClick = _ref.onComplaintClick,
      noComplaintMessage = _ref.noComplaintMessage;

  return complaints.length === 0 ? _react2.default.createElement(
    "div",
    { className: "no-complaints-message-cont" },
    _react2.default.createElement(_translationNode2.default, { label: noComplaintMessage, dark: true, fontSize: "16px", labelStyle: { letterSpacing: "0.7px" } })
  ) : complaints.map(function (complaint, complaintIndex) {
    var complaintHeader = complaint.header && "SERVICEDEFS." + complaint.header.toUpperCase();
    return _react2.default.createElement(
      "div",
      { id: "complaint-" + complaintIndex, className: "complaints-card-main-cont", key: "complaint-" + complaintIndex },
      _react2.default.createElement(_components.Card, {
        onClick: function onClick(e) {
          onComplaintClick(encodeURIComponent(complaint.complaintNo));
        },
        className: "complaint-card",
        textChildren: _react2.default.createElement(
          "div",
          { className: "complaint-card-wrapper" },
          _react2.default.createElement(
            "div",
            { className: "complaint-header-cont" },
            _react2.default.createElement(_translationNode2.default, {
              className: "complaint-header text-bold dark-color",
              fontSize: "16px",
              dark: true,
              bold: true,
              label: complaintHeader ? complaintHeader : "Default",
              containerStyle: { maxWidth: "60%" },
              labelStyle: { letterSpacing: 0.7, wordWrap: "break-word", width: "100%" }
            }),
            _react2.default.createElement(_translationNode2.default, {
              className: "complaint-status-text text-bold",
              labelStyle: (0, _extends3.default)({ letterSpacing: 0.7, wordBreak: "normal" }, getStatusAndChangeColor(complaint.status.status).style),
              label: complaint.status.status
            })
          ),
          _react2.default.createElement(
            "div",
            { className: "complaint-date-cont" },
            _react2.default.createElement(_components.Icon, { action: "action", name: "date-range" }),
            _react2.default.createElement(
              "span",
              { className: "complaint-date" },
              (0, _commons.getDateFromEpoch)(complaint.date)
            )
          ),
          _react2.default.createElement(
            "div",
            { className: "complaint-number-cont" },
            _react2.default.createElement(
              "div",
              { className: "complaint-number complaint-date" },
              _react2.default.createElement(_translationNode2.default, { fontSize: "12px", label: "CS_COMMON_COMPLAINT_NO" }),
              _react2.default.createElement(_translationNode2.default, { fontSize: "12px", label: " : " }),
              _react2.default.createElement(_translationNode2.default, { fontSize: "12px", label: complaint.complaintNo, className: "complaint-complaint-number" })
            )
          ),
          complaintLocation && _react2.default.createElement(
            "div",
            { className: "complaint-address-cont" },
            _react2.default.createElement(_components.Icon, { action: "maps", name: "place", style: { height: 24, width: 24, marginRight: 10 }, color: "#767676" }),
            _react2.default.createElement(_translationNode2.default, { fontSize: "12px", label: complaint.address, className: "complaint-address" })
          ),
          complaint && complaint.images && complaint.images.length > 0 && _react2.default.createElement(
            "div",
            { className: "complaint-image-cont" },
            complaint.images.map(function (image, index) {
              return image && _react2.default.createElement(
                "div",
                { className: "complaint-image-wrapper", key: index },
                _react2.default.createElement(_components.Image, { style: imageStyles, size: "medium", className: "complaint-image", width: "100%", height: 46, source: image }),
                " "
              );
            })
          ),
          role === "citizen" && _react2.default.createElement(_translationNode2.default, { labelStyle: { marginLeft: "3px" }, label: complaint.status.statusMessage, className: "complaint-status-text dark-color" }),
          bottomInfoTemplate(complaint, role)
        )
      })
    );
  });
};

exports.default = Complaints;