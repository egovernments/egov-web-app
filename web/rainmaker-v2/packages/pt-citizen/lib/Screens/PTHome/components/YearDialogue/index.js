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

var _index = require("./components/SingleButton/index");

var _index2 = _interopRequireDefault(_index);

require("./index.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var YearDialog = function (_Component) {
  (0, _inherits3.default)(YearDialog, _Component);

  function YearDialog() {
    (0, _classCallCheck3.default)(this, YearDialog);
    return (0, _possibleConstructorReturn3.default)(this, (YearDialog.__proto__ || Object.getPrototypeOf(YearDialog)).apply(this, arguments));
  }

  (0, _createClass3.default)(YearDialog, [{
    key: "render",
    value: function render() {
      var _props = this.props,
          open = _props.open,
          yearList = _props.yearList,
          closeDialogue = _props.closeDialogue;

      return _react2.default.createElement(_components.Dialog, {
        open: open,
        children: [_react2.default.createElement(
          "div",
          { key: 1 },
          _react2.default.createElement(
            "div",
            { className: "dialogue-question" },
            "Which year\u2019s taxes would you like to pay? "
          ),
          _react2.default.createElement(
            "div",
            { className: "year-range-botton-cont" },
            yearList.map(function (item, index) {
              return _react2.default.createElement(_index2.default, { key: index, label: item, handleClose: closeDialogue });
            })
          )
        )],
        bodyStyle: { backgroundColor: "#ffffff" },
        isClose: false,
        onRequestClose: closeDialogue,
        contentStyle: { width: "20%" }
      });
    }
  }]);
  return YearDialog;
}(_react.Component);

exports.default = YearDialog;