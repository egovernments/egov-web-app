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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PlotDetails = function (_React$Component) {
  (0, _inherits3.default)(PlotDetails, _React$Component);

  function PlotDetails() {
    (0, _classCallCheck3.default)(this, PlotDetails);
    return (0, _possibleConstructorReturn3.default)(this, (PlotDetails.__proto__ || Object.getPrototypeOf(PlotDetails)).apply(this, arguments));
  }

  (0, _createClass3.default)(PlotDetails, [{
    key: "render",
    value: function render() {
      var Component = this.props.component;

      return _react2.default.createElement(
        "div",
        null,
        _react2.default.createElement(Component, this.props)
      );
    }
  }]);
  return PlotDetails;
}(_react2.default.Component);

exports.default = PlotDetails;