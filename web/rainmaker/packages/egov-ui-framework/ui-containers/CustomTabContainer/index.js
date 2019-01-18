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

var _RenderScreen = require("../../ui-molecules/RenderScreen");

var _RenderScreen2 = _interopRequireDefault(_RenderScreen);

var _CustomTab = require("../../ui-molecules/CustomTab");

var _CustomTab2 = _interopRequireDefault(_CustomTab);

var _reactRedux = require("react-redux");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CustomTabContainer = function (_React$Component) {
  (0, _inherits3.default)(CustomTabContainer, _React$Component);

  function CustomTabContainer() {
    (0, _classCallCheck3.default)(this, CustomTabContainer);
    return (0, _possibleConstructorReturn3.default)(this, (CustomTabContainer.__proto__ || Object.getPrototypeOf(CustomTabContainer)).apply(this, arguments));
  }

  (0, _createClass3.default)(CustomTabContainer, [{
    key: "render",
    value: function render() {
      var _props = this.props,
          uiFramework = _props.uiFramework,
          onFieldChange = _props.onFieldChange,
          onComponentClick = _props.onComponentClick,
          screenKey = _props.screenKey;

      console.log(this.props);
      var transFormedProps = (0, _extends3.default)({}, this.props, {
        tabs: this.props.tabs.map(function (tab, key) {
          return (0, _extends3.default)({}, tab, {
            tabContent: _react2.default.createElement(_RenderScreen2.default, {
              key: key,
              screenKey: screenKey,
              components: tab.tabContent,
              uiFramework: uiFramework,
              onFieldChange: onFieldChange,
              onComponentClick: onComponentClick
            })
          });
        })
      });
      return _react2.default.createElement(_CustomTab2.default, transFormedProps);
    }
  }]);
  return CustomTabContainer;
}(_react2.default.Component);

var mapStateToProps = function mapStateToProps(state) {
  var screenConfiguration = state.screenConfiguration;
  var screenConfig = screenConfiguration.screenConfig,
      preparedFinalObject = screenConfiguration.preparedFinalObject;

  return { screenConfig: screenConfig, preparedFinalObject: preparedFinalObject, state: state };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return null;
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(CustomTabContainer);