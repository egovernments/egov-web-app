"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _components = require("components");

var _translationNode = require("egov-ui-kit/utils/translationNode");

var _translationNode2 = _interopRequireDefault(_translationNode);

var _download = require("assets/images/download.png");

var _download2 = _interopRequireDefault(_download);

require("./index.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var iconStyle = {
  marginLeft: "20px",
  height: "20px",
  width: "20px",
  transform: "rotate(-15deg)",
  marginBottom: "5px",
  position: "absolute",
  right: 16,
  top: 12
};

var textFieldStyle = {
  backgroundColor: "#f2f2f2",
  display: "flex",
  alignItems: "center",
  border: "solid 1px #e6e6e6",
  fontSize: "14px"
};

var imageStyles = {
  width: "33px",
  height: "33px",
  marginRight: "8px"
};

var WriteComment = function WriteComment(_ref) {
  var form = _ref.form,
      handleFieldChange = _ref.handleFieldChange,
      submitForm = _ref.submitForm,
      userImage = _ref.userImage,
      currentstatus = _ref.currentstatus;

  var fields = form.fields || {};
  return _react2.default.createElement(
    "div",
    { disabled: true, style: { display: "flex", justifyContent: "center", paddingBottom: 16, position: "relative", alignItems: "center" } },
    _react2.default.createElement(_components.Image, { style: imageStyles, className: "img-circle", size: "medium", source: userImage ? userImage : _download2.default }),
    _react2.default.createElement(_components.TextArea, (0, _extends3.default)({}, fields.comment, {
      hintText: _react2.default.createElement(_translationNode2.default, { label: "CS_COMMON_COMMENTS_PLACEHOLDER2" }),
      style: textFieldStyle,
      onChange: function onChange(e, value) {
        return handleFieldChange("comment", value);
      },
      className: "write-complaint-chat-field",
      fullWidth: true,
      multiLine: true,
      underlineShow: false,
      hintStyle: { left: 5, bottom: "initial", fontSize: 14, top: 12 },
      inputStyle: { fontSize: 14, paddingLeft: 5, paddingRight: 40 },
      rowsMax: 3
    })),
    _react2.default.createElement(_components.Icon, { className: "comment-send", action: "content", name: "send", style: iconStyle, color: "#00bcd1", onClick: function onClick() {
        return submitForm();
      } })
  );
};

exports.default = WriteComment;