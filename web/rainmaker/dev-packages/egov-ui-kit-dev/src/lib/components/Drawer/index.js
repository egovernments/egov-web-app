"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _Drawer = require("material-ui/Drawer");

var _Drawer2 = _interopRequireDefault(_Drawer);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DrawerUi = function DrawerUi(props) {
  return _react2.default.createElement(
    _Drawer2.default,
    props,
    props.children
  );
};

exports.default = DrawerUi;


DrawerUi.propTypes = {
  props: _propTypes2.default.object
};