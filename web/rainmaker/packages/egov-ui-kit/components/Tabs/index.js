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

var tabItemContainerStyle = {
  position: "relative",
  zIndex: 1101,
  left: 0,
  boxShadow: "rgba(0, 0, 0, 0.24) 0px 4px 4px 0px, rgba(0, 188, 209, 0.12) 0px 1px 4px 0px"
};

var inkBarStyle = {
  zIndex: 1101,
  backgroundColor: "#fe7a51",
  height: 4,
  position: "fixed",
  bottom: "inherit"
};

var inkBarContainerStyle = {
  paddingTop: "48px"
};

var Tabs = function Tabs(_ref) {
  var _ref$tabs = _ref.tabs,
      tabs = _ref$tabs === undefined ? [] : _ref$tabs,
      onChange = _ref.onChange,
      className = _ref.className;

  var renderTabs = function renderTabs() {
    return tabs.map(function (tab, index) {
      var route = tab.route,
          label = tab.label,
          children = tab.children;

      return _react2.default.createElement(
        _Tabs.Tab,
        { value: index, key: index, "data-route": route, label: label },
        children
      );
    });
  };

  return _react2.default.createElement(
    _Tabs.Tabs,
    {
      className: className,
      onChange: onChange,
      inkBarContainerStyle: inkBarContainerStyle,
      tabItemContainerStyle: tabItemContainerStyle,
      inkBarStyle: inkBarStyle
    },
    renderTabs()
  );
};

Tabs.propTypes = {
  tabs: _propTypes2.default.array,
  onActive: _propTypes2.default.func
};
exports.default = Tabs;