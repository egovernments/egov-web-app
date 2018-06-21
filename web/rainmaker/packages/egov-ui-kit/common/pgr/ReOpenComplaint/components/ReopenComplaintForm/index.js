"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _components = require("components");

var _Question = require("../Question");

var _Question2 = _interopRequireDefault(_Question);

var _TextArea = require("../TextArea");

var _TextArea2 = _interopRequireDefault(_TextArea);

var _common = require("modules/common");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ReopenComplaintForm = function ReopenComplaintForm(_ref) {
  var form = _ref.form,
      formKey = _ref.formKey,
      options = _ref.options,
      ontextAreaChange = _ref.ontextAreaChange,
      handleOptionChange = _ref.handleOptionChange,
      optionSelected = _ref.optionSelected,
      commentValue = _ref.commentValue;

  var fields = form.fields || {};
  var submit = form.submit;
  return _react2.default.createElement(
    "div",
    null,
    _react2.default.createElement(
      "div",
      { className: "reopencomplaint-question" },
      _react2.default.createElement(_Question2.default, { options: options, label: "CS_REOPEN_COMPLAINT_WHY", handleChange: handleOptionChange, valueSelected: optionSelected })
    ),
    _react2.default.createElement(
      "div",
      { className: "reopencomplaint-upload-photo" },
      _react2.default.createElement(_common.ImageUpload, { module: "rainmaker-pgr", formKey: formKey, fieldKey: "media" })
    ),
    _react2.default.createElement(
      "div",
      { className: "reopencomplaint-textArea" },
      _react2.default.createElement(_TextArea2.default, (0, _extends3.default)({ onChange: ontextAreaChange, value: commentValue }, fields.textarea))
    ),
    _react2.default.createElement(
      "div",
      { className: "col-lg-offset-2 col-md-offset-2 col-lg-8 col-md-8 btn-with-bottom-nav" },
      _react2.default.createElement(_components.Button, (0, _extends3.default)({}, submit, { primary: true, fullWidth: true }))
    )
  );
};
// import { Question } from "modules/common";
// import { TextArea } from "modules/common";
exports.default = ReopenComplaintForm;