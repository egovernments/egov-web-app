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

var _actions2 = require("egov-ui-kit/redux/form/actions");

var _actions3 = require("egov-ui-kit/redux/app/actions");

var _ComplaintResolvedForm = require("./components/ComplaintResolvedForm");

var _ComplaintResolvedForm2 = _interopRequireDefault(_ComplaintResolvedForm);

require("./index.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ComplaintResolvedHOC = (0, _form2.default)({ formKey: "complaintResolved" })(_ComplaintResolvedForm2.default);

var ComplaintResolved = function (_Component) {
  (0, _inherits3.default)(ComplaintResolved, _Component);

  function ComplaintResolved() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, ComplaintResolved);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = ComplaintResolved.__proto__ || Object.getPrototypeOf(ComplaintResolved)).call.apply(_ref, [this].concat(args))), _this), _this.onSubmit = function (e) {
      if (!_this.props.isFormValid) {
        e.preventDefault();
        _this.props.toggleSnackbarAndSetText(true, "Please upload photo or write comments", true);
      }
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(ComplaintResolved, [{
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
      return _react2.default.createElement(
        _common.Screen,
        { className: "background-white" },
        _react2.default.createElement(ComplaintResolvedHOC, { onSubmit: this.onSubmit })
      );
    }
  }]);
  return ComplaintResolved;
}(_react.Component);

var mapStateToProps = function mapStateToProps(state) {
  var _ref2 = state || {},
      form = _ref2.form;

  var _ref3 = form && form["complaintResolved"] || {},
      fields = _ref3.fields,
      files = _ref3.files;

  var formValidArray = fields ? Object.keys(fields).reduce(function (result, current) {
    if (current !== "action") {
      var formValid = fields[current].value || files && files.media && files.media.length ? true : false;
      result.push(formValid);
    }
    return result;
  }, []) : [];
  var isFormValid = formValidArray && formValidArray.length ? formValidArray.indexOf(true) === -1 ? false : true : false;
  return { isFormValid: isFormValid };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    fileUpload: function fileUpload(formKey, fieldKey, file) {
      return dispatch((0, _actions2.fileUpload)(formKey, fieldKey, file));
    },
    fetchComplaints: function fetchComplaints(criteria) {
      return dispatch((0, _actions.fetchComplaints)(criteria));
    },
    toggleSnackbarAndSetText: function toggleSnackbarAndSetText(open, message, error) {
      return dispatch((0, _actions3.toggleSnackbarAndSetText)(open, message, error));
    }
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(ComplaintResolved);