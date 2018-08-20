"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require("babel-runtime/helpers/defineProperty");

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

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

var _TransformedAssessments = require("../common/TransformedAssessments");

var _commons = require("egov-ui-kit/utils/commons");

var _isEqual = require("lodash/isEqual");

var _isEqual2 = _interopRequireDefault(_isEqual);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var innerDivStyle = {
  paddingTop: "16px",
  paddingLeft: 0,
  borderBottom: "1px solid #e0e0e0"
};

var CompletedAssessments = function (_Component) {
  (0, _inherits3.default)(CompletedAssessments, _Component);

  function CompletedAssessments() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, CompletedAssessments);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = CompletedAssessments.__proto__ || Object.getPrototypeOf(CompletedAssessments)).call.apply(_ref, [this].concat(args))), _this), _this.iconStyle = {
      marginLeft: "10px",
      height: "20px"
    }, _this.state = {
      dialogueOpen: false
    }, _this.componentDidMount = function () {
      var _this$props = _this.props,
          renderCustomTitleForPt = _this$props.renderCustomTitleForPt,
          customTitle = _this$props.customTitle;

      renderCustomTitleForPt(customTitle);
    }, _this.componentWillReceiveProps = function (nextProps) {
      var _this$props2 = _this.props,
          customTitle = _this$props2.customTitle,
          renderCustomTitleForPt = _this$props2.renderCustomTitleForPt;

      if (!(0, _isEqual2.default)(customTitle, nextProps.customTitle)) {
        renderCustomTitleForPt(nextProps.customTitle);
      }
    }, _this.closeYearRangeDialogue = function () {
      _this.setState({ dialogueOpen: false });
    }, _this.onNewPropertyButtonClick = function () {
      _this.setState({
        dialogueOpen: true
      });
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(CompletedAssessments, [{
    key: "render",
    value: function render() {
      var _props = this.props,
          urls = _props.urls,
          history = _props.history,
          loading = _props.loading,
          transformedItems = _props.transformedItems,
          location = _props.location;

      var urlArray = [];
      var pathname = location.pathname;

      if (urls.length == 0 && localStorage.getItem("path") === pathname) {
        urlArray = JSON.parse(localStorage.getItem("breadCrumbObject"));
      }
      return _react2.default.createElement(
        _common.Screen,
        { loading: loading },
        _react2.default.createElement(_components.BreadCrumbs, { url: urls.length > 0 ? urls : urlArray, history: history }),
        transformedItems && _react2.default.createElement(_AssessmentList2.default, {
          innerDivStyle: innerDivStyle,
          items: transformedItems,
          noAssessmentMessage: "You have no complete assessments.",
          button: true,
          yearDialogue: this.state.dialogueOpen,
          closeDialogue: this.closeYearRangeDialogue,
          onNewPropertyButtonClick: this.onNewPropertyButtonClick
        })
      );
    }
  }]);
  return CompletedAssessments;
}(_react.Component);

var mapStateToProps = function mapStateToProps(state, ownProps) {
  var _ref3;

  var properties = state.properties;
  var urls = state.app.urls;

  var _ref2 = properties || {},
      loading = _ref2.loading,
      propertiesById = _ref2.propertiesById;

  var propertyId = ownProps.match.params.propertyId;
  var selPropertyDetails = propertiesById[propertyId];
  var customTitle = (0, _commons.getCommaSeperatedAddress)(selPropertyDetails.address.buildingName, selPropertyDetails.address.street);
  var transformedItems = (0, _TransformedAssessments.getTransformedItems)([selPropertyDetails]);

  return _ref3 = { urls: urls, loading: loading, transformedItems: transformedItems }, (0, _defineProperty3.default)(_ref3, "urls", urls), (0, _defineProperty3.default)(_ref3, "customTitle", customTitle), _ref3;
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    addBreadCrumbs: function addBreadCrumbs(url) {
      return dispatch((0, _actions.addBreadCrumbs)(url));
    }
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(CompletedAssessments);