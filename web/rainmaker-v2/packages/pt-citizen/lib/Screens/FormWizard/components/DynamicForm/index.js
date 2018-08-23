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

var _form = require("egov-ui-kit/hocs/form");

var _form2 = _interopRequireDefault(_form);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DynamicFormHoc = function (_React$Component) {
  (0, _inherits3.default)(DynamicFormHoc, _React$Component);

  function DynamicFormHoc() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, DynamicFormHoc);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = DynamicFormHoc.__proto__ || Object.getPrototypeOf(DynamicFormHoc)).call.apply(_ref, [this].concat(args))), _this), _this.state = { Component: DynamicFormHoc.Component }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(DynamicFormHoc, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _props = this.props,
          formObject = _props.formObject,
          Form = _props.componet;

      var Component = (0, _form2.default)((0, _extends3.default)({}, formObject))(Form);
      this.setState({
        Component: Component
      });
    }
  }, {
    key: "render",
    value: function render() {
      var Component = this.state.Component;

      if (Component) {
        return _react2.default.createElement(Component, this.props.props);
      }
      return null;
    }
  }]);
  return DynamicFormHoc;
}(_react2.default.Component);

DynamicFormHoc.Component = null;
exports.default = DynamicFormHoc;