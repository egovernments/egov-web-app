"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require("babel-runtime/helpers/objectWithoutProperties");

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require("react-redux");

var _commons = require("./commons");

var _components = require("components");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mapStateToProps = function mapStateToProps(state, ownProps) {
  var label = ownProps.label,
      rest = (0, _objectWithoutProperties3.default)(ownProps, ["label"]);
  var localizationLabels = state.app.localizationLabels;

  var translatedLabel = (0, _commons.getTranslatedLabel)(label, localizationLabels);
  return (0, _extends3.default)({}, rest, { label: translatedLabel });
};

exports.default = (0, _reactRedux.connect)(mapStateToProps)(_components.Label);