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

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Icon = require("@material-ui/core/Icon");

var _Icon2 = _interopRequireDefault(_Icon);

var _Tooltip = require("@material-ui/core/Tooltip");

var _Tooltip2 = _interopRequireDefault(_Tooltip);

var _utils = require("../../ui-config/screens/specs/utils");

var _commons = require("../../ui-utils/commons");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var localizationLabels = JSON.parse(window.localStorage.getItem("localization_en_IN"));

function SimpleTooltips(props) {
  var val = props.val,
      icon = props.icon,
      rest = (0, _objectWithoutProperties3.default)(props, ["val", "icon"]);

  var transfomedKeys = (0, _commons.transformById)(localizationLabels, "code");
  var translatedLabel = (0, _utils.getLocaleLabelsforTL)(val.value, val.key, transfomedKeys);
  return _react2.default.createElement(
    "div",
    (0, _extends3.default)({ style: { display: "inline-flex" } }, rest),
    _react2.default.createElement(
      _Tooltip2.default,
      { title: translatedLabel },
      _react2.default.createElement(
        _Icon2.default,
        {
          style: {
            color: "rgba(0, 0, 0, 0.3799999952316284)",
            display: "inline"
          }
        },
        icon
      )
    )
  );
}

SimpleTooltips.propTypes = {
  classes: _propTypes2.default.object.isRequired
};

exports.default = SimpleTooltips;