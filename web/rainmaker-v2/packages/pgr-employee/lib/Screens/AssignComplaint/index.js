"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require("babel-runtime/helpers/objectWithoutProperties");

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

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

var _form = require("egov-ui-kit/hocs/form");

var _form2 = _interopRequireDefault(_form);

var _AssignComplaintForm = require("./components/AssignComplaintForm");

var _AssignComplaintForm2 = _interopRequireDefault(_AssignComplaintForm);

var _actions = require("egov-ui-kit/redux/common/actions");

var _filter = require("lodash/filter");

var _filter2 = _interopRequireDefault(_filter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AssignComplaintFormHOC = (0, _form2.default)({ formKey: "assignComplaint" })(_AssignComplaintForm2.default);

var AssignComplaint = function (_Component) {
  (0, _inherits3.default)(AssignComplaint, _Component);

  function AssignComplaint() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, AssignComplaint);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = AssignComplaint.__proto__ || Object.getPrototypeOf(AssignComplaint)).call.apply(_ref, [this].concat(args))), _this), _this.componentDidMount = function () {
      var fetchEmployeeToAssign = _this.props.fetchEmployeeToAssign;

      var queryParams = [{ key: "roleCodes", value: "EMPLOYEE" }];
      fetchEmployeeToAssign(queryParams);
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(AssignComplaint, [{
    key: "render",
    value: function render() {
      var _props = this.props,
          transformedComplaint = _props.transformedComplaint,
          loading = _props.loading,
          rest = (0, _objectWithoutProperties3.default)(_props, ["transformedComplaint", "loading"]);

      return _react2.default.createElement(
        _common.Screen,
        { loading: loading },
        _react2.default.createElement(AssignComplaintFormHOC, (0, _extends3.default)({ complaint: transformedComplaint }, rest))
      );
    }
  }]);
  return AssignComplaint;
}(_react.Component);

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    fetchEmployeeToAssign: function fetchEmployeeToAssign(queryParams, requestBody) {
      return dispatch((0, _actions.fetchEmployeeToAssign)(queryParams, requestBody));
    }
  };
};

var mapStateToProps = function mapStateToProps(state, ownProps) {
  var complaints = state.complaints,
      common = state.common;
  var fetchEmployeeToAssignSuccess = common.fetchEmployeeToAssignSuccess;

  var loading = !fetchEmployeeToAssignSuccess;
  var history = ownProps.history;

  var serviceRequestId = ownProps.match.params.serviceRequestId;
  var _state$common = state.common,
      departmentById = _state$common.departmentById,
      designationsById = _state$common.designationsById,
      employeeToAssignById = _state$common.employeeToAssignById;

  var rawAPIData = employeeToAssignById && Object.keys(employeeToAssignById).map(function (item, index) {
    return employeeToAssignById[item];
  });
  var selectedComplaint = complaints["byId"][decodeURIComponent(window.location.href.split("/").pop())];
  var complaintTenantId = selectedComplaint && selectedComplaint.tenantId;
  var APIData = (0, _filter2.default)(rawAPIData, function (item) {
    return item.tenantId === complaintTenantId;
  });
  var transformedComplaint = {
    header: selectedComplaint && selectedComplaint.serviceCode,
    address: selectedComplaint && selectedComplaint.address
  };
  return { designationsById: designationsById, departmentById: departmentById, APIData: APIData, transformedComplaint: transformedComplaint, history: history, serviceRequestId: serviceRequestId, loading: loading };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(AssignComplaint);