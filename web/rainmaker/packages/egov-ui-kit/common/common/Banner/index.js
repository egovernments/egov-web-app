"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require("react-router");

var _components = require("components");

var _punjabLogo = require("egov-ui-kit/assets/images/punjab-logo.png");

var _punjabLogo2 = _interopRequireDefault(_punjabLogo);

require("./index.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Banner = function Banner(_ref) {
  var children = _ref.children,
      history = _ref.history,
      _ref$className = _ref.className,
      className = _ref$className === undefined ? "" : _ref$className;

  return _react2.default.createElement(
    "div",
    null,
    _react2.default.createElement(
      "div",
      { className: className + " user-screens-wrapper" },
      _react2.default.createElement(
        "div",
        { className: "row" },
        _react2.default.createElement(_components.Icon, { onClick: function onClick() {
            return history.goBack();
          }, className: "banner-back-button", action: "navigation", name: "arrow-back" }),
        _react2.default.createElement("div", { className: "banner-image" }),
        _react2.default.createElement("div", { className: "banner-overlay" }),
        _react2.default.createElement(
          "div",
          { className: "logo-wrapper user-logo-wrapper" },
          _react2.default.createElement(_components.Image, { className: "mseva-logo", source: "" + _punjabLogo2.default })
        ),
        children
      )
    )
  );
};

exports.default = (0, _reactRouter.withRouter)(Banner);