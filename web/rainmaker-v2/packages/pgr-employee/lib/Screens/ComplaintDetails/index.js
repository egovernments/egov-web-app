"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _common = require("modules/common");

var _components = require("components");

var _Location_pin = require("egov-ui-kit/assets/Location_pin.svg");

var _Location_pin2 = _interopRequireDefault(_Location_pin);

var _actions = require("egov-ui-kit/redux/form/actions");

var _commons = require("egov-ui-kit/utils/commons");

var _actions2 = require("egov-ui-kit/redux/complaints/actions");

var _reactRedux = require("react-redux");

require("./index.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ComplaintDetails = function (_Component) {
  (0, _inherits3.default)(ComplaintDetails, _Component);

  function ComplaintDetails() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, ComplaintDetails);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = ComplaintDetails.__proto__ || Object.getPrototypeOf(ComplaintDetails)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      openMap: false
    }, _this.redirectToMap = function (isOpen) {
      var pathName = _this.props.history.location.pathname;
      if (isOpen === true) _this.props.history.push(pathName + "?map");else if (isOpen === false) _this.props.history.goBack();
    }, _this.btnOneOnClick = function (complaintNo, label) {
      //Action for first button
      var history = _this.props.history;

      switch (label) {
        case "ES_REJECT_BUTTON":
          history.push("/reject-complaint/" + complaintNo);
          break;
        case "ES_REQUEST_REQUEST_RE_ASSIGN":
          history.push("/request-reassign/" + complaintNo);
          break;
      }
    }, _this.btnTwoOnClick = function (complaintNo, label) {
      //Action for second button
      var history = _this.props.history;

      switch (label) {
        case "ES_COMMON_ASSIGN":
          history.push("/assign-complaint/" + complaintNo);
          break;
        case "ES_COMMON_REASSIGN":
          history.push("/reassign-complaint/" + complaintNo);
          break;
        case "ES_RESOLVE_MARK_RESOLVED":
          history.push("/complaint-resolved/" + complaintNo);
          break;
      }
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(ComplaintDetails, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _props = this.props,
          fetchComplaints = _props.fetchComplaints,
          match = _props.match,
          resetFiles = _props.resetFiles;

      fetchComplaints([{ key: "serviceRequestId", value: match.params.serviceRequestId }]);
      if (this.props.form && this.props.form.complaintResolved) {
        resetFiles("complaintResolved");
      }
      var details = this.state.details;

      if (this.props.location && this.props.location.search.split("=")[1] === "rejected") {
        this.setState({
          status: {
            status: "Rejected",
            message: "JR.INSPECTOR - J KUMAR",
            bgColor: "#f5a623"
          },
          details: (0, _extends3.default)({}, details, {
            status: "Rejected"
          })
        });
      } else if (this.props.location && this.props.location.search.split("=")[1] === "filed") {
        this.setState({
          status: {
            status: "Submitted",
            message: "JR.INSPECTOR - J KUMAR",
            bgColor: "#f5a623"
          },
          details: (0, _extends3.default)({}, details, {
            status: "Submitted"
          })
        });
      } else if (this.props.location && this.props.location.search.split("=")[1] === "unassigned") {
        this.setState({
          status: {
            status: "Unassigned",
            message: "Jr.INSPECTOR - J KUMAR",
            bgColor: "#f5a623"
          },
          details: (0, _extends3.default)({}, details, {
            status: "Unassigned"
          }),
          role: "AO",
          hasComments: false
        });
      } else if (this.props.location && this.props.location.search.split("=")[1] === "unassigned&reassign") {
        this.setState({
          status: {
            status: "Reassign",
            message: "Jr.INSPECTOR - J KUMAR",
            bgColor: "#f5a623"
          },
          details: (0, _extends3.default)({}, details, {
            status: "Reassign"
          }),
          role: "AO"
        });
      } else if (this.props.location && this.props.location.search.split("=")[1] === "assigned") {
        this.setState({
          status: {
            status: "Assign",
            message: "Jr.INSPECTOR - J KUMAR",
            bgColor: "#f5a623"
          },
          details: (0, _extends3.default)({}, details, {
            status: "Assign"
          }),
          role: "AO"
        });
      }
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.history.location.search === "?map") {
        this.setState({ openMap: true });
      } else {
        this.setState({ openMap: false });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _state = this.state,
          comments = _state.comments,
          openMap = _state.openMap;
      var _props$transformedCom = this.props.transformedComplaint,
          complaint = _props$transformedCom.complaint,
          timeLine = _props$transformedCom.timeLine;
      var _props2 = this.props,
          role = _props2.role,
          serviceRequestId = _props2.serviceRequestId,
          history = _props2.history,
          isAssignedToEmployee = _props2.isAssignedToEmployee;

      var btnOneLabel = "";
      var btnTwoLabel = "";
      var action = void 0;
      var complaintLoc = {};
      if (complaint && complaint.latitude) {
        complaintLoc = { lat: complaint.latitude, lng: complaint.longitude };
      }
      if (complaint) {
        if (role === "ao") {
          if (complaint.complaintStatus.toLowerCase() === "unassigned") {
            btnOneLabel = "ES_REJECT_BUTTON";
            btnTwoLabel = "ES_COMMON_ASSIGN";
          } else if (complaint.complaintStatus.toLowerCase() === "reassign") {
            btnOneLabel = "ES_REJECT_BUTTON";
            btnTwoLabel = "ES_COMMON_REASSIGN";
          }
        } else if (role === "employee") {
          if (complaint.complaintStatus.toLowerCase() === "assigned") {
            btnOneLabel = "ES_REQUEST_REQUEST_RE_ASSIGN";
            btnTwoLabel = "ES_RESOLVE_MARK_RESOLVED";
          }
        }
      }
      if (timeLine && timeLine[0]) {
        action = timeLine[0].action;
      }
      return _react2.default.createElement(
        "div",
        null,
        _react2.default.createElement(
          _common.Screen,
          null,
          complaint && !openMap && _react2.default.createElement(
            "div",
            null,
            _react2.default.createElement(
              "div",
              { className: "form-without-button-cont-generic" },
              _react2.default.createElement(_common.Details, (0, _extends3.default)({}, complaint, {
                role: role,
                history: history,
                mapAction: true,
                redirectToMap: this.redirectToMap,
                action: action,
                complaintLoc: complaintLoc
              })),
              _react2.default.createElement(_common.ComplaintTimeLine, {
                status: complaint.status,
                timelineSLAStatus: complaint.timelineSLAStatus,
                timeLine: timeLine,
                history: history,
                handleFeedbackOpen: this.handleFeedbackOpen,
                role: role,
                feedback: complaint ? complaint.feedback : "",
                rating: complaint ? complaint.rating : "",
                filedBy: complaint && complaint.filedBy ? complaint.filedBy : "",
                filedUserMobileNumber: complaint ? complaint.filedUserMobileNumber : ""
              }),
              _react2.default.createElement(_common.Comments, { comments: comments, role: role, isAssignedToEmployee: isAssignedToEmployee })
            ),
            _react2.default.createElement(
              "div",
              null,
              role === "ao" && complaint.complaintStatus.toLowerCase() !== "assigned" && complaint.complaintStatus.toLowerCase() !== "closed" || role === "employee" && isAssignedToEmployee && complaint.complaintStatus.toLowerCase() === "assigned" && complaint.complaintStatus.toLowerCase() !== "closed" ? _react2.default.createElement(_common.ActionButton, {
                btnOneLabel: btnOneLabel,
                btnOneOnClick: function btnOneOnClick() {
                  return _this2.btnOneOnClick(serviceRequestId, btnOneLabel);
                },
                btnTwoLabel: btnTwoLabel,
                btnTwoOnClick: function btnTwoOnClick() {
                  return _this2.btnTwoOnClick(serviceRequestId, btnTwoLabel);
                }
              }) : ""
            )
          )
        ),
        complaintLoc.lat && openMap && _react2.default.createElement(
          "div",
          null,
          _react2.default.createElement(
            "div",
            { className: "back-btn", style: { top: 32 } },
            _react2.default.createElement(_components.Icon, {
              className: "mapBackBtn",
              onClick: function onClick() {
                _this2.redirectToMap(false);
              },
              style: {
                height: 24,
                width: 24,
                color: "#484848"
              },
              action: "navigation",
              name: "arrow-back"
            })
          ),
          _react2.default.createElement(_components.MapLocation, { currLoc: complaintLoc, icon: _Location_pin2.default, hideTerrainBtn: true, viewLocation: true })
        )
      );
    }
  }]);
  return ComplaintDetails;
}(_react.Component);

