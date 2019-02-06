"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _Button = require("@material-ui/core/Button");

var _Button2 = _interopRequireDefault(_Button);

var _uiContainers = require("egov-ui-framework/ui-containers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var UploadFile = function UploadFile(props) {
  var classes = props.classes,
      handleFileUpload = props.handleFileUpload,
      buttonProps = props.buttonProps,
      inputProps = props.inputProps,
      accept = props.accept,
      buttonLabel = props.buttonLabel;

  return _react2.default.createElement(
    "div",
    null,
    _react2.default.createElement("input", (0, _extends3.default)({
      accept: accept,
      className: classes.input,
      id: "contained-button-file",
      multiple: true,
      type: "file",
      onChange: handleFileUpload,
      onClick: function onClick(event) {
        event.target.value = null;
      }
    }, inputProps)),
    _react2.default.createElement(
      "label",
      { htmlFor: "contained-button-file" },
      _react2.default.createElement(
        _Button2.default,
        (0, _extends3.default)({ component: "span", className: classes.button }, buttonProps),
        _react2.default.createElement(_uiContainers.LabelContainer, buttonLabel)
      )
    )
  );
};

exports.default = UploadFile;