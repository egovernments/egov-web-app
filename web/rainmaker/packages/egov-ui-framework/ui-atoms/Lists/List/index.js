"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _objectWithoutProperties2 = require("babel-runtime/helpers/objectWithoutProperties");

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _List = require("@material-ui/core/List");

var _List2 = _interopRequireDefault(_List);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MihyList = function MihyList(props) {
  var children = props.children,
      rest = (0, _objectWithoutProperties3.default)(props, ["children"]);

  return _react2.default.createElement(
    _List2.default,
    rest,
    children
  );
};

MihyList.propTypes = {
  children: _propTypes2.default.any
};

exports.default = MihyList;