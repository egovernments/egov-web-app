"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(
  _possibleConstructorReturn2
);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _components = require("components");

var _translationNode = require("egov-ui-kit/utils/translationNode");

var _translationNode2 = _interopRequireDefault(_translationNode);

require("./index.css");

var _commons = require("egov-ui-kit/utils/commons");

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var timelineButtonLabelStyle = {
  height: 12,
  lineHeight: 1,
  color: "#ffffff",
  fontWeight: 500
};
var timelineButtonContainerStyle = {
  lineHeight: 1,
  height: 12
};

var statusContainerStyle = {
  display: "inline-block",
  marginRight: "3px"
};

var nameContainerStyle = {
  display: "inline-block"
};

var displayBlock = {
  display: "block",
  marginBottom: 5
};
var timelineIconCommonStyle = {
  height: "38px",
  width: "38px",
  borderRadius: "50%",
  padding: "7px",
  marginLeft: "-7px"
};

var statusCommonIconStyle = (0, _extends3.default)(
  {},
  timelineIconCommonStyle,
  {
    backgroundColor: "#ffffff",
    boxShadow: "0 2px 2px 0 rgba(0, 0, 0, 0.24), 0 0 2px 0 rgba(0, 0, 0, 0.12)",
    border: "solid 1px #fe7a51"
  }
);

var statusResolvedIconStyle = (0, _extends3.default)(
  {},
  timelineIconCommonStyle,
  {
    backgroundColor: "#22b25f",
    boxShadow: "0 2px 4px 0 rgba(0, 0, 0, 0.22)",
    border: "solid 1px #22b25f"
  }
);

var statusRejectedIconStyle = (0, _extends3.default)(
  {},
  timelineIconCommonStyle,
  {
    backgroundColor: "#e74c3c",
    // boxShadow: "0 2px 4px 0 rgba(0, 0, 0, 0.22)",
    border: "solid 1px #e74c3c"
  }
);

var callIconStyle = {
  marginLeft: "17px",
  height: "17px",
  width: "17px",
  borderRadius: "50%",
  position: "absolute",
  top: "0px"
};

var connectorStyle = {
  display: "block",
  border: "solid 1px #fe7a51",
  minHeight: "28px"
};

var StatusIcon = function StatusIcon(_ref) {
  var status = _ref.status;

  switch (status) {
    case "open":
      return _react2.default.createElement(_components.Icon, {
        action: "custom",
        name: "file-plus",
        style: statusCommonIconStyle,
        color: "#fe7a51"
      });
    case "reassignrequested":
      return _react2.default.createElement(_components.Icon, {
        action: "custom",
        name: "reassign-request",
        style: statusCommonIconStyle,
        color: "#fe7a51"
      });
    case "assigned":
    case "re-assign":
      return _react2.default.createElement(_components.Icon, {
        action: "custom",
        name: "file-send",
        style: statusCommonIconStyle,
        color: "#fe7a51"
      });
    case "rejected":
      return _react2.default.createElement(_components.Icon, {
        action: "content",
        name: "clear",
        style: statusRejectedIconStyle,
        color: "#FFFFFF"
      });
    case "resolved":
      return _react2.default.createElement(_components.Icon, {
        action: "action",
        name: "done",
        style: statusResolvedIconStyle,
        color: "#FFFFFF"
      });
    case "closed":
      return _react2.default.createElement(_components.Icon, {
        action: "action",
        name: "stars",
        style: statusResolvedIconStyle,
        color: "#FFFFFF"
      });
  }
};

//prventing number of times showing button for duplicate status
var openStatusCount = 0;
var rejectStatusCount = 0;
var resolveStatusCount = 0;
var assigneeStatusCount = 0;
var reassignRequestedCount = 0;

