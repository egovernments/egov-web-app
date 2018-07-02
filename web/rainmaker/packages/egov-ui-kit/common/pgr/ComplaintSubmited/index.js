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

var _components = require("components");

var _FloatingActionButton = require("material-ui/FloatingActionButton");

var _FloatingActionButton2 = _interopRequireDefault(_FloatingActionButton);

var _common = require("modules/common");

var _translationNode = require("egov-ui-kit/utils/translationNode");

var _translationNode2 = _interopRequireDefault(_translationNode);

require("./index.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ComplaintSubmitted = function (_Component) {
  (0, _inherits3.default)(ComplaintSubmitted, _Component);

  function ComplaintSubmitted() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, ComplaintSubmitted);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = ComplaintSubmitted.__proto__ || Object.getPrototypeOf(ComplaintSubmitted)).call.apply(_ref, [this].concat(args))), _this), _this.continueComplaintSubmit = function () {
      _this.props.history.push(_this.props.homeRoute);
    }, _this.getComplaintNumber = function () {
      var search = _this.props.location.search;

      return search && search.length && search.split("=").length && search.split("=")[1] || null;
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  // the retrival logic to be changed!


  (0, _createClass3.default)(ComplaintSubmitted, [{
    key: "render",
    value: function render() {
      var complaintnumber = this.getComplaintNumber();
      return _react2.default.createElement(
        "div",
        null,
        _react2.default.createElement(
          _common.Screen,
          { className: "complaint-submitted-card" },
          _react2.default.createElement(
            "div",
            null,
            _react2.default.createElement(
              "div",
              { className: "complaint-submitted-boldlabel" },
              _react2.default.createElement(_translationNode2.default, { labelClassName: "complaint-submitted-label", label: "CS_COMPLAINT_SUBMITTED_LABEL1", fontSize: "16px" }),
              _react2.default.createElement(
                _FloatingActionButton2.default,
                { backgroundColor: "#22b25f", style: { marginBottom: "16px" } },
                _react2.default.createElement(_components.Icon, { name: "check", action: "navigation" })
              ),
              this.props.removeGreeting && _react2.default.createElement(_translationNode2.default, { labelClassName: "thank-you-label", id: "thank-you-text", label: "CS_COMPLAINT_SUBMITTED_THANKYOU", fontSize: "16px" }),
              _react2.default.createElement(
                "div",
                { className: "complaint-submitted-complaintNo-cont" },
                _react2.default.createElement(_translationNode2.default, { labelClassName: "complaint-number-label", label: "CS_COMMON_COMPLAINT_NO", fontSize: "16px" }),
                _react2.default.createElement(_translationNode2.default, {
                  labelClassName: "complaint-number-value-label",
                  className: "complaint-number-value",
                  label: complaintnumber,
                  containerStyle: { marginLeft: 5 },
                  labelStyle: { lineHeight: 1.5 }
                })
              ),
              this.props.lastLabel && _react2.default.createElement(
                "div",
                { className: "complaint-submitted-label" },
                this.props.lastLabel
              )
            )
          ),
          _react2.default.createElement(
            "div",
            { className: "responsive-action-button-cont" },
            _react2.default.createElement(_components.Button, {
              id: "complaint-submitted-continue",
              primary: true,
              label: _react2.default.createElement(_translationNode2.default, { buttonLabel: true, label: "CORE_COMMON_CONTINUE" }),
              fullWidth: true,
              onClick: this.continueComplaintSubmit,
              className: "responsive-action-button"
            })
          )
        )
      );
    }
  }]);
  return ComplaintSubmitted;
}(_react.Component);
//import { withRouter } from "react-router";


var mapStateToProps = function mapStateToProps(state) {
  var formKey = "complaint";
  return {
    formKey: formKey,
    form: state.form[formKey]
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, null)(ComplaintSubmitted);