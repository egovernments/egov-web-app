"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

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

var _redux = require("redux");

var _withData = require("./withData");

var _withData2 = _interopRequireDefault(_withData);

var _common = require("modules/common");

var _translationNode = require("egov-ui-kit/utils/translationNode");

var _translationNode2 = _interopRequireDefault(_translationNode);

var _actions = require("egov-ui-kit/redux/auth/actions");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var withAuthorization = function withAuthorization() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return function (Component) {
    var Wrapper = function (_React$Component) {
      (0, _inherits3.default)(Wrapper, _React$Component);

      function Wrapper(props) {
        (0, _classCallCheck3.default)(this, Wrapper);

        var _this = (0, _possibleConstructorReturn3.default)(this, (Wrapper.__proto__ || Object.getPrototypeOf(Wrapper)).call(this, props));

        _this.state = {
          titleAddon: ""
        };

        _this.roleFromUserInfo = function (userInfo, role) {
          var roleCodes = userInfo && userInfo.roles ? userInfo.roles.map(function (role) {
            return role.code;
          }) : [];
          return roleCodes && roleCodes.length && roleCodes.indexOf(role) > -1 ? true : false;
        };

        _this.renderCustomTitle = function (numberOfComplaints) {
          var titleAddon = numberOfComplaints ? "(" + numberOfComplaints + ")" : "(0)";
          _this.setState({ titleAddon: titleAddon });
        };

        _this.renderCustomTitleForPt = function (title) {
          var titleAddon = title ? title : "";
          _this.setState({ titleAddon: titleAddon });
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
            var baseUrl = process.env.REACT_APP_NAME === "Citizen" ? "/user/register" : "/user/login";
            this.props.history.replace(redirectionUrl || baseUrl);
          }
        }

        //Duplication due to lack of time for proper testing in PGR

      }, {
        key: "render",
        value: function render() {
          var _this2 = this;

          var hideHeader = options.hideHeader,
              hideFooter = options.hideFooter,
              customTitle = options.customTitle,
              customFor = options.customFor,
              hideFor = options.hideFor,
              title = options.title,
              isHomeScreen = options.isHomeScreen,
              hideTitle = options.hideTitle,
              titleBackground = options.titleBackground,
              hideActionMenu = options.hideActionMenu,
              showNumberOfComplaints = options.showNumberOfComplaints;
          var _props = this.props,
              history = _props.history,
              authenticated = _props.authenticated,
              userInfo = _props.userInfo,
              complaints = _props.complaints;
          var titleAddon = this.state.titleAddon;

          var role = this.roleFromUserInfo(userInfo, "CITIZEN") ? "citizen" : this.roleFromUserInfo(userInfo, "GRO") ? "ao" : this.roleFromUserInfo(userInfo, "CSR") ? "csr" : this.roleFromUserInfo(userInfo, "EMPLOYEE") ? "employee" : this.roleFromUserInfo(userInfo, "PGR-ADMIN") ? "pgr-admin" : "";

          //For restricting citizen to access employee url

          if (process.env.NODE_ENV === "production") {
            var _role = role === "citizen" ? "citizen" : "employee";
            if (window.basename.slice(1).toLowerCase() !== _role) {
              this.props.logout();
            }
          }
          var getUserRole = function getUserRole() {
            var userInfo = _this2.props.userInfo;

            return userInfo && userInfo.roles && userInfo.roles.length > 0 && userInfo.roles[0].code.toUpperCase() || null;
          };
          return _react2.default.createElement(
            "div",
            { className: "rainmaker-header-cont", style: { position: "relative" } },
            !hideHeader && authenticated ? _react2.default.createElement(_common.Header, {
              title: title,
              titleAddon: role !== hideFor && titleAddon && titleAddon,
              userInfo: userInfo,
              role: role,
              options: options,
              history: history,
              className: "rainmaker-header"
            }) : null,
            _react2.default.createElement(
              "div",
              { className: " col-xs-12", style: { padding: 0 } },
              !hideActionMenu && authenticated && _react2.default.createElement(
                "div",
                null,
                _react2.default.createElement(
                  "div",
                  { className: "col-xs-2 action-menu-drawer show-action-menu" },
                  _react2.default.createElement(
                    "div",
                    { className: "rainmaker-action-menu" },
                    _react2.default.createElement(_common.ActionMenu, { role: role })
                  )
                ),
                _react2.default.createElement("div", { className: "col-xs-2  show-action-menu" }),
                " "
              ),
              _react2.default.createElement(
                "div",
                { className: "col-xs-12 col-sm-10", style: { padding: 0 } },
                authenticated ? _react2.default.createElement(
                  "div",
                  null,
                  !hideTitle && role !== hideFor && _react2.default.createElement(
                    "div",
                    { className: "screen-title-label", style: { padding: "24px 0 8px 16px" } },
                    _react2.default.createElement(_translationNode2.default, {
                      className: titleBackground ? "title-white-background screen-title-label" : "screen-title-label",
                      label: role === customFor ? customTitle : title,
                      containerStyle: { marginRight: 3 },
                      dark: true,
                      bold: true,
                      fontSize: 20
                    }),
                    titleAddon && _react2.default.createElement(_translationNode2.default, {
                      className: titleBackground ? "title-white-background screen-title-label" : "screen-title-label",
                      label: titleAddon,
                      dark: true,
                      bold: true,
                      fontSize: 20
                    })
                  ),
                  _react2.default.createElement(Component, (0, _extends3.default)({}, this.props, {
                    title: title,
                    renderCustomTitleForPt: this.renderCustomTitleForPt,
                    renderCustomTitle: this.renderCustomTitle
                  }))
                ) : null
              )
            )
          );
        }
      }]);
      return Wrapper;
    }(_react2.default.Component);

    var mapStateToProps = function mapStateToProps(state) {
      var _state$auth = state.auth,
          authenticated = _state$auth.authenticated,
          userInfo = _state$auth.userInfo;

      var _ref = state || {},
          complaints = _ref.complaints;

      return { authenticated: authenticated, userInfo: userInfo };
    };
    var mapDispatchToProps = function mapDispatchToProps(dispatch) {
      return {
        logout: function logout() {
          return dispatch((0, _actions.logout)());
        }
      };
    };
    return (0, _redux.compose)(_withData2.default, (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps))(Wrapper);
  };
};

exports.default = withAuthorization;