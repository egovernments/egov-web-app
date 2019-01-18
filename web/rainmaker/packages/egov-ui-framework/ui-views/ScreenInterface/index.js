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

var _uiHocs = require("../../ui-hocs");

var _CommonView = require("../../ui-molecules/CommonView");

var _CommonView2 = _interopRequireDefault(_CommonView);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ScreenInterface = function (_React$Component) {
  (0, _inherits3.default)(ScreenInterface, _React$Component);

  function ScreenInterface(props) {
    (0, _classCallCheck3.default)(this, ScreenInterface);

    var _this = (0, _possibleConstructorReturn3.default)(this, (ScreenInterface.__proto__ || Object.getPrototypeOf(ScreenInterface)).call(this, props));

    _this.state = { view: null };
    return _this;
  }

  (0, _createClass3.default)(ScreenInterface, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var match = this.props.match;
      var params = match.params;
      var path = params.path,
          screenKey = params.screenKey,
          hasRemoteConfig = params.hasRemoteConfig;

      if (path && screenKey) {
        this.setState({ view: (0, _uiHocs.screenHoc)({ path: path, screenKey: screenKey, hasRemoteConfig: hasRemoteConfig })(_CommonView2.default) });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var View = this.state.view; // Assigning to new variable names @see: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment

      return View && _react2.default.createElement(View, null);
    }
  }]);
  return ScreenInterface;
}(_react2.default.Component);

exports.default = ScreenInterface;