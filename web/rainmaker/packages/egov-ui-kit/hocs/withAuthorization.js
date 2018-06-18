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

var _reactRedux = require("react-redux");

var _redux = require("redux");

var _withData = require("./withData");

var _withData2 = _interopRequireDefault(_withData);

var _common = require("modules/common");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var actionList = [{
  id: 1535,
  name: "PropertyType",
  url: "url",
  displayName: "Home",
  orderNumber: 1,
  enabled: true,
  serviceCode: "PT",
  code: "null",
  path: "Home",
  navigationURL: "property-tax",
  leftIcon: { action: "action", name: "home" },
  rightIcon: ""
}, {
  id: 1536,
  name: "PropertySubType",
  url: "url",
  displayName: "Information",
  orderNumber: 2,
  enabled: true,
  serviceCode: "PT",
  code: "null",
  path: "Information",
  navigationURL: "mdms/PropertyTax/PropertySubType",
  leftIcon: { action: "action", name: "info" },
  rightIcon: ""
}, {
  id: 1537,
  name: "ConstructionType",
  url: "url",
  displayName: "Payments",
  orderNumber: 3,
  enabled: true,
  serviceCode: "PT",
  code: "null",
  path: "Payments",
  navigationURL: "mdms/PropertyTax/ConstructionType",
  leftIcon: { action: "custom", name: "rupee" },
  rightIcon: ""
}, {
  id: 1538,
  name: "ConstructionSubType",
  url: "url",
  displayName: "Apply",
  orderNumber: 4,
  enabled: true,
  serviceCode: "PT",
  code: "null",
  path: "Apply",
  navigationURL: "mdms/PropertyTax/ConstructionSubType",
  leftIcon: { action: "content", name: "send" },
  rightIcon: ""
}];

var withAuthorization = function withAuthorization() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return function (Component) {
    var Wrapper = function (_React$Component) {
      (0, _inherits3.default)(Wrapper, _React$Component);

      function Wrapper(props) {
        (0, _classCallCheck3.default)(this, Wrapper);

        var _this = (0, _possibleConstructorReturn3.default)(this, (Wrapper.__proto__ || Object.getPrototypeOf(Wrapper)).call(this, props));

        _this.getUserRole = function (userInfo) {
          return userInfo && userInfo.roles && userInfo.roles.length && userInfo.roles[0].code.toLowerCase() || null;
        };

        if (typeof androidAppProxy !== "undefined" && window.androidAppProxy.smsReceiverRunning()) {
          window.androidAppProxy.stopSMSReceiver();
        }
        return _this;
      }

      (0, _createClass3.default)(Wrapper, [{
        key: "componentWillMount",
        value: function componentWillMount() {
          var authenticated = this.props.authenticated;
          var redirectionUrl = options.redirectionUrl;

          if (!authenticated) {
            this.props.history.replace(redirectionUrl || "/citizen/user/login");
          }
        }
      }, {
        key: "render",
        value: function render() {
          var hideHeader = options.hideHeader,
              hideFooter = options.hideFooter,
              title = options.title,
              isHomeScreen = options.isHomeScreen;
          var _props = this.props,
              history = _props.history,
              authenticated = _props.authenticated,
              userInfo = _props.userInfo;

          var role = this.getUserRole(userInfo);

          return _react2.default.createElement(
            "div",
            { className: "rainmaker-header-cont", style: { position: "relative" } },
            !hideHeader && authenticated ? _react2.default.createElement(_common.Header, { title: title, userInfo: userInfo, role: role, options: options, history: history, className: "rainmaker-header" }) : null,
            _react2.default.createElement(
              "div",
              { className: "col-xs-12", style: { padding: 0 } },
              _react2.default.createElement(
                "div",
                { className: "col-xs-2 citizen-drawer" },
                _react2.default.createElement(
                  "div",
                  { className: "citizen-action-menu" },
                  actionList && actionList.length > 0 && _react2.default.createElement(_common.ActionMenu, { actionList: actionList })
                )
              ),
              _react2.default.createElement("div", { className: "col-xs-2" }),
              " ",
              _react2.default.createElement(
                "div",
                { className: "col-xs-10", style: { padding: 0 } },
                authenticated ? _react2.default.createElement(Component, this.props) : null
              )
            ),
            !hideFooter && authenticated ? _react2.default.createElement(
              "div",
              { className: "hidden-md" },
              _react2.default.createElement(_common.Footer, { history: history, role: role })
            ) : null
          );

          // return (
          //   <div className="rainmaker-header-cont" style={{ position: "relative" }}>
          //     {!hideHeader && authenticated ? (
          //       <Header title={title} userInfo={userInfo} role={role} options={options} history={history} className="rainmaker-header" />
          //     ) : null}

          //     <div className="col-xs-12" style={{ padding: 0 }}>
          //       <div className="col-xs-2 citizen-drawer">
          //         <div className="citizen-action-menu">{actionList && actionList.length > 0 && <ActionMenu actionList={actionList} />}</div>
          //       </div>
          //       <div className="col-xs-2" /> {/*Dummy div for proper alignment*/}
          //       <div className="col-xs-10" style={{ padding: 0 }}>
          //         {authenticated ? <Component {...this.props} /> : null}
          //       </div>
          //     </div>
          //     {!hideFooter && authenticated ? (
          //       <div className="hidden-md">
          //         <Footer history={history} role={role} />
          //       </div>
          //     ) : null}
          //   </div>
          // );
        }
      }]);
      return Wrapper;
    }(_react2.default.Component);

    var mapStateToProps = function mapStateToProps(state) {
      var _state$auth = state.auth,
          authenticated = _state$auth.authenticated,
          userInfo = _state$auth.userInfo;

      return { authenticated: authenticated, userInfo: userInfo };
    };
    return (0, _redux.compose)(_withData2.default, (0, _reactRedux.connect)(mapStateToProps))(Wrapper);
  };
};

exports.default = withAuthorization;