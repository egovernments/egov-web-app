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

var _translationNode = require("egov-ui-kit/utils/translationNode");

var _translationNode2 = _interopRequireDefault(_translationNode);

var _common = require("modules/common");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ReassignSuccess = function (_Component) {
  (0, _inherits3.default)(ReassignSuccess, _Component);

  function ReassignSuccess() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, ReassignSuccess);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = ReassignSuccess.__proto__ || Object.getPrototypeOf(ReassignSuccess)).call.apply(_ref, [this].concat(args))), _this), _this.continueComplaintSubmit = function () {
      _this.props.history.push("/all-complaints");
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(ReassignSuccess, [{
    key: "render",
    value: function render() {
      return _react2.default.createElement(
        "div",
        { className: "success-message-main-screen" },
        _react2.default.createElement(_common.SuccessMessage, {
          successmessage: "ES_REASSIGN_REQUEST_SUCCESS_MESSAGE",
          icon: _react2.default.createElement(_components.Icon, { action: "navigation", name: "check" }),
          backgroundColor: "#22b25f"
        }),
        _react2.default.createElement(
          "div",
          { className: "responsive-action-button-cont" },
          _react2.default.createElement(_components.Button, {
            id: "resolve-success-continue",
            primary: true,
            label: _react2.default.createElement(_translationNode2.default, { buttonLabel: true, label: "CORE_COMMON_GOTOHOME" }),
            fullWidth: true,
            onClick: this.continueComplaintSubmit,
            className: "responsive-action-button"
          })
        )
      );
    }
  }]);
  return ReassignSuccess;
}(_react.Component);

exports.default = ReassignSuccess;