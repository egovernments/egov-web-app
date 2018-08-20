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

var _reactRedux = require("react-redux");

var _form = require("egov-ui-kit/hocs/form");

var _form2 = _interopRequireDefault(_form);

var _BasicInformationForm = require("./components/BasicInformationForm");

var _BasicInformationForm2 = _interopRequireDefault(_BasicInformationForm);

var _common = require("modules/common");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BasicInformationHOC = (0, _form2.default)({ formKey: "basicInformation" })(_BasicInformationForm2.default);

var BasicInformation = function (_Component) {
  (0, _inherits3.default)(BasicInformation, _Component);

  function BasicInformation() {
    (0, _classCallCheck3.default)(this, BasicInformation);
    return (0, _possibleConstructorReturn3.default)(this, (BasicInformation.__proto__ || Object.getPrototypeOf(BasicInformation)).apply(this, arguments));
  }

  (0, _createClass3.default)(BasicInformation, [{
    key: "render",
    value: function render() {
      return _react2.default.createElement(
        _common.Screen,
        null,
        _react2.default.createElement(BasicInformationHOC, null)
      );
    }
  }]);
  return BasicInformation;
}(_react.Component);

exports.default = BasicInformation;