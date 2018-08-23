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

var _SingleButtonForm = require("./components/SingleButtonForm");

var _SingleButtonForm2 = _interopRequireDefault(_SingleButtonForm);

var _form = require("egov-ui-kit/hocs/form");

var _form2 = _interopRequireDefault(_form);

require("./index.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getYearList = function getYearList() {
  var today = new Date();
  var month = today.getMonth() + 1;
  var yearRange = [];
  var counter = 0;
  if (month <= 3) {
    return getLastFiveYear(yearRange, today.getFullYear() - 1, counter);
  } else {
    return getLastFiveYear(yearRange, today.getFullYear(), counter);
  }
};

var getLastFiveYear = function getLastFiveYear(yearRange, currentYear, counter) {
  if (counter < 5) {
    counter++;
    yearRange.push(currentYear + "-" + (currentYear + 1));
    getLastFiveYear(yearRange, currentYear - 1, counter);
  }
  return yearRange;
};

var YearDialogueHOC = (0, _form2.default)({ formKey: "financialYear", path: "PropertyTaxPay" })(_SingleButtonForm2.default);

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
            getYearList().map(function (item, index) {
              return _react2.default.createElement(YearDialogueHOC, { key: index, label: item });
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