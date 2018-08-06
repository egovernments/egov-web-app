"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

require("./index.css");

var _components = require("components");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RatingsComponent = function RatingsComponent(_ref) {
  var size = _ref.size,
      count = _ref.count,
      onChange = _ref.onChange;

  return _react2.default.createElement(
    "div",
    { className: "feedback-ratings-cont" },
    _react2.default.createElement(_components.Ratings, { id: "feedback-ratings", className: "feedback-ratings", size: 40, onChange: onChange, count: 5, half: false })
  );
};

exports.default = RatingsComponent;