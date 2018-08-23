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

var _common = require("modules/common");

var _actions = require("egov-ui-kit/redux/complaints/actions");

var _FeedbackForm = require("./components/FeedbackForm");

var _FeedbackForm2 = _interopRequireDefault(_FeedbackForm);

var _actions2 = require("egov-ui-kit/redux/form/actions");

var _actions3 = require("egov-ui-kit/redux/app/actions");

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

require("./index.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FeedbackFormHOC = (0, _form2.default)({ formKey: "feedback" })(_FeedbackForm2.default);

var Feedback = function (_Component) {
  (0, _inherits3.default)(Feedback, _Component);

  function Feedback() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, Feedback);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = Feedback.__proto__ || Object.getPrototypeOf(Feedback)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      value: []
    }, _this.componentDidMount = function () {
      var _this$props = _this.props,
          fetchComplaints = _this$props.fetchComplaints,
          match = _this$props.match;

      fetchComplaints([{ key: "serviceRequestId", value: match.params.serviceRequestId }]);
    }, _this.onCheck = function (value) {
      var valueArray = _this.state.value.slice(0);
      if (valueArray.indexOf(value) > -1) {
        valueArray.splice(valueArray.indexOf(value), 1);
      } else {
        valueArray.push(value);
      }
      _this.setState({ value: valueArray });
      _this.props.handleFieldChange("feedback", "selectedSevice", valueArray.toString());
    }, _this.onSubmit = function (e) {
      var rating = _this.props.rating;

      if (!rating) {
        e.preventDefault();
        _this.props.toggleSnackbarAndSetText(true, "Please provide ratings", true);
      }
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(Feedback, [{
    key: "render",
    value: function render() {
      var value = this.state.value;

      return _react2.default.createElement(
        _common.Screen,
        { className: "background-white" },
        _react2.default.createElement(FeedbackFormHOC, { onSubmit: this.onSubmit, onCheck: this.onCheck, checkBoxValue: value })
      );
    }
  }]);
  return Feedback;
}(_react.Component);

var mapStateToProps = function mapStateToProps(_ref2) {
  var form = _ref2.form;

  var rating = (0, _get2.default)(form, "feedback.fields.rating.value");

  return { rating: rating };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    fetchComplaints: function fetchComplaints(criteria) {
      return dispatch((0, _actions.fetchComplaints)(criteria));
    },
    handleFieldChange: function handleFieldChange(formKey, fieldKey, value) {
      return dispatch((0, _actions2.handleFieldChange)(formKey, fieldKey, value));
    },
    toggleSnackbarAndSetText: function toggleSnackbarAndSetText(open, message, error) {
      return dispatch((0, _actions3.toggleSnackbarAndSetText)(open, message, error));
    }
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(Feedback);