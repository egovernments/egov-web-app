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

var _InputAdornment = require("@material-ui/core/InputAdornment");

var _InputAdornment2 = _interopRequireDefault(_InputAdornment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MihyInputAdornment = function MihyInputAdornment(props) {
  var children = props.children,
      rest = (0, _objectWithoutProperties3.default)(props, ["children"]);

  return _react2.default.createElement(
    _InputAdornment2.default,
    rest,
    children
  );
};

MihyInputAdornment.propTypes = {
  children: _propTypes2.default.any
};

exports.default = MihyInputAdornment;