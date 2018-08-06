"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _components = require("components");

require("./index.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ButtonComponent = function ButtonComponent(_ref) {
  var label = _ref.label,
      onClick = _ref.onClick;

  return _react2.default.createElement(
    "div",
    { className: "create-comp-csr-cont" },
    _react2.default.createElement(_components.Button, {
      className: "create-complaint-submit-button",
      id: "assign-complaint-button",
      onClick: onClick,
      primary: true,
      label: _react2.default.createElement(Label, { buttonLabel: true, label: label }),
      fullWidth: true
    }),
    ";"
  );
};
exports.default = ButtonComponent;