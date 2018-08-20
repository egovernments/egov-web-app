"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _components = require("components");

var _CityPicker = require("../../../common/CityPicker");

var _CityPicker2 = _interopRequireDefault(_CityPicker);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ProfileForm = function ProfileForm(_ref) {
  var name = _ref.name,
      emailId = _ref.emailId,
      handleMailChange = _ref.handleMailChange,
      handleNameChange = _ref.handleNameChange;

  return _react2.default.createElement(
    "div",
    null,
    _react2.default.createElement(
      "form",
      { className: "profileFormContainer" },
      _react2.default.createElement(_components.TextField, {
        className: "profile-form-field",
        id: "profile-form-name",
        fullWidth: true,
        value: name,
        hintText: "Enter your Name",
        floatingLabelText: "Name",
        onChange: handleNameChange,
        isRequired: true
      }),
      _react2.default.createElement(_CityPicker2.default, null),
      _react2.default.createElement(_components.TextField, {
        className: "profile-form-field",
        id: "profile-form-email",
        fullWidth: true,
        value: emailId,
        floatingLabelText: "Email Id",
        hintText: "Enter your Email Id",
        onChange: handleMailChange
      })
    ),
    _react2.default.createElement(
      "div",
      { className: "col-lg-offset-2 col-md-offset-2 col-lg-8 col-md-8 profileBtnWrapper" },
      _react2.default.createElement(_components.Button, { className: "profileBtn", id: "profile-save-action", primary: true, label: "SAVE", fullWidth: true, onClick: undefined.onSaveClick })
    )
  );
};

exports.default = ProfileForm;