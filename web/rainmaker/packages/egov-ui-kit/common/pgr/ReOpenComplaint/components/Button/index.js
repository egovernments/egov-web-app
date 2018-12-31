"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _translationNode = require("egov-ui-kit/utils/translationNode");

var _translationNode2 = _interopRequireDefault(_translationNode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var hintStyle = {
  color: "rgba(0, 0, 0, 0.3799999952316284)",
  fontFamily: "Roboto",
  fontSize: "16px",
  fontWeight: "400",
  letterSpacing: "0.3px"
};
var handleCommentChange = function handleCommentChange() {};
var TextAreaUi = function TextAreaUi() {
  return _react2.default.createElement(TextArea, {
    id: "reopencomplaint-comment-field",
    hintText: _react2.default.createElement(_translationNode2.default, { label: "CS_COMMON_COMMENTS_PLACEHOLDER" }),
    hintStyle: hintStyle,
    rowsMax: 2,
    onChange: handleCommentChange,
    underlineShow: true,
    underlineStyle: { borderColor: "#e0e0e0" },
    underlineFocusStyle: { borderColor: "#e0e0e0" }
  });
};

exports.default = TextAreaUi;