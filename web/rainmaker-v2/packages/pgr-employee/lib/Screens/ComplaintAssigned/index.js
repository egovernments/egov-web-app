"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

var _components = require("components");

var _translationNode = require("egov-ui-kit/utils/translationNode");

var _translationNode2 = _interopRequireDefault(_translationNode);

var _common = require("modules/common");

var _actions = require("egov-ui-kit/redux/complaints/actions");

var _reactRedux = require("react-redux");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ComplaintAssigned = function (_Component) {
  (0, _inherits3.default)(ComplaintAssigned, _Component);

  function ComplaintAssigned() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, ComplaintAssigned);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = ComplaintAssigned.__proto__ || Object.getPrototypeOf(ComplaintAssigned)).call.apply(_ref, [this].concat(args))), _this), _this.componentDidMount = function () {
      var _this$props = _this.props,
          fetchComplaints = _this$props.fetchComplaints,
          match = _this$props.match;

      fetchComplaints([{ key: "serviceRequestId", value: match.params.serviceRequestId }]);
    }, _this.handleComplaintReassigned = function () {
      _this.props.history.push("/all-complaints");
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(ComplaintAssigned, [{
    key: "render",
    value: function render() {
      var _props = this.props,
          employeeDetails = _props.employeeDetails,
          fetchSuccess = _props.fetchSuccess;

      var isReassign = window.location.href.includes("complaint-reassigned") ? true : false;
      return _react2.default.createElement(
        _common.Screen,
        { loading: !fetchSuccess, className: "padding-0" },
        _react2.default.createElement(
          "div",
          { className: "success-message-main-screen" },
          employeeDetails && employeeDetails.employeeName && _react2.default.createElement(_common.SuccessMessage, {
            successmessage: employeeDetails.employeeName && (isReassign ? "Re-Assigned to " : "Assigned to ") + employeeDetails.employeeName,
            secondaryLabel: employeeDetails && employeeDetails.employeeDesignation && employeeDetails.employeeDesignation,
            tertiaryLabel: employeeDetails && employeeDetails.employeeDepartment && employeeDetails.employeeDepartment + " Department",
            icon: _react2.default.createElement(_components.Icon, { action: "navigation", name: "check" }),
            backgroundColor: "#22b25f"
          }),
          _react2.default.createElement(
            "div",
            { className: "responsive-action-button-cont" },
            _react2.default.createElement(_components.Button, {
              id: "resolve-success-continue",
              primary: true,
              label: _react2.default.createElement(_translationNode2.default, { buttonLabel: true, label: "CORE_COMMON_GOTOHOME" }),
              fullWidth: true,
              onClick: this.handleComplaintReassigned,
              className: "responsive-action-button"
            })
          )
        )
      );
    }
  }]);
  return ComplaintAssigned;
}(_react.Component);

var getNameFromId = function getNameFromId(obj, id, defaultValue) {
  return obj && id && obj[id] ? obj[id].name : defaultValue;
};

var mapStateToProps = function mapStateToProps(state, ownProps) {
  var complaints = state.complaints;
  var _state$common = state.common,
      departmentById = _state$common.departmentById,
      designationsById = _state$common.designationsById,
      employeeById = _state$common.employeeById;

  var selectedComplaint = complaints["byId"][decodeURIComponent(window.location.href.split("/").pop())];
  var selectedEmployee = employeeById[selectedComplaint.actions[0].assignee];
  var employeeDetails = {
    employeeName: selectedEmployee && selectedEmployee.name,
    employeeDesignation: selectedEmployee && getNameFromId(designationsById, selectedEmployee.assignments[0].designation, "Engineer"),
    employeeDepartment: selectedEmployee && getNameFromId(departmentById, selectedEmployee.assignments[0].department, "Administration")
  };
  var fetchSuccess = employeeDetails && employeeDetails.employeeName ? true : false;
  return { employeeDetails: employeeDetails, fetchSuccess: fetchSuccess };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    fetchComplaints: function fetchComplaints(criteria) {
      return dispatch((0, _actions.fetchComplaints)(criteria));
    }
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(ComplaintAssigned);