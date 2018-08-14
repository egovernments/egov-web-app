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

var _component = require("./component");

var _component2 = _interopRequireDefault(_component);

var _translationNode = require("egov-ui-kit/utils/translationNode");

var _translationNode2 = _interopRequireDefault(_translationNode);

require("./index.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Dashboard = function (_Component) {
  (0, _inherits3.default)(Dashboard, _Component);

  function Dashboard() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, Dashboard);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = Dashboard.__proto__ || Object.getPrototypeOf(Dashboard)).call.apply(_ref, [this].concat(args))), _this), _this.moduleData = [{
      moduleTitle: "Complaints",
      moduleDescription: "mSeva Complaints offers an easy to use interface which enables you to lodge civic works related complaints. It also lets you track the status of your complaint and facilitates direct interaction with your municipality till its resolution.",
      button1: "COMPLAINTS HOME",
      button2: "How do i do?",
      borderLeftColor: { borderLeft: "4px solid #a5d6a7" },
      iconAction: "custom",
      iconName: "file-send"
    }, {
      moduleTitle: "Property Tax",
      moduleDescription: "Assess, pay and track your Property Taxes online with mSeva Property Tax.",
      button1: "PT HOME",
      button2: "How do i do?",
      borderLeftColor: { borderLeft: "4px solid #ef9a9a" },
      iconAction: "custom",
      iconName: "file-send",
      route: "property-tax"
    }], _this.onButton1Click = function (item) {
      var history = _this.props.history;
      var route = item.route;

      if (item.moduleTitle === "Property Tax") {
        history && history.push(route);
      }
    }, _this.onButton2Click = function (item) {
      var history = _this.props.history;

      var userType = JSON.parse(localStorage.getItem("user-info")).type;

      if (userType === "CITIZEN") {
        if (item.moduleTitle === "Property Tax") {
          history && history.push("property-tax/how-it-works");
        }
      }
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(Dashboard, [{
    key: "render",
    value: function render() {
      var _props = this.props,
          name = _props.name,
          history = _props.history;
      var onButton1Click = this.onButton1Click,
          onButton2Click = this.onButton2Click;

      return _react2.default.createElement(
        "div",
        { "class": "col-sm-12" },
        _react2.default.createElement(_translationNode2.default, { className: "landingPageUser", label: " Welcome " + name + ", " }),
        _react2.default.createElement(_component2.default, { items: this.moduleData, onButton1Click: onButton1Click, onButton2Click: onButton2Click })
      );
    }
  }]);
  return Dashboard;
}(_react.Component);

var mapStateToProps = function mapStateToProps(state) {
  var auth = state.auth;
  var userInfo = auth.userInfo;

  var name = userInfo && userInfo.name;

  return { name: name };
};
exports.default = (0, _reactRedux.connect)(mapStateToProps, null)(Dashboard);