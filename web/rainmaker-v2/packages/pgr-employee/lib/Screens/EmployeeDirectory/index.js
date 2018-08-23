"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

var _ListCard = require("../AssignComplaint/components/ListCard");

var _ListCard2 = _interopRequireDefault(_ListCard);

require("./index.css");

var _reactRedux = require("react-redux");

var _actions = require("egov-ui-kit/redux/form/actions");

var _actions2 = require("egov-ui-kit/redux/common/actions");

var _common = require("modules/common");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var EmployeeDirectory = function (_Component) {
  (0, _inherits3.default)(EmployeeDirectory, _Component);

  function EmployeeDirectory() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, EmployeeDirectory);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = EmployeeDirectory.__proto__ || Object.getPrototypeOf(EmployeeDirectory)).call.apply(_ref, [this].concat(args))), _this), _this.componentDidMount = function () {
      var fetchEmployees = _this.props.fetchEmployees;

      fetchEmployees();
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(EmployeeDirectory, [{
    key: "render",
    value: function render() {
      var _props = this.props,
          loading = _props.loading,
          rest = (0, _objectWithoutProperties3.default)(_props, ["loading"]);

      return _react2.default.createElement(
        _common.Screen,
        { loading: loading, className: "employee-directory-main-card" },
        _react2.default.createElement(_ListCard2.default, rest)
      );
    }
  }]);
  return EmployeeDirectory;
}(_react.Component);

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    handleFieldChange: function handleFieldChange(formKey, fieldKey, value) {
      return dispatch((0, _actions.handleFieldChange)(formKey, fieldKey, value));
    },
    submitForm: function submitForm(formKey) {
      return dispatch((0, _actions.submitForm)(formKey));
    },
    initForm: function initForm(form) {
      return dispatch((0, _actions.initForm)(form));
    },
    fetchEmployees: function fetchEmployees() {
      return dispatch((0, _actions2.fetchEmployees)());
    }
  };
};

var mapStateToProps = function mapStateToProps(state, ownProps) {
  var _state$common = state.common,
      departmentById = _state$common.departmentById,
      designationsById = _state$common.designationsById,
      employeeById = _state$common.employeeById,
      employeeFetchSuccess = _state$common.employeeFetchSuccess;

  var loading = !employeeFetchSuccess;
  var APIData = employeeById && Object.keys(employeeById).map(function (item, index) {
    return employeeById[item];
  });

  return { designationsById: designationsById, departmentById: departmentById, APIData: APIData, loading: loading };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(EmployeeDirectory);