var StatusContent = function StatusContent(_ref2) {
  var stepData = _ref2.stepData,
    currentStatus = _ref2.currentStatus,
    changeRoute = _ref2.changeRoute,
    feedback = _ref2.feedback,
    rating = _ref2.rating,
    role = _ref2.role,
    filedBy = _ref2.filedBy,
    filedUserMobileNumber = _ref2.filedUserMobileNumber;
  var action = stepData.action,
    date = stepData.when,
    media = stepData.media,
    status = stepData.status,
    comments = stepData.comments,
    employeeName = stepData.employeeName,
    employeeDesignation = stepData.employeeDesignation,
    employeeDepartment = stepData.employeeDepartment,
    complaintNo = stepData.businessKey,
    groName = stepData.groName,
    employeeMobileNumber = stepData.employeeMobileNumber,
    groMobileNumber = stepData.groMobileNumber,
    groDesignation = stepData.groDesignation;

  switch (status) {
    case "open":
      openStatusCount++;
      return _react2.default.createElement(
        "div",
        { className: "complaint-timeline-content-section" },
        _react2.default.createElement(_translationNode2.default, {
          labelClassName: "rainmaker-small-font complaint-timeline-date",
          label: (0, _commons.getDateFromEpoch)(date)
        }),
        _react2.default.createElement(_translationNode2.default, {
          labelClassName: "dark-color complaint-timeline-status",
          containerStyle:
            filedBy && filedBy.includes("@CSR")
              ? displayBlock
              : statusContainerStyle,
          label:
            "" +
            (action === "reopen"
              ? "CS_COMMON_COMPLAINT_REOPENED"
              : role !== "citizen"
              ? filedBy
                ? filedBy.includes("@CSR")
                  ? "ES_COMPLAINT_FILED_BY_CSR"
                  : "ES_COMMON_FILED_BY"
                : "CS_COMPLAINT_DETAILS_COMPLAINT_FILED"
              : "CS_COMPLAINT_DETAILS_COMPLAINT_FILED")
        }),
        action !== "reopen" &&
          role !== "citizen" &&
          filedBy &&
          _react2.default.createElement(_translationNode2.default, {
            label: filedBy.includes("@CSR")
              ? filedBy.replace("@CSR", "")
              : filedBy,
            containerStyle: nameContainerStyle,
            fontSize: filedBy.includes("@CSR") ? 12 : 14,
            dark: filedBy.includes("@CSR") ? false : true
          }),
        role !== "citizen" &&
          action !== "reopen" &&
          filedUserMobileNumber &&
          _react2.default.createElement(
            "a",
            {
              className: "citizen-mobileNumber-style",
              href: "tel:+91" + filedUserMobileNumber,
              style: { textDecoration: "none", position: "relative" }
            },
            _react2.default.createElement(_components.Icon, {
              action: "communication",
              name: "call",
              style: callIconStyle,
              color: "#22b25f"
            }),
            _react2.default.createElement(
              "span",
              {
                style: {
                  fontSize: filedBy.includes("@CSR") ? 12 : 14,
                  marginLeft: "43px"
                }
              },
              "+91 " + filedUserMobileNumber
            )
          ),
        action === "reopen" &&
          _react2.default.createElement(
            "div",
            null,
            _react2.default.createElement(_translationNode2.default, {
              labelClassName:
                "rainmaker-small-font complaint-timeline-comments",
              containerStyle: { width: "192px" },
              label: comments ? comments.split(";")[0] : ""
            }),
            media &&
              _react2.default.createElement(
                "div",
                { style: { display: "flex" } },
                media.map(function(image, index) {
                  return (
                    (0, _commons.isImage)(image) &&
                    _react2.default.createElement(
                      "div",
                      {
                        style: { marginRight: 8 },
                        className:
                          "complaint-detail-detail-section-padding-zero",
                        id:
                          "complaint-timeline-reopen-" +
                          openStatusCount +
                          "-image-" +
                          index,
                        key: index
                      },
                      _react2.default.createElement(_components.Image, {
                        style: {
                          width: "97px",
                          height: "93px"
                        },
                        size: "medium",
                        source: image,
                        onClick: function onClick() {
                          return changeRoute.push("/image?source=" + image);
                        }
                      })
                    )
                  );
                })
              ),
            _react2.default.createElement(_translationNode2.default, {
              labelClassName: "rainmaker-small-font complaint-timeline-status",
              containerStyle: { width: "192px" },
              label:
                comments && comments.split(";")[1]
                  ? '" ' + comments.split(";")[1] + ' "'
                  : ""
            })
          )
      );
    case "assigned":
      assigneeStatusCount++;
      switch (role && role.toLowerCase()) {
        case "ao":
        case "citizen":
          return _react2.default.createElement(
            "div",
            { className: "complaint-timeline-content-section" },
            _react2.default.createElement(_translationNode2.default, {
              labelClassName: "rainmaker-small-font complaint-timeline-date",
              label: (0, _commons.getDateFromEpoch)(date)
            }),
            _react2.default.createElement(_translationNode2.default, {
              labelClassName: "dark-color complaint-timeline-status",
              containerStyle: statusContainerStyle,
              label:
                "" +
                (action == "assign"
                  ? employeeName
                    ? "CS_COMMON_ASSIGNED_TO"
                    : "ES_COMPLAINT_ASSIGNED_HEADER"
                  : employeeName
                  ? "CS_COMMON_REASSIGNED_TO"
                  : "ES_COMPLAINT_REASSIGNED_HEADER")
            }),
            _react2.default.createElement(_translationNode2.default, {
              labelClassName: "dark-color",
              containerStyle: nameContainerStyle,
              label: "" + employeeName
            }),
            employeeMobileNumber &&
              assigneeStatusCount === 1 &&
              _react2.default.createElement(
                "a",
                {
                  className: "pgr-call-icon",
                  href: "tel:+91" + employeeMobileNumber,
                  style: { textDecoration: "none", position: "relative" }
                },
                _react2.default.createElement(_components.Icon, {
                  action: "communication",
                  name: "call",
                  style: callIconStyle,
                  color: "#22b25f"
                }),
                _react2.default.createElement(
                  "span",
                  { style: { marginLeft: "43px" } },
                  "+91 " + employeeMobileNumber
                )
              ),
            _react2.default.createElement(_translationNode2.default, {
              labelClassName:
                "rainmaker-small-font complaint-timeline-department",
              // containerStyle={{ width: "192px" }}
              label: employeeDesignation
            }),
            _react2.default.createElement(_translationNode2.default, {
              labelClassName:
                "rainmaker-small-font complaint-timeline-department",
              // containerStyle={{ width: "192px" }}
              label: employeeDepartment
            })
          );
          break;
        case "employee":
          return _react2.default.createElement(
            "div",
            { className: "complaint-timeline-content-section" },
            _react2.default.createElement(_translationNode2.default, {
              labelClassName: "rainmaker-small-font complaint-timeline-date",
              label: (0, _commons.getDateFromEpoch)(date)
            }),
            _react2.default.createElement(_translationNode2.default, {
              labelClassName: "dark-color complaint-timeline-status",
              containerStyle: statusContainerStyle,
              label:
                "" +
                (action == "assign"
                  ? groName
                    ? "ES_COMPLAINT_DETAILS_ASSIGNED_BY"
                    : "ES_COMPLAINT_ASSIGNED_HEADER"
                  : groName
                  ? "ES_COMPLAINT_DETAILS_REASSIGNED_BY"
                  : "ES_COMPLAINT_REASSIGNED_HEADER")
            }),
            groName &&
              _react2.default.createElement(_translationNode2.default, {
                labelClassName: "dark-color",
                containerStyle: nameContainerStyle,
                label: "" + groName
              }),
            assigneeStatusCount === 1 &&
              groName &&
              groMobileNumber &&
              _react2.default.createElement(
                "a",
                {
                  className: "pgr-call-icon",
                  href: "tel:+91" + groMobileNumber,
                  style: { textDecoration: "none", position: "relative" }
                },
                _react2.default.createElement(_components.Icon, {
                  action: "communication",
                  name: "call",
                  style: callIconStyle,
                  color: "#22b25f"
                }),
                _react2.default.createElement(
                  "span",
                  { style: { marginLeft: "43px" } },
                  "+91 " + groMobileNumber
                )
              ),
            groName &&
              _react2.default.createElement(_translationNode2.default, {
                labelClassName:
                  "rainmaker-small-font complaint-timeline-designation",
                containerStyle: { width: "192px" },
                label: "" + groDesignation
              })
          );
          break;
        default:
          return _react2.default.createElement(
            "div",
            { className: "complaint-timeline-content-section" },
            _react2.default.createElement(_translationNode2.default, {
              labelClassName: "rainmaker-small-font complaint-timeline-date",
              label: (0, _commons.getDateFromEpoch)(date)
            }),
            _react2.default.createElement(_translationNode2.default, {
              labelClassName: "dark-color complaint-timeline-status",
              containerStyle: statusContainerStyle,
              label:
                "" +
                (action == "assign"
                  ? "ES_COMPLAINT_ASSIGNED_HEADER"
                  : "ES_COMPLAINT_REASSIGNED_HEADER")
            })
          );
      }

    case "reassignrequested":
      reassignRequestedCount++;

      return _react2.default.createElement(
        "div",
        { className: "complaint-timeline-content-section" },
        _react2.default.createElement(_translationNode2.default, {
          labelClassName: "rainmaker-small-font complaint-timeline-date",
          label: (0, _commons.getDateFromEpoch)(date)
        }),
        role === "citizen" &&
          _react2.default.createElement(
            "div",
            null,
            _react2.default.createElement(_translationNode2.default, {
              labelClassName: "dark-color complaint-timeline-status",
              containerStyle: statusContainerStyle,
              label:
                "" +
                (groName
                  ? "CS_COMPLAINT_DETAILS_BEING_REASSIGNED"
                  : "CS_COMMON_STATUS_BEING_REASSIGNED")
            }),
            groName &&
              _react2.default.createElement(_translationNode2.default, {
                labelClassName: "dark-color",
                containerStyle: nameContainerStyle,
                label: "" + groName
              })
          ),
        role !== "citizen" &&
          _react2.default.createElement(
            "div",
            null,
            _react2.default.createElement(_translationNode2.default, {
              labelClassName: "dark-color complaint-timeline-status",
              containerStyle: statusContainerStyle,
              label: "CS_COMMON_RE-ASSIGN REQUESTED"
            }),
            _react2.default.createElement(_translationNode2.default, {
              labelClassName:
                "rainmaker-small-font complaint-timeline-comments",
              containerStyle: { width: "192px" },
              label: comments ? comments.split(";")[0] : ""
            }),
            _react2.default.createElement(_translationNode2.default, {
              labelClassName:
                "rainmaker-small-font complaint-timeline-comments",
              containerStyle: { width: "192px" },
              label:
                comments && comments.split(";")[1]
                  ? '" ' + comments.split(";")[1] + ' "'
                  : ""
            })
          )
      );

    case "rejected":
      rejectStatusCount++;
      return _react2.default.createElement(
        "div",
        { className: "complaint-timeline-content-section" },
        _react2.default.createElement(_translationNode2.default, {
          labelClassName: "rainmaker-small-font complaint-timeline-date",
          label: (0, _commons.getDateFromEpoch)(date)
        }),
        _react2.default.createElement(_translationNode2.default, {
          labelClassName: "dark-color complaint-timeline-status",
          label: "CS_MYCOMPLAINTS_REJECTED"
        }),
        _react2.default.createElement(_translationNode2.default, {
          labelClassName: "rainmaker-small-font",
          containerStyle: { width: "192px" },
          label: comments ? comments.split(";")[0] : ""
        }),
        _react2.default.createElement(_translationNode2.default, {
          labelClassName: "rainmaker-small-font complaint-timeline-comments",
          containerStyle: { width: "192px" },
          label:
            comments && comments.split(";")[1]
              ? '" ' + comments.split(";")[1] + ' "'
              : ""
        }),
        currentStatus === "rejected" &&
          (role === "citizen" || role === "csr") &&
          rejectStatusCount === 1 &&
          _react2.default.createElement(
            "div",
            {
              className: "complaint-details-timline-button",
              onClick: function onClick(e) {
                role === "citizen"
                  ? changeRoute.push(
                      "/reopen-complaint/" + encodeURIComponent(complaintNo)
                    )
                  : changeRoute.push(
                      "/reopen-complaint/" + encodeURIComponent(complaintNo)
                    );
              }
            },
            _react2.default.createElement(_translationNode2.default, {
              label: "CS_COMPLAINT_DETAILS_REOPEN",
              fontSize: "12px",
              labelStyle: timelineButtonLabelStyle,
              containerStyle: timelineButtonContainerStyle
            })
          )
      );
    // case "UNASSIGNED":
    //   return (
    //     <div className="complaint-timeline-content-section">
    //       <Label labelClassName="rainmaker-small-font" label={getDateFromEpoch(date)} />
    //       <Label labelClassName="dark-color" label="CS_COMPLAINT_DETAILS_COMPLAINT_FILED" />
    //       <Label labelClassName="rainmaker-small-font" label={name || "Amrinder Singh"} />
    //       <div
    //         className="complaint-details-timline-button"
    //         onClick={(e) => {
    //         }}
    //       >
    //         <Icon action="communication" name="call" style={callIconStyle} color={"#ffffff"} />
    //         CALL
    //       </div>
    //     </div>
    //   );
    // case "REASSIGN-REQUESTED":
    //   return (
    //     <div className="complaint-timeline-content-section">
    //       <Label labelClassName="rainmaker-small-font" label={getDateFromEpoch(date)} />
    //       <Label labelClassName="dark-color" label={"CS_COMPLAINT_DETAILS_REASSIGN_REQUESTED"} />
    //       <Label labelClassName="rainmaker-small-font" label={`Reason - ${reason || "Not my responsibility"}`} />
    //     </div>
    //   );
    case "resolved":
      resolveStatusCount++;
      return _react2.default.createElement(
        "div",
        { className: "complaint-timeline-content-section" },
        _react2.default.createElement(_translationNode2.default, {
          labelClassName: "rainmaker-small-font complaint-timeline-date",
          label: (0, _commons.getDateFromEpoch)(date)
        }),
        _react2.default.createElement(_translationNode2.default, {
          labelClassName: "dark-color complaint-timeline-status",
          label: "CS_COMPLAINT_DETAILS_COMPLAINT_RESOLVED"
        }),
        media &&
          _react2.default.createElement(
            "div",
            { style: { display: "flex" } },
            media.map(function(image, index) {
              return (
                (0, _commons.isImage)(image) &&
                _react2.default.createElement(
                  "div",
                  {
                    style: { marginRight: 8 },
                    className: "complaint-detail-detail-section-padding-zero",
                    id:
                      "complaint-details-resolved-" +
                      resolveStatusCount +
                      "-image=" +
                      index,
                    key: index
                  },
                  _react2.default.createElement(_components.Image, {
                    style: {
                      width: "97px",
                      height: "93px"
                    },
                    size: "medium",
                    source: image,
                    onClick: function onClick() {
                      return changeRoute.push("/image?source=" + image);
                    }
                  })
                )
              );
            })
          ),
        _react2.default.createElement(_translationNode2.default, {
          labelClassName: "rainmaker-small-font complaint-timeline-comments",
          containerStyle: { width: "192px" },
          label: comments
        }),
        currentStatus === "resolved" &&
          (role === "citizen" || role === "csr") &&
          resolveStatusCount === 1 &&
          _react2.default.createElement(
            "div",
            { className: "rainmaker-displayInline" },
            role !== "csr" &&
              _react2.default.createElement(
                "div",
                {
                  className: "complaint-details-timline-button",
                  onClick: function onClick(e) {
                    changeRoute.push(
                      "/feedback/" + encodeURIComponent(complaintNo)
                    );
                  }
                },
                _react2.default.createElement(_translationNode2.default, {
                  label: "CS_COMPLAINT_DETAILS_RATE",
                  fontSize: "12px",
                  labelStyle: timelineButtonLabelStyle,
                  containerStyle: timelineButtonContainerStyle
                })
              ),
            _react2.default.createElement(
              "div",
              {
                className: "complaint-details-timline-button",
                onClick: function onClick(e) {
                  role === "citizen"
                    ? changeRoute.push(
                        "/reopen-complaint/" + encodeURIComponent(complaintNo)
                      )
                    : changeRoute.push(
                        "/reopen-complaint/" + encodeURIComponent(complaintNo)
                      );
                }
              },
              _react2.default.createElement(_translationNode2.default, {
                label: "CS_COMPLAINT_DETAILS_REOPEN",
                fontSize: "12px",
                labelStyle: timelineButtonLabelStyle,
                containerStyle: timelineButtonContainerStyle
              })
            )
          )
      );

    case "closed":
      return _react2.default.createElement(
        "div",
        { className: "complaint-timeline-content-section" },
        _react2.default.createElement(_translationNode2.default, {
          labelClassName: "rainmaker-small-font complaint-timeline-date",
          label: (0, _commons.getDateFromEpoch)(date)
        }),
        _react2.default.createElement(_translationNode2.default, {
          labelClassName: "dark-color complaint-timeline-status",
          label: "CS_COMMON_CITIZEN_FEEDBACK"
        }),
        _react2.default.createElement(
          "div",
          { style: { display: "flex" } },
          " ",
          _react2.default.createElement(_translationNode2.default, {
            labelClassName: "rainmaker-small-font complaint-timeline-rating",
            labelStyle: { color: "#22b25f" },
            label: rating + "/5 "
          }),
          " ",
          _react2.default.createElement(_translationNode2.default, {
            labelClassName: "rainmaker-small-font complaint-timeline-feedback",
            label: feedback && " (" + feedback + ")"
          })
        ),
        _react2.default.createElement(_translationNode2.default, {
          labelClassName: "rainmaker-small-font complaint-timeline-comments",
          label: comments ? '" ' + comments + ' "' : ""
        })
      );
  }
};

