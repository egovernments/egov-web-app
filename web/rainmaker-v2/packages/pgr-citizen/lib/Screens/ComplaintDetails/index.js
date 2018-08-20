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

var _reactRedux = require("react-redux");

var _common = require("modules/common");

var _actions = require("egov-ui-kit/redux/form/actions");

var _actions2 = require("egov-ui-kit/redux/complaints/actions");

var _commons = require("egov-ui-kit/utils/commons");

require("./index.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ComplaintDetails = function (_Component) {
  (0, _inherits3.default)(ComplaintDetails, _Component);

  function ComplaintDetails() {
    (0, _classCallCheck3.default)(this, ComplaintDetails);
    return (0, _possibleConstructorReturn3.default)(this, (ComplaintDetails.__proto__ || Object.getPrototypeOf(ComplaintDetails)).apply(this, arguments));
  }

  (0, _createClass3.default)(ComplaintDetails, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _props = this.props,
          fetchComplaints = _props.fetchComplaints,
          match = _props.match,
          resetFiles = _props.resetFiles;

      fetchComplaints([{ key: "serviceRequestId", value: match.params.serviceRequestId }]);
      if (this.props.form && this.props.form.complaint) {
        resetFiles("complaint");
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _props$transformedCom = this.props.transformedComplaint,
          complaint = _props$transformedCom.complaint,
          timeLine = _props$transformedCom.timeLine;
      var history = this.props.history;

      var action = void 0;
      if (timeLine && timeLine[0]) {
        action = timeLine[0].action;
      }
      return _react2.default.createElement(
        _common.Screen,
        { className: "citizen-screen-bottom-padding-clear" },
        complaint && _react2.default.createElement(
          "div",
          { className: "form-without-button-cont-generic" },
          _react2.default.createElement(_common.Details, (0, _extends3.default)({}, complaint, { action: action, history: history })),
          _react2.default.createElement(_common.ComplaintTimeLine, {
            status: complaint.status,
            timeLine: timeLine,
            history: history,
            feedback: complaint ? complaint.feedback : "",
            rating: complaint ? complaint.rating : "",
            role: "citizen"
          }),
          _react2.default.createElement(_common.Comments, { role: "citizen" })
        )
      );
    }
  }]);
  return ComplaintDetails;
}(_react.Component);

var gro = "";
var mapStateToProps = function mapStateToProps(state, ownProps) {
  var complaints = state.complaints,
      common = state.common,
      form = state.form;

  var _ref = common || {},
      employeeById = _ref.employeeById,
      departmentById = _ref.departmentById,
      designationsById = _ref.designationsById;

  var selectedComplaint = complaints["byId"][decodeURIComponent(ownProps.match.params.serviceRequestId)];
  if (selectedComplaint) {
    var details = {
      status: selectedComplaint.status,
      complaint: (0, _commons.mapCompIDToName)(complaints.categoriesById, selectedComplaint.serviceCode),
      applicationNo: selectedComplaint.serviceRequestId,
      description: selectedComplaint.description,
      submittedDate: (0, _commons.getDateFromEpoch)(selectedComplaint.auditDetails.createdTime),
      address: selectedComplaint.address,
      images: (0, _commons.fetchImages)(selectedComplaint.actions).filter(function (imageSource) {
        return (0, _commons.isImage)(imageSource);
      }),
      feedback: selectedComplaint.feedback,
      rating: selectedComplaint.rating
    };
    var timeLine = [];
    timeLine = selectedComplaint && selectedComplaint.actions.filter(function (action) {
      return action.status && action.status;
    });
    timeLine.map(function (action) {
      if (action && action.status && action.status === "assigned") {
        var assignee = action.assignee;
        gro = action.by.split(":")[0];
        var selectedEmployee = employeeById && assignee && employeeById[assignee];
        action.employeeName = assignee && (0, _commons.getPropertyFromObj)(employeeById, assignee, "name", "");
        action.employeeDesignation = selectedEmployee && (0, _commons.getPropertyFromObj)(designationsById, selectedEmployee.assignments[0].designation, "name", "");
        action.employeeDepartment = selectedEmployee && (0, _commons.getPropertyFromObj)(departmentById, selectedEmployee.assignments[0].department, "name", "");
        action.employeeMobileNumber = assignee && (0, _commons.getPropertyFromObj)(employeeById, assignee, "mobileNumber", "");
      }
      if (action && action.status && (action.status === "reassignrequested" || action.action === "reopen")) {
        action.groName = gro && (0, _commons.getPropertyFromObj)(employeeById, gro, "name", "");
        action.groMobileNumber = gro && (0, _commons.getPropertyFromObj)(employeeById, gro, "mobileNumber", "");
      }
    });
    var transformedComplaint = {
      complaint: details,
      timeLine: timeLine
    };

    return { form: form, transformedComplaint: transformedComplaint };
  } else {
    return { form: form, transformedComplaint: {} };
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