"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _BottomNavigation = require("material-ui/BottomNavigation");

require("./index.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BottomNavigation = function BottomNavigation(_ref) {
  var className = _ref.className,
      _ref$style = _ref.style,
      style = _ref$style === undefined ? {} : _ref$style,
      options = _ref.options,
      handleChange = _ref.handleChange,
      selectedIndex = _ref.selectedIndex,
      id = _ref.id;
  return _react2.default.createElement(
    _BottomNavigation.BottomNavigation,
    { className: className + " bottom-navigation", style: style, selectedIndex: selectedIndex },
    options.map(function (item, index) {
      return _react2.default.createElement(_BottomNavigation.BottomNavigationItem, { id: item.id, key: index, label: item.label, icon: item.icon, onClick: function onClick() {
          return handleChange(index);
        } });
    })
  );
};

BottomNavigation.propTypes = {
  style: _propTypes2.default.object,
  selectedIndex: _propTypes2.default.number,
  options: _propTypes2.default.arrayOf(_propTypes2.default.shape({
    label: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.node]).isRequired,
    icon: _propTypes2.default.node,
    route: _propTypes2.default.string.isRequired
  })).isRequired,
  handleChange: _propTypes2.default.func
};

exports.default = BottomNavigation;