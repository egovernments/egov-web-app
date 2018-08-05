"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Snackbar = require("material-ui/Snackbar");

var _Snackbar2 = _interopRequireDefault(_Snackbar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Toast = function Toast(_ref) {
  var _ref$open = _ref.open,
      open = _ref$open === undefined ? false : _ref$open,
      _ref$autoHideDuration = _ref.autoHideDuration,
      autoHideDuration = _ref$autoHideDuration === undefined ? 4000 : _ref$autoHideDuration,
      _ref$error = _ref.error,
      error = _ref$error === undefined ? true : _ref$error,
      message = _ref.message;

  return _react2.default.createElement(_Snackbar2.default, {
    open: open,
    id: "toast-message",
    message: message,
    autoHideDuration: autoHideDuration,
    style: { pointerEvents: "none", width: "95%", whiteSpace: "nowrap" },
    bodyStyle: {
      pointerEvents: "initial",
      maxWidth: "none",
      lineHeight: "20px",
      height: "auto",
      maxHeight: "60px",
      padding: "5px",
      whiteSpace: "pre-line",
      textAlign: "center"
    }
  });
};

Toast.propTypes = {
  message: _propTypes2.default.string.isRequired,
  open: _propTypes2.default.bool,
  error: _propTypes2.default.bool,
  autoHideDuration: _propTypes2.default.number
};

exports.default = Toast;