"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// uses bootstrap classes img-responsive img-circle
var Image = function Image(_ref) {
  var _ref$circular = _ref.circular,
      circular = _ref$circular === undefined ? false : _ref$circular,
      _ref$className = _ref.className,
      className = _ref$className === undefined ? "" : _ref$className,
      style = _ref.style,
      source = _ref.source,
      height = _ref.height,
      width = _ref.width,
      onClick = _ref.onClick;

  var classNames = circular ? "img-responsive img-circle" : "img-responsive";
  classNames = className ? classNames + " " + className : classNames;
  return _react2.default.createElement("img", { className: classNames, style: style, src: source, height: height, width: width, onClick: onClick });
};

Image.propTypes = {
  source: _propTypes2.default.string,
  circular: _propTypes2.default.bool,
  className: _propTypes2.default.string,
  style: _propTypes2.default.object,
  width: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),
  height: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
};

exports.default = Image;