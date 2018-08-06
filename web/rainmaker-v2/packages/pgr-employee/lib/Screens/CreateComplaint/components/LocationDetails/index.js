"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _components = require("components");

var _myLocation = require("material-ui/svg-icons/maps/my-location");

var _myLocation2 = _interopRequireDefault(_myLocation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var LocationDetails = function LocationDetails(_ref) {
  var formKey = _ref.formKey,
      locationDetails = _ref.locationDetails,
      handleFieldChange = _ref.handleFieldChange,
      history = _ref.history;

  var onIconClick = function onIconClick() {
    history.push("/map?" + formKey);
  };

  return _react2.default.createElement(
    "div",
    { className: "location-details-main-cont" },
    _react2.default.createElement(
      "div",
      null,
      _react2.default.createElement(_components.TextFieldIcon, (0, _extends3.default)({
        id: "addComplaint-location-details"
      }, locationDetails, {
        onIconClick: onIconClick,
        iconPosition: "after",
        Icon: _myLocation2.default,
        iconStyle: { marginTop: "9px" },
        name: "location-details",
        onChange: function onChange(e, value) {
          return handleFieldChange("address", value);
        }
      }))
    )
  );
};

exports.default = LocationDetails;