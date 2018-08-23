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

var _TransformedAssessments = require("../common/TransformedAssessments");

var _actions = require("egov-ui-kit/redux/app/actions");

var _actions2 = require("egov-ui-kit/redux/properties/actions");

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
      // items: [
      //   {
      //     primaryText: <Label label="INR 1300.00" fontSize="16px" color="#484848" bold={true} labelStyle={primaryTextLabelStyle} />,
      //     secondaryText: (
      //       <div style={{ height: "auto" }}>
      //         <Label label="2016-2017" containerStyle={secondaryTextContainer} labelStyle={secondaryTextLabelStyle} />
      //         <Label
      //           label="P-9/2, Banwinder Colony, alwal Road, Indirapuram"
      //           containerStyle={secondaryTextContainer}
      //           labelStyle={secondaryTextLabelStyle}
      //         />
      //         <Label label="Assessment No.: ZRN-453-98" containerStyle={secondaryTextContainer} labelStyle={secondaryTextLabelStyle} />
      //       </div>
      //     ),
      //     date: "12-06-2018",
      //     status: "Partially Paid",
      //     statusIcon: <Icon action="navigation" name="check" style={this.iconStyle} color={"#22b25f"} />,
      //     receipt: true,
      //   },
      // ],
    }, _this.componentDidMount = function () {
      var _this$props = _this.props,
          addBreadCrumbs = _this$props.addBreadCrumbs,
          title = _this$props.title,
          userInfo = _this$props.userInfo,
          fetchProperties = _this$props.fetchProperties;

      title && addBreadCrumbs({ title: title, path: window.location.pathname });
      fetchProperties([{ key: "uuid", value: userInfo.uuid }]);
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
          transformedProperties = _props.transformedProperties,
          loading = _props.loading;

      return _react2.default.createElement(
        _common.Screen,
        { loading: loading },
        _react2.default.createElement(_components.BreadCrumbs, { url: urls, history: history }),
        _react2.default.createElement(_AssessmentList2.default, {
          innerDivStyle: innerDivStyle,
          items: transformedProperties,
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

var mapStateToProps = function mapStateToProps(state) {
  var properties = state.properties;
  var urls = state.app.urls;

  var _ref2 = properties || {},
      loading = _ref2.loading,
      propertiesById = _ref2.propertiesById;

  var numProperties = propertiesById && Object.keys(propertiesById).length;

  var transformedProperties = (0, _TransformedAssessments.getTransformedItems)(propertiesById);
  return { urls: urls, transformedProperties: transformedProperties, loading: loading, numProperties: numProperties };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    addBreadCrumbs: function addBreadCrumbs(url) {
      return dispatch((0, _actions.addBreadCrumbs)(url));
    },
    fetchProperties: function fetchProperties(queryObject) {
      return dispatch((0, _actions2.fetchProperties)(queryObject));
    }
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(CompletedAssessments);