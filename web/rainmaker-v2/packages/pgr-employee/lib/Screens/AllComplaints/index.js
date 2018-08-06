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

var _FloatingActionButton = require("material-ui/FloatingActionButton");

var _FloatingActionButton2 = _interopRequireDefault(_FloatingActionButton);

var _common = require("modules/common");

var _actions = require("egov-ui-kit/redux/complaints/actions");

var _translationNode = require("egov-ui-kit/utils/translationNode");

var _translationNode2 = _interopRequireDefault(_translationNode);

var _commons = require("egov-ui-kit/utils/commons");

var _reactRedux = require("react-redux");

var _orderBy = require("lodash/orderBy");

var _orderBy2 = _interopRequireDefault(_orderBy);

var _isEqual = require("lodash/isEqual");

var _isEqual2 = _interopRequireDefault(_isEqual);

var _isEmpty = require("lodash/isEmpty");

var _isEmpty2 = _interopRequireDefault(_isEmpty);

require("./index.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AllComplaints = function (_Component) {
  (0, _inherits3.default)(AllComplaints, _Component);

  function AllComplaints() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, AllComplaints);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = AllComplaints.__proto__ || Object.getPrototypeOf(AllComplaints)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      complaintNo: "",
      mobileNo: "",
      complaints: [],
      search: false,
      value: 0
    }, _this.componentWillReceiveProps = function (nextProps) {
      var _this$props = _this.props,
          role = _this$props.role,
          numCSRComplaint = _this$props.numCSRComplaint,
          numEmpComplaint = _this$props.numEmpComplaint,
          renderCustomTitle = _this$props.renderCustomTitle;

      if (!(0, _isEqual2.default)(_this.props.transformedComplaints, nextProps.transformedComplaints)) {
        var numberOfComplaints = role === "employee" ? nextProps.numEmpComplaint : role === "csr" ? nextProps.numCSRComplaint : 0;
        renderCustomTitle(numberOfComplaints);
      }
    }, _this.onComplaintClick = function (complaintNo) {
      _this.props.history.push("/complaint-details/" + complaintNo);
    }, _this.onComplaintChange = function (e) {
      var inputValue = e.target.value;
      _this.setState({ complaintNo: inputValue });
    }, _this.onMobileChange = function (e) {
      var inputValue = e.target.value;
      _this.setState({ mobileNo: inputValue });
    }, _this.onSearch = function () {
      var _this$state = _this.state,
          complaintNo = _this$state.complaintNo,
          mobileNo = _this$state.mobileNo;
      var fetchComplaints = _this.props.fetchComplaints;

      var queryObj = [];
      if (complaintNo) {
        queryObj.push({ key: "serviceRequestId", value: complaintNo });
      }
      if (mobileNo) {
        queryObj.push({ key: "phone", value: mobileNo });
      }

      if (complaintNo || mobileNo) {
        fetchComplaints(queryObj, true, true);
      }
      _this.setState({ search: true });
    }, _this.clearSearch = function () {
      var fetchComplaints = _this.props.fetchComplaints;

      fetchComplaints([{ key: "status", value: "assigned,open,reassignrequested" }]);
      _this.setState({ mobileNo: "", complaintNo: "", search: false });
    }, _this.onChange = function (value) {
      _this.setState({ value: value });
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(AllComplaints, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _props = this.props,
          role = _props.role,
          userInfo = _props.userInfo,
          numCSRComplaint = _props.numCSRComplaint,
          numEmpComplaint = _props.numEmpComplaint,
          renderCustomTitle = _props.renderCustomTitle;

      var rawRole = userInfo && userInfo.roles && userInfo.roles[0].code.toUpperCase();
      var numberOfComplaints = role === "employee" ? numEmpComplaint : role === "csr" ? numCSRComplaint : 0;
      if (rawRole === "PGR-ADMIN") {
        this.props.history.push("/report/rainmaker-pgr/DepartmentWiseReport");
      } else {
        var _fetchComplaints = this.props.fetchComplaints;

        _fetchComplaints([{ key: "status", value: "assigned,open,reassignrequested" }], true, true);
        renderCustomTitle(numberOfComplaints);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _props2 = this.props,
          loading = _props2.loading,
          history = _props2.history;
      var _state = this.state,
          mobileNo = _state.mobileNo,
          complaintNo = _state.complaintNo,
          search = _state.search;

      var tabStyle = {
        letterSpacing: "0.6px"
      };

      var onComplaintClick = this.onComplaintClick;
      var _props3 = this.props,
          assignedComplaints = _props3.assignedComplaints,
          unassignedComplaints = _props3.unassignedComplaints,
          employeeComplaints = _props3.employeeComplaints,
          role = _props3.role,
          transformedComplaints = _props3.transformedComplaints;

      var hintTextStyle = {
        letterSpacing: "0.7px",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        width: "90%",
        overflow: "hidden"
      };
      return role === "ao" ? _react2.default.createElement(_components.Tabs, {
        className: "employee-complaints-tab",
        onChange: this.onChange,
        tabs: [{
          label: _react2.default.createElement(
            "div",
            { className: "inline-Localization-text" },
            _react2.default.createElement(_translationNode2.default, {
              labelClassName: "unassigned-label-text",
              color: this.state.value === 0 ? "rgba(255,255,255,1)" : "rgba(255,255,255,0.7)",
              bold: true,
              label: "ES_ALL_COMPLAINTS_UNASSIGNED_TAB_LABEL",
              labelStyle: tabStyle
            }),
            _react2.default.createElement(_translationNode2.default, {
              color: this.state.value === 0 ? "rgba(255,255,255,1)" : "rgba(255,255,255,0.7)",
              bold: true,
              label: "(" + unassignedComplaints.length + ")",
              labelStyle: tabStyle
            })
          ),
          children: _react2.default.createElement(
            _common.Screen,
            { loading: loading },
            _react2.default.createElement(
              "div",
              { className: "tab1-content form-without-button-cont-generic" },
              _react2.default.createElement(_common.Complaints, {
                noComplaintMessage: "ES_MYCOMPLAINTS_NO_COMPLAINTS_TO_ASSIGN",
                onComplaintClick: onComplaintClick,
                complaints: unassignedComplaints,
                complaintLocation: true,
                role: role,
                heightOffset: "116px"
              })
            )
          )
        }, {
          label: _react2.default.createElement(
            "div",
            { className: "inline-Localization-text" },
            _react2.default.createElement(_translationNode2.default, {
              labelClassName: "assigned-label-text",
              color: this.state.value === 1 ? "rgba(255,255,255,1)" : "rgba(255,255,255,0.7)",
              bold: true,
              label: "ES_ALL_COMPLAINTS_ASSIGNED_TAB_LABEL",
              labelStyle: tabStyle
            }),
            _react2.default.createElement(_translationNode2.default, {
              color: this.state.value === 1 ? "rgba(255,255,255,1)" : "rgba(255,255,255,0.7)",
              bold: true,
              label: "(" + assignedComplaints.length + ")",
              labelStyle: tabStyle
            })
          ),
          children: _react2.default.createElement(
            _common.Screen,
            { loading: loading },
            _react2.default.createElement(
              "div",
              { className: "tab2-content form-without-button-cont-generic" },
              _react2.default.createElement(_common.Complaints, {
                noComplaintMessage: "ES_MYCOMPLAINTS_NO_ASSIGNED_COMPLAINTS",
                onComplaintClick: onComplaintClick,
                complaints: assignedComplaints,
                complaintLocation: true,
                role: role,
                heightOffset: "116px"
              })
            )
          )
        }]
      }) : role === "csr" ? _react2.default.createElement(
        _common.Screen,
        { loading: loading },
        _react2.default.createElement(
          "div",
          { className: "form-without-button-cont-generic" },
          _react2.default.createElement(_components.Card, {
            id: "complaint-search-card",
            className: "complaint-search-main-card",
            textChildren: _react2.default.createElement(
              "div",
              { className: "complaint-search-cont clearfix" },
              _react2.default.createElement(
                "div",
                { className: "col-xs-12", style: { paddingLeft: 8 } },
                _react2.default.createElement(_translationNode2.default, { label: "Search Complaint", fontSize: 16, dark: true, bold: true })
              ),
              _react2.default.createElement(
                "div",
                { className: "col-sm-3 col-xs-12", style: { paddingLeft: 8, paddingRight: 40 } },
                _react2.default.createElement(_components.TextField, {
                  id: "mobile-no",
                  name: "mobile-no",
                  type: "number",
                  value: mobileNo,
                  hintText: _react2.default.createElement(_translationNode2.default, { label: "CORE_COMMON_MOBILE_NUMBER_PLACEHOLDER", color: "#b3b3b3", fontSize: 16, labelStyle: hintTextStyle }),
                  floatingLabelText: _react2.default.createElement(_translationNode2.default, { key: 0, label: "ES_CREATECOMPLAINT_MOBILE_NUMBER", color: "#03b0c6", fontSize: "12px" }),
                  onChange: function onChange(e, value) {
                    return _this2.onMobileChange(e);
                  },
                  underlineStyle: { bottom: 7 },
                  underlineFocusStyle: { bottom: 7 },
                  hintStyle: { width: "100%" }
                })
              ),
              _react2.default.createElement(
                "div",
                { className: "col-sm-3 col-xs-12", style: { paddingLeft: 8 } },
                _react2.default.createElement(_components.TextField, {
                  id: "complaint-no",
                  name: "complaint-no",
                  value: complaintNo,
                  hintText: _react2.default.createElement(_translationNode2.default, { label: "ES_MYCOMPLAINTS_COMPLAINT_NO", color: "#b3b3b3", fontSize: 16, labelStyle: hintTextStyle }),
                  floatingLabelText: _react2.default.createElement(_translationNode2.default, { key: 1, label: "CS_COMPLAINT_SUBMITTED_COMPLAINT_NO", color: "#03b0c6", fontSize: "12px" }),
                  onChange: function onChange(e, value) {
                    return _this2.onComplaintChange(e);
                  },
                  underlineStyle: { bottom: 7 },
                  underlineFocusStyle: { bottom: 7 },
                  hintStyle: { width: "100%" }
                })
              ),
              _react2.default.createElement(
                "div",
                { className: "col-sm-6 col-xs-12 csr-action-buttons", style: { marginTop: 10, paddingRight: 8 } },
                _react2.default.createElement(_components.Button, {
                  label: _react2.default.createElement(_translationNode2.default, { buttonLabel: true, label: "ES_MYCOMPLAINTS_SEARCH_BUTTON" }),
                  style: { marginRight: 28, width: "36%" },
                  backgroundColor: "#fe7a51",
                  labelStyle: { letterSpacing: 0.7, padding: 0, color: "#fff" },
                  buttonStyle: { border: 0 },
                  onClick: function onClick() {
                    return _this2.onSearch();
                  }
                }),
                _react2.default.createElement(_components.Button, {
                  label: _react2.default.createElement(_translationNode2.default, { buttonLabel: true, color: "#fe7a51", label: "ES_MYCOMPLAINTS_CLEAR_SEARCH_BUTTON" }),
                  labelStyle: { letterSpacing: 0.7, padding: 0, color: "#fe7a51" },
                  buttonStyle: { border: "1px solid #fe7a51" },
                  style: { width: "36%" },
                  onClick: function onClick() {
                    return _this2.clearSearch();
                  }
                })
              )
            )
          })
        ),
        _react2.default.createElement(
          "div",
          { className: "form-without-button-cont-generic" },
          _react2.default.createElement(_common.Complaints, {
            noComplaintMessage: search ? "ES_NO_SEARCH_RESULTS" : "ES_MYCOMPLAINTS_NO_COMPLAINTS_ASSIGNED",
            onComplaintClick: onComplaintClick,
            complaints: transformedComplaints,
            role: role,
            complaintLocation: true
          })
        ),
        _react2.default.createElement(
          "div",
          { className: "floating-button-cont csr-add-button" },
          _react2.default.createElement(
            _FloatingActionButton2.default,
            {
              id: "mycomplaints-add",
              onClick: function onClick(e) {
                history.push("/create-complaint");
              },
              className: "floating-button",
              backgroundColor: "#fe7a51"
            },
            _react2.default.createElement(_components.Icon, { action: "content", name: "add" })
          )
        )
      ) : _react2.default.createElement(
        _common.Screen,
        { loading: loading },
        _react2.default.createElement(
          "div",
          { className: "form-without-button-cont-generic" },
          _react2.default.createElement(_common.Complaints, {
            noComplaintMessage: "ES_MYCOMPLAINTS_NO_COMPLAINTS_ASSIGNED",
            onComplaintClick: onComplaintClick,
            complaints: employeeComplaints,
            role: role,
            complaintLocation: true
          })
        )
      );
    }
  }]);
  return AllComplaints;
}(_react.Component);

