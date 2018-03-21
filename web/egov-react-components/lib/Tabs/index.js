"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Tabs = require("material-ui/Tabs");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Tabs = function Tabs(_ref) {
  var _ref$tabs = _ref.tabs,
      tabs = _ref$tabs === undefined ? [] : _ref$tabs,
      onActive = _ref.onActive;

  var renderTabs = function renderTabs() {
    return tabs.map(function (tab, index) {
      var route = tab.route,
          label = tab.label;

      return _react2.default.createElement(_Tabs.Tab, { key: index, onActive: onActive, "data-route": route, label: label });
    });
  };

  return _react2.default.createElement(
    _Tabs.Tabs,
    null,
    renderTabs()
  );
};

Tabs.propTypes = {
  tabs: _propTypes2.default.array,
  onActive: _propTypes2.default.func
};
exports.default = Tabs;