var roleFromUserInfo = function roleFromUserInfo() {
  var roles = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var role = arguments[1];

  var roleCodes = roles.map(function (role, index) {
    return role.code;
  });
  return roleCodes && roleCodes.length && roleCodes.indexOf(role) > -1 ? true : false;
};

//Don't Delete this
var getLatestStatus = function getLatestStatus(status) {
  var transformedStatus = "";
  switch (status.toLowerCase()) {
    case "open":
    case "new":
      transformedStatus = "UNASSIGNED";
      break;
    case "resolved":
    case "rejected":
    case "closed":
      transformedStatus = "CLOSED";
      break;
    case "assigned":
      transformedStatus = "ASSIGNED";
      break;
    case "reassignrequested":
      transformedStatus = "REASSIGN";
      break;
    default:
      transformedStatus = "CLOSED";
      break;
  }
  return transformedStatus;
};
var mapCitizenIdToName = function mapCitizenIdToName(citizenObjById, id) {
  return citizenObjById && citizenObjById[id] ? citizenObjById[id].name : "";
};
var mapCitizenIdToMobileNumber = function mapCitizenIdToMobileNumber(citizenObjById, id) {
  return citizenObjById && citizenObjById[id] ? citizenObjById[id].mobileNumber : "";
};
var gro = "";
var mapStateToProps = function mapStateToProps(state, ownProps) {
  var complaints = state.complaints,
      common = state.common,
      auth = state.auth,
      form = state.form;
  var id = auth.userInfo.id;

  var _ref2 = common || {},
      citizenById = _ref2.citizenById;

  var _ref3 = common || {},
      employeeById = _ref3.employeeById,
      departmentById = _ref3.departmentById,
      designationsById = _ref3.designationsById;

  var categoriesById = complaints.categoriesById;
  var userInfo = state.auth.userInfo;

  var serviceRequestId = ownProps.match.params.serviceRequestId;
  var selectedComplaint = complaints["byId"][decodeURIComponent(ownProps.match.params.serviceRequestId)];
  var filedUserName = selectedComplaint && selectedComplaint.citizen && selectedComplaint.citizen.name;
  var isFiledByCSR = selectedComplaint && selectedComplaint.actions && selectedComplaint.actions[selectedComplaint.actions.length - 1].by && selectedComplaint.actions[selectedComplaint.actions.length - 1].by.split(":")[1] && selectedComplaint.actions[selectedComplaint.actions.length - 1].by.split(":")[1] === "Citizen Service Representative";
  var role = roleFromUserInfo(userInfo.roles, "GRO") ? "ao" : roleFromUserInfo(userInfo.roles, "CSR") ? "csr" : "employee";
  var isAssignedToEmployee = true;
  if (selectedComplaint) {
    var userId = selectedComplaint && selectedComplaint.actions && selectedComplaint.actions[selectedComplaint.actions.length - 1].by.split(":")[0];
    var details = {
      status: selectedComplaint.status,
      complaint: (0, _commons.mapCompIDToName)(complaints.categoriesById, selectedComplaint.serviceCode),
      applicationNo: selectedComplaint.serviceRequestId,
      description: selectedComplaint.description,
      submittedDate: (0, _commons.getDateFromEpoch)(selectedComplaint.auditDetails.createdTime),
      address: selectedComplaint.address,
      latitude: selectedComplaint.lat,
      longitude: selectedComplaint.long,
      images: (0, _commons.fetchImages)(selectedComplaint.actions).filter(function (imageSource) {
        return (0, _commons.isImage)(imageSource);
      }),
      complaintStatus: selectedComplaint.status && getLatestStatus(selectedComplaint.status),
      feedback: selectedComplaint.feedback,
      rating: selectedComplaint.rating,
      //filedBy: userId && mapCitizenIdToName(citizenById, userId),
      filedBy: filedUserName ? isFiledByCSR ? filedUserName + " @CSR" : filedUserName : null,

      //filedUserMobileNumber: userId && mapCitizenIdToMobileNumber(citizenById, userId),
      filedUserMobileNumber: selectedComplaint && selectedComplaint.citizen && selectedComplaint.citizen.mobileNumber,
      timelineSLAStatus: (0, _commons.returnSLAStatus)((0, _commons.getPropertyFromObj)(categoriesById, selectedComplaint.serviceCode, "slaHours", "NA"), selectedComplaint.auditDetails.createdTime)
    };

    var timeLine = [];
    timeLine = selectedComplaint.actions.filter(function (action) {
      return action.status && action.status;
    });
    isAssignedToEmployee = id == (0, _commons.findLatestAssignee)(timeLine) ? true : false; //not checking for type equality due to mismatch
    timeLine.map(function (action) {
      if (action && action.status && action.status === "assigned") {
        var assignee = action.assignee;
        gro = action.by.split(":")[0];
        var selectedEmployee = employeeById && assignee && employeeById[assignee];
        action.employeeName = assignee && (0, _commons.getPropertyFromObj)(employeeById, assignee, "name", "");
        action.employeeMobileNumber = assignee && (0, _commons.getPropertyFromObj)(employeeById, assignee, "mobileNumber", "");
        action.employeeDesignation = selectedEmployee && (0, _commons.getPropertyFromObj)(designationsById, selectedEmployee.assignments[0].designation, "name", "");
        action.employeeDepartment = selectedEmployee && (0, _commons.getPropertyFromObj)(departmentById, selectedEmployee.assignments[0].department, "name", "");
        action.groName = assignee && (0, _commons.getPropertyFromObj)(employeeById, gro, "name", "");
        action.groDesignation = assignee && (0, _commons.getPropertyFromObj)(designationsById, employeeById && employeeById[gro] && employeeById[gro].assignments[0].designation, "name", "");
        action.groMobileNumber = assignee && (0, _commons.getPropertyFromObj)(employeeById, gro, "mobileNumber", "");
      } else if (action && action.status && action.status === "reassignrequested") {
        var _assignee = action.by.split(":")[0];
        action.employeeMobileNumber = _assignee && (0, _commons.getPropertyFromObj)(employeeById, _assignee, "mobileNumber", "");
      }
    });

    var transformedComplaint = {
      complaint: details,
      timeLine: timeLine
    };
    return { form: form, transformedComplaint: transformedComplaint, role: role, serviceRequestId: serviceRequestId, isAssignedToEmployee: isAssignedToEmployee };
  } else {
    return { form: form, transformedComplaint: {}, role: role, serviceRequestId: serviceRequestId, isAssignedToEmployee: isAssignedToEmployee };
  }
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    fetchComplaints: function fetchComplaints(criteria) {
      return dispatch((0, _actions2.fetchComplaints)(criteria));
    },
    resetFiles: function resetFiles(formKey) {
      return dispatch((0, _actions.resetFiles)(formKey));
    }
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(ComplaintDetails);