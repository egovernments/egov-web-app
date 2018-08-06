"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require("babel-runtime/helpers/objectWithoutProperties");

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _components = require("components");

var _reactRouterDom = require("react-router-dom");

var _arrowDropDown = require("material-ui/svg-icons/navigation/arrow-drop-down");

var _arrowDropDown2 = _interopRequireDefault(_arrowDropDown);

require("./index.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ComplaintTypeField = function ComplaintTypeField(_ref) {
  var categories = _ref.categories,
      localizationLabels = _ref.localizationLabels,
      _ref$complaintType = _ref.complaintType,
      complaintType = _ref$complaintType === undefined ? {} : _ref$complaintType,
      rest = (0, _objectWithoutProperties3.default)(_ref, ["categories", "localizationLabels", "complaintType"]);

  var complainTypeMessage = complaintType && complaintType.value && (localizationLabels["SERVICEDEFS." + (complaintType.value || "").toUpperCase()] || {}).message || "";

  return _react2.default.createElement(
    "div",
    { className: "complaint-type-main-cont" },
    _react2.default.createElement(_components.Card, {
      className: "complaint-type-card common-padding-for-new-complaint-card",
      textChildren: _react2.default.createElement(
        _reactRouterDom.Link,
        { to: "/complaint-type" },
        _react2.default.createElement(_components.TextFieldIcon, (0, _extends3.default)({}, (0, _extends3.default)({}, complaintType, { value: complainTypeMessage }), {
          iconPosition: "after",
          fullWidth: true,
          Icon: _arrowDropDown2.default,
          iconStyle: { marginTop: "9px" },
          name: "complaint-type",
          disabled: false
        }, rest))
      )
    })
  );
};

exports.default = ComplaintTypeField;