"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _components = require("components");

var _AdditionalDetails = require("../AdditionalDetails");

var _AdditionalDetails2 = _interopRequireDefault(_AdditionalDetails);

var _ComplaintType = require("../ComplaintType");

var _ComplaintType2 = _interopRequireDefault(_ComplaintType);

var _MohallaDropdown = require("../MohallaDropdown");

var _MohallaDropdown2 = _interopRequireDefault(_MohallaDropdown);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AddComplaintForm = function AddComplaintForm(_ref) {
  var formKey = _ref.formKey,
      localizationLabels = _ref.localizationLabels,
      handleFieldChange = _ref.handleFieldChange,
      form = _ref.form,
      categories = _ref.categories,
      history = _ref.history;

  var fields = form.fields || {};
  var name = fields.name,
      phone = fields.phone,
      mohalla = fields.mohalla,
      city = fields.city,
      address = fields.address,
      landmark = fields.landmark;

  var submit = form.submit;
  return _react2.default.createElement(
    "div",
    { className: "create-complaint-main-cont" },
    _react2.default.createElement(
      "div",
      { className: "create-comp-csr-form-cont form-without-button-cont-generic" },
      _react2.default.createElement(_components.Card, {
        id: "create-complaint-card",
        className: "create-complaint-main-card",
        textChildren: _react2.default.createElement(
          "div",
          { className: "col-xs-12", style: { padding: 0 } },
          _react2.default.createElement(
            "div",
            { className: "col-sm-6 col-xs-12" },
            _react2.default.createElement(_components.TextField, (0, _extends3.default)({
              className: "fix-for-layout-break"
            }, name, {
              name: "create-complaint",
              onChange: function onChange(e, value) {
                return handleFieldChange("name", value);
              }
            }))
          ),
          _react2.default.createElement(
            "div",
            { className: "col-sm-6 col-xs-12" },
            _react2.default.createElement(_components.TextField, (0, _extends3.default)({
              className: "fix-for-layout-break"
            }, phone, {
              name: "complainant-mobile-no",
              onChange: function onChange(e, value) {
                return handleFieldChange("phone", value);
              }
            }))
          ),
          _react2.default.createElement(
            "div",
            { className: "col-sm-6 col-xs-12" },
            _react2.default.createElement(_ComplaintType2.default, {
              className: "fix-for-layout-break",
              localizationLabels: localizationLabels,
              categories: categories,
              complaintType: fields.complaintType
            })
          ),
          _react2.default.createElement(
            "div",
            { className: "col-sm-6 col-xs-12" },
            _react2.default.createElement(_AdditionalDetails2.default, {
              className: "fix-for-layout-break",
              handleFieldChange: handleFieldChange,
              additionalDetails: fields.additionalDetails
            })
          ),
          _react2.default.createElement(
            "div",
            { className: "col-sm-6 col-xs-12" },
            _react2.default.createElement(_components.TextField, (0, _extends3.default)({
              className: "fix-for-layout-break"
            }, address, {
              multiLine: true,
              rowsMax: 3,
              name: "complainant-mobile-no",
              onChange: function onChange(e, value) {
                return handleFieldChange("address", value);
              }
            }))
          ),
          _react2.default.createElement(
            "div",
            { className: "col-sm-6 col-xs-12" },
            _react2.default.createElement(_components.DropDown, (0, _extends3.default)({
              className: "fix-for-layout-break",
              fullWidth: true,
              onChange: function onChange(e, value, selectedValue) {
                return handleFieldChange("city", selectedValue);
              }
            }, city))
          ),
          _react2.default.createElement(
            "div",
            { className: "col-sm-6 col-xs-12" },
            _react2.default.createElement(_MohallaDropdown2.default, { handleFieldChange: handleFieldChange, mohalla: mohalla })
          ),
          _react2.default.createElement(
            "div",
            { className: "col-sm-6 col-xs-12" },
            _react2.default.createElement(_components.TextField, (0, _extends3.default)({
              className: "fix-for-layout-break"
            }, landmark, {
              onChange: function onChange(e, value) {
                return handleFieldChange("landmark", value);
              },
              name: "landmark-details"
            }))
          )
        )
      })
    ),
    _react2.default.createElement(
      "div",
      { className: "responsive-action-button-cont" },
      _react2.default.createElement(_components.Button, (0, _extends3.default)({
        primary: true,
        fullWidth: true,
        style: { width: 230, boxShadow: "0 2px 5px 0 rgba(100, 100, 100, 0.5), 0 2px 10px 0 rgba(167, 167, 167, 0.5)" }
      }, submit, {
        className: "responsive-action-button"
      }))
    )
  );
};

exports.default = AddComplaintForm;