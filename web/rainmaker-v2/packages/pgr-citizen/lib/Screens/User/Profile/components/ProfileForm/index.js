"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _field = require("egov-ui-kit/utils/field");

var _field2 = _interopRequireDefault(_field);

var _components = require("components");

var _common = require("modules/common");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ProfileForm = function ProfileForm(_ref) {
  var form = _ref.form,
      handleFieldChange = _ref.handleFieldChange,
      onClickAddPic = _ref.onClickAddPic,
      img = _ref.img,
      profilePic = _ref.profilePic;

  var fields = form.fields || {};
  var submit = form.submit;
  return _react2.default.createElement(
    "div",
    null,
    _react2.default.createElement(
      "div",
      { className: "profile-card-container" },
      _react2.default.createElement(
        "div",
        null,
        _react2.default.createElement(
          "div",
          { style: { padding: 0 }, className: "col-xs-12 col-sm-4 col-md-4 col-lg-4 profile-profilesection" },
          _react2.default.createElement(_common.ProfileSection, { img: profilePic || img, onClickAddPic: onClickAddPic })
        ),
        _react2.default.createElement(
          "div",
          { className: "col-xs-12 col-sm-8 col-md-8 col-lg-8 profileFormContainer" },
          _react2.default.createElement(_field2.default, { fieldKey: "name", field: fields.name, handleFieldChange: handleFieldChange }),
          _react2.default.createElement(_common.CityPicker, { onChange: handleFieldChange, fieldKey: "city", field: fields.city }),
          _react2.default.createElement(_field2.default, { fieldKey: "email", field: fields.email, handleFieldChange: handleFieldChange })
        )
      )
    ),
    _react2.default.createElement(
      "div",
      { className: "responsive-action-button-cont" },
      _react2.default.createElement(_components.Button, (0, _extends3.default)({ className: "responsive-action-button" }, submit, { primary: true, fullWidth: true }))
    )
  );
};

exports.default = ProfileForm;