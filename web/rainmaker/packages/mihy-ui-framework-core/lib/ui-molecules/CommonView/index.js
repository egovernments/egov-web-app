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

var _RenderScreen = require("../RenderScreen");

var _RenderScreen2 = _interopRequireDefault(_RenderScreen);

var _Container = require("../../ui-atoms/Layout/Container");

var _Container2 = _interopRequireDefault(_Container);

require("./index.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CommonView = function (_React$Component) {
  (0, _inherits3.default)(CommonView, _React$Component);

  function CommonView() {
    (0, _classCallCheck3.default)(this, CommonView);
    return (0, _possibleConstructorReturn3.default)(this, (CommonView.__proto__ || Object.getPrototypeOf(CommonView)).apply(this, arguments));
  }

  (0, _createClass3.default)(CommonView, [{
    key: "render",
    value: function render() {
      var _props = this.props,
          components = _props.components,
          uiFramework = _props.uiFramework,
          onFieldChange = _props.onFieldChange,
          onComponentClick = _props.onComponentClick,
          preparedFinalObject = _props.preparedFinalObject;

      return _react2.default.createElement(
        _Container2.default,
        { className: "main-route" },
        _react2.default.createElement(_RenderScreen2.default, {
          components: components,
          uiFramework: uiFramework,
          onFieldChange: onFieldChange,
          onComponentClick: onComponentClick,
          preparedFinalObject: preparedFinalObject
        })
      );
    }
  }]);
  return CommonView;
}(_react2.default.Component);

exports.default = CommonView;