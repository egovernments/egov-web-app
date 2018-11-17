"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _uiAtoms = require("ui-atoms");

var _spec = require("./spec");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Dashboard = function Dashboard() {
  return _react2.default.createElement(
    _uiAtoms.Div,
    null,
    _react2.default.createElement(
      _uiAtoms.Container,
      null,
      _spec.donorProcessOption.map(function (item, key) {
        return _react2.default.createElement(
          _uiAtoms.Item,
          (0, _extends3.default)({}, item.itemProps, { key: key }),
          _react2.default.createElement(
            _uiAtoms.Button,
            (0, _extends3.default)({ fullWidth: true, variant: "extendedFab", "aria-label": item.displayLabel }, item.buttonProps),
            _react2.default.createElement(_uiAtoms.Icon, (0, _extends3.default)({ iconName: item.iconName }, item.IconProps)),
            item.displayLabel
          )
        );
      })
    )
  );
};

exports.default = Dashboard;