var roleFromUserInfo = function roleFromUserInfo() {
  var roles = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var role = arguments[1];

  var roleCodes = roles.map(function (role) {
    return role.code;
  });
  return roleCodes && roleCodes.length && roleCodes.indexOf(role) > -1 ? true : false;
};

var displayStatus = function displayStatus() {
  var status = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";

  var statusObj = {};
  if (status.includes("Overdue")) {
    statusObj.status = status; //Replace by localisation label
    statusObj.statusMessage = "";
  }
  if (status.includes("left")) {
    statusObj.status = status; //Replace by localisation label
    statusObj.statusMessage = "";
  }
  return statusObj;
};

var mapStateToProps = function mapStateToProps(state) {
  var _ref2 = state || {},
      complaints = _ref2.complaints,
      common = _ref2.common;

  var categoriesById = complaints.categoriesById,
      byId = complaints.byId;
  var fetchSuccess = complaints.fetchSuccess;

  var loading = !(0, _isEmpty2.default)(categoriesById) ? fetchSuccess ? false : true : true;

  var _ref3 = common || {},
      citizenById = _ref3.citizenById,
      employeeById = _ref3.employeeById;

  var userInfo = state.auth.userInfo;

  var role = roleFromUserInfo(userInfo.roles, "GRO") ? "ao" : roleFromUserInfo(userInfo.roles, "CSR") ? "csr" : "employee";
  var transformedComplaints = (0, _commons.transformComplaintForComponent)(complaints, role, employeeById, citizenById, categoriesById, displayStatus);
  var assignedComplaints = [],
      unassignedComplaints = [],
      employeeComplaints = [];
  if (role === "ao") {
    assignedComplaints = (0, _orderBy2.default)(transformedComplaints.filter(function (complaint) {
      return complaint.complaintStatus === "ASSIGNED";
    }), ["latestCreationTime"], ["asc"]);
    unassignedComplaints = (0, _orderBy2.default)(transformedComplaints.filter(function (complaint) {
      return complaint.complaintStatus === "UNASSIGNED";
    }), ["latestCreationTime"], ["asc"]);
  } else {
    employeeComplaints = (0, _orderBy2.default)(transformedComplaints.filter(function (complaint) {
      return complaint.complaintStatus === "ASSIGNED" || complaint.rawStatus === "reassignrequested";
    }), ["latestCreationTime"], ["asc"]);
  }
  transformedComplaints = (0, _orderBy2.default)(transformedComplaints, ["latestCreationTime"], ["desc"]);
  var numEmpComplaint = employeeComplaints.length;
  var numCSRComplaint = transformedComplaints.length;
  return { assignedComplaints: assignedComplaints, unassignedComplaints: unassignedComplaints, numEmpComplaint: numEmpComplaint, numCSRComplaint: numCSRComplaint, employeeComplaints: employeeComplaints, role: role, loading: loading, transformedComplaints: transformedComplaints };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    fetchComplaints: function fetchComplaints(criteria, hasUsers, overWrite) {
      return dispatch((0, _actions.fetchComplaints)(criteria, hasUsers, overWrite));
    }
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(AllComplaints);