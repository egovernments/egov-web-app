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

var _reactRedux = require("react-redux");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var withoutAuthorization = function withoutAuthorization(redirectionUrl) {
  return function (Component) {
    var Wrapper = function (_React$Component) {
      (0, _inherits3.default)(Wrapper, _React$Component);

      function Wrapper() {
        (0, _classCallCheck3.default)(this, Wrapper);
        return (0, _possibleConstructorReturn3.default)(this, (Wrapper.__proto__ || Object.getPrototypeOf(Wrapper)).apply(this, arguments));
      }

      (0, _createClass3.default)(Wrapper, [{
        key: "componentDidMount",
        value: function componentDidMount() {
          if (this.props.authenticated) {
            this.props.history.push(redirectionUrl);
          }
        }
      }, {
        key: "render",
        value: function render() {
          return _react2.default.createElement(Component, this.props);
        }
      }]);
      return Wrapper;
    }(_react2.default.Component);

    var mapStateToProps = function mapStateToProps(state) {
      var authenticated = state.auth.authenticated;

      return { authenticated: authenticated };
    };
    return (0, _reactRedux.connect)(mapStateToProps)(Wrapper);
  };
};

exports.default = withoutAuthorization;