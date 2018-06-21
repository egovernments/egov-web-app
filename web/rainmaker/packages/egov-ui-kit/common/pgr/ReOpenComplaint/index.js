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

var _common = require("modules/common");

var _translationNode = require("egov-ui-kit/utils/translationNode");

var _translationNode2 = _interopRequireDefault(_translationNode);

var _ReopenComplaintForm = require("./components/ReopenComplaintForm");

var _ReopenComplaintForm2 = _interopRequireDefault(_ReopenComplaintForm);

var _actions = require("egov-ui-kit/redux/complaints/actions");

var _actions2 = require("egov-ui-kit/redux/form/actions");

var _form = require("egov-ui-kit/hocs/form");

var _form2 = _interopRequireDefault(_form);

require("./index.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ReopenComplaintFormHOC = (0, _form2.default)({ formKey: "reopenComplaint" })(_ReopenComplaintForm2.default);

var ReOpenComplaint = function (_Component) {
  (0, _inherits3.default)(ReOpenComplaint, _Component);

  function ReOpenComplaint() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, ReOpenComplaint);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = ReOpenComplaint.__proto__ || Object.getPrototypeOf(ReOpenComplaint)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      valueSelected: "",
      commentValue: ""
    }, _this.options = [{ value: "No work was done", label: _react2.default.createElement(_translationNode2.default, { label: "CS_REOPEN_OPTION_ONE" }) }, { value: "Only partial work was done ", label: _react2.default.createElement(_translationNode2.default, { label: "CS_REOPEN_OPTION_TWO" }) }, { value: "Employee did not turn up", label: _react2.default.createElement(_translationNode2.default, { label: "CS_REOPEN_OPTION_THREE" }) }, { value: "No permanent solution", label: _react2.default.createElement(_translationNode2.default, { label: "CS_REOPEN_OPTION_FOUR" }) }], _this.commentsValue = {}, _this.handleCommentChange = function (e, value) {
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
      _this.props.handleFieldChange("reopenComplaint", "comments", concatvalue);
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(ReOpenComplaint, [{
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
      var handleCommentChange = this.handleCommentChange,
          handleOptionsChange = this.handleOptionsChange;
      var _state = this.state,
          valueSelected = _state.valueSelected,
          commentValue = _state.commentValue;

      return _react2.default.createElement(
        _common.Screen,
        { className: "reopencomplaint-field" },
        _react2.default.createElement(ReopenComplaintFormHOC, {
          options: this.options,
          ontextAreaChange: handleCommentChange,
          handleOptionChange: handleOptionsChange,
          optionSelected: valueSelected,
          commentValue: commentValue
        })
      );
    }
  }]);
  return ReOpenComplaint;
}(_react.Component);

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    fileUpload: function fileUpload(formKey, fieldKey, file) {
      return dispatch((0, _actions2.fileUpload)(formKey, fieldKey, file));
    },
    fetchComplaints: function fetchComplaints(criteria) {
      return dispatch((0, _actions.fetchComplaints)(criteria));
    },
    handleFieldChange: function handleFieldChange(formKey, fieldKey, value) {
      return dispatch((0, _actions2.handleFieldChange)(formKey, fieldKey, value));
    }
  };
};

exports.default = (0, _reactRedux.connect)(null, mapDispatchToProps)(ReOpenComplaint);