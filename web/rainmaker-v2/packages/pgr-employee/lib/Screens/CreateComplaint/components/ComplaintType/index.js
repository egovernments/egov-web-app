"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

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

var _arrowDropDown = require("material-ui/svg-icons/navigation/arrow-drop-down");

var _arrowDropDown2 = _interopRequireDefault(_arrowDropDown);

var _ComplaintType = require("egov-ui-kit/common/pgr/ComplaintType");

var _ComplaintType2 = _interopRequireDefault(_ComplaintType);

require("./index.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ComplaintTypeField = function (_Component) {
  (0, _inherits3.default)(ComplaintTypeField, _Component);

  function ComplaintTypeField() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, ComplaintTypeField);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = ComplaintTypeField.__proto__ || Object.getPrototypeOf(ComplaintTypeField)).call.apply(_ref, [this].concat(args))), _this), _this.state = { open: false }, _this.onClose = function () {
      _this.setState({ open: false });
    }, _this.onFieldClicked = function () {
      _this.setState({
        open: true
      });
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(ComplaintTypeField, [{
    key: "render",
    value: function render() {
      var _props = this.props,
          localizationLabels = _props.localizationLabels,
          complaintType = _props.complaintType;
      var onClose = this.onClose,
          onFieldClicked = this.onFieldClicked;
      var open = this.state.open;

      var complainTypeMessage = complaintType && complaintType.value && (localizationLabels["SERVICEDEFS." + (complaintType.value || "").toUpperCase()] || {}).message || "";
      return _react2.default.createElement(
        "div",
        { className: "complaint-type-main-cont" },
        _react2.default.createElement(
          "div",
          { onClick: onFieldClicked },
          _react2.default.createElement(_components.TextFieldIcon, (0, _extends3.default)({}, (0, _extends3.default)({}, complaintType, { value: complainTypeMessage }), {
            iconPosition: "after",
            fullWidth: true,
            Icon: _arrowDropDown2.default,
            iconStyle: { marginTop: "9px", right: 12 },
            name: "complaint-type",
            disabled: false
          }))
        ),
        _react2.default.createElement(_components.Dialog, {
          open: open
          // title={<Label label="CS_ADDCOMPLAINT_COMPLAINT_TYPE_PLACEHOLDER" />}
          , title: "Select Complaint Type",
          titleStyle: { textAlign: "left", paddingRight: "20px", fontWeight: "500" },
          children: [_react2.default.createElement(_ComplaintType2.default, {
            onClose: onClose,
            key: "complaintType",
            employeeScreen: true,
            containerStyle: {},
            textFieldStyle: { backgroundColor: "#f7f7f7" }
          })],
          bodyStyle: { backgroundColor: "#ffffff" },
          isClose: false,
          onRequestClose: onClose,
          contentStyle: { width: "34%", minWidth: 336, height: "65%" },
          autoScrollBodyContent: true,
          style: {
            paddingTop: "0",
            bottom: "0",
            marginTop: "50px",
            height: "auto"
          }
        })
      );
    }
  }]);
  return ComplaintTypeField;
}(_react.Component);

exports.default = ComplaintTypeField;