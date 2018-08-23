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

var _AssessmentList = require("../common/AssessmentList");

var _AssessmentList2 = _interopRequireDefault(_AssessmentList);

var _YearDialogue = require("../common/YearDialogue");

var _YearDialogue2 = _interopRequireDefault(_YearDialogue);

var _common = require("modules/common");

var _reactRedux = require("react-redux");

var _actions = require("egov-ui-kit/redux/app/actions");

var _translationNode = require("egov-ui-kit/utils/translationNode");

var _translationNode2 = _interopRequireDefault(_translationNode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var IconStyle = {
  margin: "0px"
};

var listIconStyle = {
  margin: 0,
  top: 0,
  bottom: 0,
  display: "flex",
  alignItems: "center",
  height: "inherit"
};

var innerDivStyle = {
  padding: "20px 56px 20px 50px",
  borderBottom: "1px solid #e0e0e0"
};

var AssessPay = function (_Component) {
  (0, _inherits3.default)(AssessPay, _Component);

  function AssessPay(props) {
    (0, _classCallCheck3.default)(this, AssessPay);

    var _this = (0, _possibleConstructorReturn3.default)(this, (AssessPay.__proto__ || Object.getPrototypeOf(AssessPay)).call(this, props));

    _this.componentDidMount = function () {
      var _this$props = _this.props,
          addBreadCrumbs = _this$props.addBreadCrumbs,
          title = _this$props.title;

      title && addBreadCrumbs({ title: title, path: window.location.pathname });
    };

    _this.closeYearRangeDialogue = function () {
      _this.setState({ dialogueOpen: false });
    };

    _this.onListItemClick = function (item, index) {
      var route = item.route;


      var path = route && route.slice(1);

      switch (path) {
        case "date-dialogue":
          _this.setState({
            dialogueOpen: true
          });
          break;
        default:
          _this.props.history.push(path);
          break;
      }
    };

    _this.state = {
      dialogueOpen: false,
      items: [{
        primaryText: _react2.default.createElement(_translationNode2.default, { label: "Add New Property", fontSize: "16px", color: "#484848", labelStyle: { fontWeight: 500 } }),
        route: "/date-dialogue",
        leftIcon: _react2.default.createElement(
          "div",
          { style: listIconStyle },
          _react2.default.createElement(_components.Icon, { action: "content", name: "add", color: "#484848", style: IconStyle })
        )
      }, {
        primaryText: _react2.default.createElement(_translationNode2.default, { label: "Search Property", fontSize: "16px", color: "#484848", labelStyle: { fontWeight: 500 } }),
        route: "/assess-pay/search-property",
        leftIcon: _react2.default.createElement(
          "div",
          { style: listIconStyle },
          _react2.default.createElement(_components.Icon, { action: "action", name: "search", color: "#484848", style: IconStyle })
        )
      }]
    };
    return _this;
  }

  (0, _createClass3.default)(AssessPay, [{
    key: "render",
    value: function render() {
      var _props = this.props,
          urls = _props.urls,
          history = _props.history;


      return _react2.default.createElement(
        _common.Screen,
        null,
        _react2.default.createElement(_components.BreadCrumbs, { url: urls, history: history }),
        _react2.default.createElement(_AssessmentList2.default, { onItemClick: this.onListItemClick, innerDivStyle: innerDivStyle, items: this.state.items, history: this.props.history }),
        _react2.default.createElement(_YearDialogue2.default, { open: this.state.dialogueOpen, closeDialogue: this.closeYearRangeDialogue })
      );
    }
  }]);
  return AssessPay;
}(_react.Component);

var mapStateToProps = function mapStateToProps(_ref) {
  var app = _ref.app;
  var urls = app.urls;

  return { urls: urls };
};
var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    addBreadCrumbs: function addBreadCrumbs(url) {
      return dispatch((0, _actions.addBreadCrumbs)(url));
    }
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(AssessPay);