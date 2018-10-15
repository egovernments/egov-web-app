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

var _uiAtoms = require("ui-atoms");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Registration = function (_React$Component) {
  (0, _inherits3.default)(Registration, _React$Component);

  function Registration() {
    (0, _classCallCheck3.default)(this, Registration);
    return (0, _possibleConstructorReturn3.default)(this, (Registration.__proto__ || Object.getPrototypeOf(Registration)).apply(this, arguments));
  }

  (0, _createClass3.default)(Registration, [{
    key: "render",
    value: function render() {
      return _react2.default.createElement(
        _uiAtoms.Div,
        null,
        _react2.default.createElement(
          _uiAtoms.Card,
          null,
          _react2.default.createElement(
            _uiAtoms.CardContent,
            null,
            "Registration",
            _react2.default.createElement(_uiAtoms.Break, null),
            _react2.default.createElement(
              _uiAtoms.Card,
              null,
              _react2.default.createElement(
                _uiAtoms.CardContent,
                null,
                _react2.default.createElement(
                  _uiAtoms.Container,
                  null,
                  _react2.default.createElement(
                    _uiAtoms.Item,
                    { md: 6, xs: 12 },
                    _react2.default.createElement(_uiAtoms.Text, { id: "blood-registration-name", label: "Name" })
                  ),
                  _react2.default.createElement(
                    _uiAtoms.Item,
                    { md: 6, xs: 12 },
                    _react2.default.createElement(_uiAtoms.Text, { id: "blood-registration-gender", label: "Gender" })
                  ),
                  _react2.default.createElement(
                    _uiAtoms.Item,
                    { md: 6, xs: 12 },
                    _react2.default.createElement(_uiAtoms.Text, { id: "blood-registration-email", label: "Email" })
                  ),
                  _react2.default.createElement(
                    _uiAtoms.Item,
                    { md: 6, xs: 12 },
                    _react2.default.createElement(_uiAtoms.Text, { id: "blood-registration-location", label: "Location" })
                  )
                )
              )
            ),
            _react2.default.createElement(
              _uiAtoms.Card,
              null,
              _react2.default.createElement(
                _uiAtoms.CardContent,
                null,
                _react2.default.createElement(
                  _uiAtoms.Container,
                  null,
                  _react2.default.createElement(
                    _uiAtoms.Item,
                    { md: 6, xs: 12 },
                    _react2.default.createElement(_uiAtoms.Text, { id: "blood-registration-blood-group", label: "Blood Group" })
                  ),
                  _react2.default.createElement(
                    _uiAtoms.Item,
                    { md: 6, xs: 12 },
                    _react2.default.createElement(_uiAtoms.Text, { id: "blood-registration-age", label: "Age" })
                  ),
                  _react2.default.createElement(
                    _uiAtoms.Item,
                    { md: 6, xs: 12 },
                    _react2.default.createElement(_uiAtoms.Text, { id: "blood-registration-weight", label: "Weight" })
                  )
                )
              )
            )
          )
        )
      );
    }
  }]);
  return Registration;
}(_react2.default.Component);

exports.default = Registration;