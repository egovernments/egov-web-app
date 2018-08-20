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

var _RejectComplaintForm = require("./components/RejectComplaintForm");

var _RejectComplaintForm2 = _interopRequireDefault(_RejectComplaintForm);

var _actions = require("egov-ui-kit/redux/complaints/actions");

var _translationNode = require("egov-ui-kit/utils/translationNode");

var _translationNode2 = _interopRequireDefault(_translationNode);

var _actions2 = require("egov-ui-kit/redux/app/actions");

var _actions3 = require("egov-ui-kit/redux/form/actions");

require("./index.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RejectComplaintHOC = (0, _form2.default)({ formKey: "rejectComplaint" })(_RejectComplaintForm2.default);

var RejectComplaint = function (_Component) {
  (0, _inherits3.default)(RejectComplaint, _Component);

  function RejectComplaint() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, RejectComplaint);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = RejectComplaint.__proto__ || Object.getPrototypeOf(RejectComplaint)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      valueSelected: "",
      commentValue: ""
    }, _this.options = [{ value: "Not a valid complaint", label: _react2.default.createElement(_translationNode2.default, { label: "ES_REASSIGN_OPTION_ONE" }) }, { value: "Out of operational scope", label: _react2.default.createElement(_translationNode2.default, { label: "ES_REJECT_OPTION_TWO" }) },
    // { value: "Operation already underway", label: <Label label="ES_REJECT_OPTION_THREE" /> },
    { value: "Other", label: _react2.default.createElement(_translationNode2.default, { label: "ES_REJECT_OPTION_FOUR" }) }], _this.commentsValue = {}, _this.handleCommentsChange = function (e, value) {
      _this.commentsValue.textVal = e.target.value;
      _this.setState({
        commentValue: e.target.value
      });
      _this.concatComments(_this.commentsValue);
    }, _this.handleOptionsChange = function (event, value) {
      _this.setState({ valueSelected: value });
      _this.commentsValue.radioValue = value;
      _this.concatComments(_this.commentsValue);
    }, _this.concatComments = function (val) {
      var com1 = "";
      var com2 = "";
      if (val.radioValue) {
        com1 = val.radioValue + ";";
      }
      if (val.textVal) {
        com2 = val.textVal;
      }
      var concatvalue = com1 + com2;
      _this.props.handleFieldChange("rejectComplaint", "comments", concatvalue);
    }, _this.onSubmit = function (e) {
      var _this$state = _this.state,
          valueSelected = _this$state.valueSelected,
          commentValue = _this$state.commentValue;
      var toggleSnackbarAndSetText = _this.props.toggleSnackbarAndSetText;

      if (valueSelected === "Other" && !commentValue) {
        e.preventDefault();
        toggleSnackbarAndSetText(true, "Please mention your reason", true);
      }
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(RejectComplaint, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _props = this.props,
          fetchComplaints = _props.fetchComplaints,
          match = _props.match;

      fetchComplaints([{ key: "serviceRequestId", value: match.params.serviceRequestId }]);
    }
  }, {
    key: "render",
    value: function render() {
      var handleCommentsChange = this.handleCommentsChange,
          handleOptionsChange = this.handleOptionsChange,
          onSubmit = this.onSubmit;
      var _state = this.state,
          valueSelected = _state.valueSelected,
          commentValue = _state.commentValue;


      return _react2.default.createElement(
        _common.Screen,
        { className: "background-white" },
        _react2.default.createElement(RejectComplaintHOC, {
          options: this.options,
          ontextAreaChange: handleCommentsChange,
          handleOptionChange: handleOptionsChange,
          optionSelected: valueSelected,
          commentValue: commentValue,
          onSubmit: onSubmit
        })
      );
    }
  }]);
  return RejectComplaint;
}(_react.Component);

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    fetchComplaints: function fetchComplaints(criteria) {
      return dispatch((0, _actions.fetchComplaints)(criteria));
    },
    handleFieldChange: function handleFieldChange(formKey, fieldKey, value) {
      return dispatch((0, _actions3.handleFieldChange)(formKey, fieldKey, value));
    },
    toggleSnackbarAndSetText: function toggleSnackbarAndSetText(open, message, error) {
      return dispatch((0, _actions2.toggleSnackbarAndSetText)(open, message, error));
    }
  };
};

exports.default = (0, _reactRedux.connect)(null, mapDispatchToProps)(RejectComplaint);