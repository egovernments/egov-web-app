"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _objectWithoutProperties2 = require("babel-runtime/helpers/objectWithoutProperties");

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _HeaderCard = require("../HeaderCard");

var _HeaderCard2 = _interopRequireDefault(_HeaderCard);

var _ListCard = require("../ListCard");

var _ListCard2 = _interopRequireDefault(_ListCard);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FeedbackForm = function FeedbackForm(_ref) {
  var complaint = _ref.complaint,
      rest = (0, _objectWithoutProperties3.default)(_ref, ["complaint"]);

  return _react2.default.createElement(
    "div",
    { className: "form-without-button-cont-generic" },
    _react2.default.createElement(_HeaderCard2.default, { complaint: complaint }),
    _react2.default.createElement(_ListCard2.default, rest)
  );
};

exports.default = FeedbackForm;