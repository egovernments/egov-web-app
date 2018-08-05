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

var _AssessmentList = require("../common/AssessmentList");

var _AssessmentList2 = _interopRequireDefault(_AssessmentList);

var _common = require("modules/common");

var _reactRedux = require("react-redux");

var _components = require("components");

var _actions = require("egov-ui-kit/redux/app/actions");

var _translationNode = require("egov-ui-kit/utils/translationNode");

var _translationNode2 = _interopRequireDefault(_translationNode);

var _commons = require("egov-ui-kit/utils/commons");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var secondaryTextLabelStyle = {
  letterSpacing: 0.5
};

var primaryTextLabelStyle = {
  letterSpacing: 0.6
};

var secondaryTextContainer = {
  marginTop: 5
};

var innerDivStyle = {
  paddingTop: "16px",
  paddingLeft: 0,
  borderBottom: "1px solid #e0e0e0"
};

var IncompleteAssessments = function (_Component) {
  (0, _inherits3.default)(IncompleteAssessments, _Component);

  function IncompleteAssessments() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, IncompleteAssessments);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = IncompleteAssessments.__proto__ || Object.getPrototypeOf(IncompleteAssessments)).call.apply(_ref, [this].concat(args))), _this), _this.iconStyle = {
      marginLeft: "10px",
      height: "20px"
    }, _this.state = {
      items: [{
        primaryText: _react2.default.createElement(_translationNode2.default, { label: "2016 - 2017", fontSize: "16px", labelStyle: primaryTextLabelStyle, color: "#484848", bold: true }),
        secondaryText: _react2.default.createElement(
          "div",
          { style: { height: "auto" } },
          _react2.default.createElement(_translationNode2.default, {
            label: "EB-154, Maya Enclave, Jail Road",
            fontSize: "14px",
            labelStyle: secondaryTextLabelStyle,
            containerStyle: secondaryTextContainer
          }),
          _react2.default.createElement(_translationNode2.default, { label: "Assessment No.: ZRN-453-98", fontSize: "13px", labelStyle: secondaryTextLabelStyle, containerStyle: secondaryTextContainer })
        ),
        date: "12-06-2018",
        status: "Payment failed"
      }]
    }, _this.componentDidMount = function () {
      var _this$props = _this.props,
          addBreadCrumbs = _this$props.addBreadCrumbs,
          title = _this$props.title;

      title && addBreadCrumbs({ title: title, path: window.location.pathname });
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(IncompleteAssessments, [{
    key: "render",
    value: function render() {
      var _props = this.props,
          urls = _props.urls,
          history = _props.history,
          transformedDrafts = _props.transformedDrafts,
          loading = _props.loading;

      return _react2.default.createElement(
        _common.Screen,
        { loading: loading },
        _react2.default.createElement(_components.BreadCrumbs, { url: urls, history: history }),
        _react2.default.createElement(_AssessmentList2.default, {
          history: history,
          items: transformedDrafts,
          innerDivStyle: innerDivStyle,
          noAssessmentMessage: "You have no incomplete assessments!",
          button: false
        })
      );
    }
  }]);
  return IncompleteAssessments;
}(_react.Component);

var mapStateToProps = function mapStateToProps(state) {
  var properties = state.properties;
  var urls = state.app.urls;

  var _ref2 = properties || {},
      loading = _ref2.loading,
      draftsById = _ref2.draftsById;

  var numDrafts = draftsById && Object.keys(draftsById).length;
  var transformedDrafts = Object.values(draftsById).map(function (draft, index) {
    return {
      primaryText: _react2.default.createElement(_translationNode2.default, {
        label: draft.draftRecord.propertyDetails[0] && draft.draftRecord.propertyDetails[0].financialYear,
        fontSize: "16px",
        color: "#484848",
        labelStyle: primaryTextLabelStyle,
        bold: true
      }),
      secondaryText: _react2.default.createElement(
        "div",
        { style: { height: "auto" } },
        _react2.default.createElement(_translationNode2.default, {
          label: (0, _commons.getCommaSeperatedAddress)(draft.draftRecord.address.buildingName, draft.draftRecord.address.street),
          labelStyle: secondaryTextLabelStyle,
          fontSize: "14px",
          containerStyle: secondaryTextContainer,
          color: "#484848"
        })
      ),
      assessmentNo: draft.id,
      date: draft.draftRecord.propertyDetails[0] && draft.draftRecord.propertyDetails[0].assessmentDate,
      status: "Saved Draft"
    };
  });
  return { urls: urls, loading: loading, numDrafts: numDrafts, transformedDrafts: transformedDrafts };
};
var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    addBreadCrumbs: function addBreadCrumbs(url) {
      return dispatch((0, _actions.addBreadCrumbs)(url));
    }
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(IncompleteAssessments);