var DueDate = function DueDate(_ref3) {
  var duedateText = _ref3.duedateText;

  return (
    duedateText &&
    duedateText.slaStatement &&
    _react2.default.createElement(_translationNode2.default, {
      labelStyle: duedateText.slaStatement.includes("Overdue")
        ? { color: "#e74c3c" }
        : { color: "#22b25f" },
      className: "Complaint-details-duedate",
      label: duedateText
    })
  );
};

var ComplaintTimeLine = (function(_Component) {
  (0, _inherits3.default)(ComplaintTimeLine, _Component);

  function ComplaintTimeLine() {
    (0, _classCallCheck3.default)(this, ComplaintTimeLine);
    return (0, _possibleConstructorReturn3.default)(
      this,
      (
        ComplaintTimeLine.__proto__ || Object.getPrototypeOf(ComplaintTimeLine)
      ).apply(this, arguments)
    );
  }

  (0, _createClass3.default)(ComplaintTimeLine, [
    {
      key: "render",
      value: function render() {
        openStatusCount = 0;
        rejectStatusCount = 0;
        resolveStatusCount = 0;
        assigneeStatusCount = 0;
        reassignRequestedCount = 0;
        var _props = this.props,
          status = _props.status,
          history = _props.history,
          role = _props.role,
          timeLine = _props.timeLine,
          feedback = _props.feedback,
          rating = _props.rating,
          filedBy = _props.filedBy,
          filedUserMobileNumber = _props.filedUserMobileNumber,
          timelineSLAStatus = _props.timelineSLAStatus;

        if (
          timeLine &&
          timeLine.length === 1 &&
          timeLine[0].status === "open"
        ) {
          timeLine = [{ status: "pending" }].concat(
            (0, _toConsumableArray3.default)(timeLine)
          );
        }
        var steps = timeLine.map(function(step, key) {
          return {
            props: {
              active: true
            },
            labelProps: {
              icon: _react2.default.createElement(StatusIcon, {
                status: step.status
              })
            },
            contentProps: {
              style: {
                marginTop: "-50px",
                paddingRight: 0
              }
            },
            contentChildren: _react2.default.createElement(StatusContent, {
              stepData: step,
              currentStatus: status.toLowerCase(),
              changeRoute: history,
              feedback: feedback,
              rating: rating,
              role: role,
              filedBy: filedBy,
              filedUserMobileNumber: filedUserMobileNumber
            })
          };
        });

        return _react2.default.createElement(
          "div",
          null,
          _react2.default.createElement(_components.Card, {
            style: {
              paddingBottom: "0px"
            },
            textChildren: _react2.default.createElement(
              "div",
              null,
              _react2.default.createElement(
                "div",
                {
                  className: "rainmaker-displayInline",
                  style: { position: "relative" }
                },
                _react2.default.createElement(_components.Icon, {
                  action: "action",
                  name: "timeline",
                  color: "#767676"
                }),
                " ",
                _react2.default.createElement(_translationNode2.default, {
                  label: "CS_COMPLAINT_DETAILS_COMPLAINT_TIMELINE",
                  containerStyle: { marginLeft: "13px" },
                  labelClassName: "dark-heading"
                }),
                timelineSLAStatus &&
                  role &&
                  role !== "citizen" &&
                  _react2.default.createElement(DueDate, {
                    duedateText: timelineSLAStatus
                  })
              ),
              _react2.default.createElement(
                "div",
                { className: "complaintTimeLineContainer" },
                _react2.default.createElement(_components.TimeLine, {
                  stepperProps: {
                    orientation: "vertical",
                    borderLeft: "1px solid #fe7a51"
                  },
                  steps: steps
                })
              )
            )
          })
        );
      }
    }
  ]);
  return ComplaintTimeLine;
})(_react.Component);

exports.default = ComplaintTimeLine;
