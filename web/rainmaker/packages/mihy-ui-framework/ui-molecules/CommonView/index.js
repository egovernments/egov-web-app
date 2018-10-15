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

var _uiContainers = require("../../ui-containers");

var _LoadingIndicator = require("../../ui-molecules/LoadingIndicator");

var _LoadingIndicator2 = _interopRequireDefault(_LoadingIndicator);

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
          preparedFinalObject = _props.preparedFinalObject,
          screenKey = _props.screenKey,
          toast = _props.toast,
          spinner = _props.spinner;
      var errorType = toast.errorType,
          message = toast.message,
          open = toast.open;

      return _react2.default.createElement(
        "div",
        null,
        _react2.default.createElement(_RenderScreen2.default, {
          components: components,
          uiFramework: uiFramework,
          onFieldChange: onFieldChange,
          onComponentClick: onComponentClick,
          preparedFinalObject: preparedFinalObject,
          screenKey: screenKey
        }),
        open && _react2.default.createElement(_uiContainers.SnackbarContainer, {
          variant: errorType,
          message: message,
          open: open
        }),
        spinner && _react2.default.createElement(_LoadingIndicator2.default, null)
      );
    }
  }]);
  return CommonView;
}(_react2.default.Component);

exports.default = CommonView;