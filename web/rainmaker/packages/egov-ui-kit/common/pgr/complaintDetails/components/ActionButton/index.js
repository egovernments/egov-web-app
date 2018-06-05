"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _components = require("components");

var _translationNode = require("utils/translationNode");

var _translationNode2 = _interopRequireDefault(_translationNode);

require("./index.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ActionButton = function (_Component) {
  (0, _inherits3.default)(ActionButton, _Component);

  function ActionButton() {
    (0, _classCallCheck3.default)(this, ActionButton);
    return (0, _possibleConstructorReturn3.default)(this, (ActionButton.__proto__ || Object.getPrototypeOf(ActionButton)).apply(this, arguments));
  }

  (0, _createClass3.default)(ActionButton, [{
    key: "render",
    value: function render() {
      var _props = this.props,
          btnOneLabel = _props.btnOneLabel,
          btnOneOnClick = _props.btnOneOnClick,
          btnTwoLabel = _props.btnTwoLabel,
          btnTwoOnClick = _props.btnTwoOnClick;

      return _react2.default.createElement(
        "div",
        { className: "compalint-details-action-buttons" },
        _react2.default.createElement(_components.Button, {
          label: _react2.default.createElement(_translationNode2.default, { buttonLabel: true, label: btnOneLabel, color: "#fe7a51" }),
          onClick: btnOneOnClick,
          className: "action-button-one",
          id: "actionOne",
          backgroundColor: "#ffffff",
          labelStyle: { padding: 0 },
          overlayStyle: { display: "flex", alignItems: "center", justifyContent: "center" }
        }),
        _react2.default.createElement(_components.Button, {
          label: _react2.default.createElement(_translationNode2.default, { buttonLabel: true, label: btnTwoLabel }),
          onClick: btnTwoOnClick,
          className: "action-button-two",
          id: "actionTwo",
          labelStyle: { padding: 0 },
          overlayStyle: { display: "flex", alignItems: "center", justifyContent: "center" },
          backgroundColor: "#fe7a51"
        })
      );
    }
  }]);
  return ActionButton;
}(_react.Component);

exports.default = ActionButton;