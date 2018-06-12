"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require("react-router");

var _components = require("components");

var _logoWhite = require("egov-ui-kit/assets/images/logo-white.png");

var _logoWhite2 = _interopRequireDefault(_logoWhite);

require("./index.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var backgroundImage = {
  backgroundImage: "url(assets/images/banner.png)"
};

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
        _react2.default.createElement("div", { style: backgroundImage, className: "banner-image" }),
        _react2.default.createElement("div", { className: "banner-overlay" }),
        children
      )
    )
  );
};

exports.default = (0, _reactRouter.withRouter)(Banner);