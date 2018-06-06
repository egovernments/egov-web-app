"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

require("./index.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CardUi = function CardUi(_ref) {
  var id = _ref.id,
      card = _ref.card,
      _ref$style = _ref.style,
      style = _ref$style === undefined ? {} : _ref$style,
      textChildren = _ref.textChildren,
      _ref$className = _ref.className,
      className = _ref$className === undefined ? "" : _ref$className,
      onClick = _ref.onClick;

  return _react2.default.createElement(
    "div",
    { style: style, id: id, className: "rainmaker-card clearfix " + className, onClick: onClick },
    textChildren
  );
};

exports.default = CardUi;


CardUi.propTypes = {
  className: _propTypes2.default.string,
  id: _propTypes2.default.string,
  textChildren: _propTypes2.default.oneOfType([_propTypes2.default.element, _propTypes2.default.array])
};