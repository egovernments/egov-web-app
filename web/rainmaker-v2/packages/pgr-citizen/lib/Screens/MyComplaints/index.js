"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toConsumableArray2 = require("babel-runtime/helpers/toConsumableArray");

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

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

var _common = require("modules/common");

var _FloatingActionButton = require("material-ui/FloatingActionButton");

var _FloatingActionButton2 = _interopRequireDefault(_FloatingActionButton);

var _actions = require("egov-ui-kit/redux/complaints/actions");

var _actions2 = require("egov-ui-kit/redux/form/actions");

var _commons = require("egov-ui-kit/utils/commons");

var _orderBy = require("lodash/orderBy");

var _orderBy2 = _interopRequireDefault(_orderBy);

var _isEqual = require("lodash/isEqual");

var _isEqual2 = _interopRequireDefault(_isEqual);

require("./index.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MyComplaints = function (_Component) {
  (0, _inherits3.default)(MyComplaints, _Component);

  function MyComplaints() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, MyComplaints);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = MyComplaints.__proto__ || Object.getPrototypeOf(MyComplaints)).call.apply(_ref, [this].concat(args))), _this), _this.componentDidMount = function () {
      var _this$props = _this.props,
          fetchComplaints = _this$props.fetchComplaints,
          resetFiles = _this$props.resetFiles,
          transformedComplaints = _this$props.transformedComplaints,
          renderCustomTitle = _this$props.renderCustomTitle;

      var numberOfComplaints = transformedComplaints && transformedComplaints.length;
      fetchComplaints([]);
      if (_this.props.form && _this.props.form.complaint) {
        resetFiles("complaint");
      }
      renderCustomTitle(numberOfComplaints);
    }, _this.onComplaintClick = function (complaintNo) {
      _this.props.history.push("/complaint-details/" + complaintNo);
    }, _this.componentWillReceiveProps = function (nextProps) {
      var _this$props2 = _this.props,
          role = _this$props2.role,
          transformedComplaints = _this$props2.transformedComplaints,
          renderCustomTitle = _this$props2.renderCustomTitle;

      if (!(0, _isEqual2.default)(transformedComplaints, nextProps.transformedComplaints)) {
        var numberOfComplaints = nextProps.transformedComplaints && nextProps.transformedComplaints.length;
        renderCustomTitle(numberOfComplaints);
      }
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(MyComplaints, [{
    key: "render",
    value: function render() {
      var _props = this.props,
          transformedComplaints = _props.transformedComplaints,
          history = _props.history,
          fetchSuccess = _props.fetchSuccess;
      var onComplaintClick = this.onComplaintClick;

      return _react2.default.createElement(
        _common.Screen,
        { loading: !fetchSuccess, className: "citizen-screen-bottom-padding-clear form-without-button-cont-generic" },
        _react2.default.createElement(
          "div",
          { className: "complaints-main-container clearfix" },
          _react2.default.createElement(_common.Complaints, {
            onComplaintClick: onComplaintClick,
            complaints: transformedComplaints,
            onClick: this.imageOnClick,
            track: true,
            role: "citizen",
            noComplaintMessage: "CS_MYCOMPLAINTS_NO_COMPLAINTS"
          }),
          _react2.default.createElement(
            "div",
            { className: "floating-button-cont" },
            _react2.default.createElement(
              _FloatingActionButton2.default,
              {
                id: "mycomplaints-add",
                onClick: function onClick(e) {
                  history.push("/add-complaint");
                },
                className: "floating-button",
                backgroundColor: "#fe7a51"
              },
              _react2.default.createElement(_components.Icon, { action: "content", name: "add" })
            )
          )
        )
      );
    }
  }]);
  return MyComplaints;
}(_react.Component);

var displayStatus = function displayStatus() {
  var status = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
  var assignee = arguments[1];
  var action = arguments[2];

  var statusObj = {};
  if (status.toLowerCase() == "closed" || status.toLowerCase() == "rejected" || status.toLowerCase() == "resolved") {
    statusObj.status = "CS_COMMON_CLOSED_UCASE";
  } else {
    statusObj.status = "CS_COMMON_OPEN_UCASE";
  }

  if (status) {
    if (status === "open" && action && action === "reopen") {
      statusObj.statusMessage = (0, _commons.displayLocalizedStatusMessage)("reopened");
    } else if (status === "assigned" && action && action === "reassign") {
      statusObj.statusMessage = (0, _commons.displayLocalizedStatusMessage)("reassigned");
    } else {
      statusObj.statusMessage = (0, _commons.displayLocalizedStatusMessage)(status);
    }
  }

  return statusObj;
};

var mapStateToProps = function mapStateToProps(state) {
  var complaints = state.complaints || {};
  var categoriesById = complaints.categoriesById;
  var common = state.common,
      form = state.form;
  var employeeById = common.employeeById,
      citizenById = common.citizenById;

  var role = "citizen";

  var _ref2 = complaints || false,
      loading = _ref2.loading,
      fetchSuccess = _ref2.fetchSuccess;

  var transformedComplaints = (0, _commons.transformComplaintForComponent)(complaints, role, employeeById, citizenById, categoriesById, displayStatus);
  var closedComplaints = (0, _orderBy2.default)(transformedComplaints.filter(function (complaint) {
    return complaint.complaintStatus === "CLOSED";
  }), ["date"], ["desc"]);
  var nonClosedComplaints = (0, _orderBy2.default)(transformedComplaints.filter(function (complaint) {
    return complaint.complaintStatus !== "CLOSED";
  }), ["date"], ["desc"]);
  return { form: form, complaints: complaints, transformedComplaints: [].concat((0, _toConsumableArray3.default)(nonClosedComplaints), (0, _toConsumableArray3.default)(closedComplaints)), loading: loading, fetchSuccess: fetchSuccess };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    fetchComplaints: function fetchComplaints(criteria) {
      return dispatch((0, _actions.fetchComplaints)(criteria));
    },
    resetFiles: function resetFiles(formKey) {
      return dispatch((0, _actions2.resetFiles)(formKey));
    }
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(MyComplaints);