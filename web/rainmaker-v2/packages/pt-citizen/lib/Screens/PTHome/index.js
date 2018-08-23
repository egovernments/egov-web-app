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

var _reactRouterDom = require("react-router-dom");

var _common = require("modules/common");

var _reactRedux = require("react-redux");

var _actions = require("egov-ui-kit/redux/properties/actions");

var _actions2 = require("egov-ui-kit/redux/app/actions");

require("./index.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var iconStyle = {
  width: "45px",
  height: "45px",
  color: "#fe7a51"
};

var listIconStyle = {
  margin: 0,
  top: 0,
  bottom: 0,
  display: "flex",
  alignItems: "center",
  height: "inherit"
};

var labelContainerStyle = {
  marginTop: "25px"
};

var innerDivStyle = {
  padding: "20px 56px 20px 50px",
  borderBottom: "1px solid #e0e0e0"
};

var labelStyle = {
  letterSpacing: 0.6
};

var PTHome = function (_Component) {
  (0, _inherits3.default)(PTHome, _Component);

  function PTHome(props) {
    (0, _classCallCheck3.default)(this, PTHome);

    var _this = (0, _possibleConstructorReturn3.default)(this, (PTHome.__proto__ || Object.getPrototypeOf(PTHome)).call(this, props));

    _this.listItems = [{
      primaryText: _react2.default.createElement(_components.Label, { label: "Completed Assessments", color: "#484848", fontSize: "16px", bold: true, labelStyle: labelStyle }),
      route: "/property-tax/completed-assessments",
      leftIcon: _react2.default.createElement(
        "div",
        { style: listIconStyle },
        _react2.default.createElement(_components.Icon, { action: "action", name: "done" })
      ),
      rightIcon: _react2.default.createElement(
        "div",
        { style: listIconStyle },
        _react2.default.createElement(_components.Icon, { action: "hardware", name: "keyboard-arrow-right" })
      )
    }, {
      primaryText: _react2.default.createElement(_components.Label, { label: "How it works", color: "#484848", fontSize: "16px", bold: true, labelStyle: labelStyle }),
      leftIcon: _react2.default.createElement(
        "div",
        { style: listIconStyle },
        _react2.default.createElement(_components.Icon, { action: "action", name: "help" })
      ),
      rightIcon: _react2.default.createElement(
        "div",
        { style: listIconStyle },
        _react2.default.createElement(_components.Icon, { action: "hardware", name: "keyboard-arrow-right" })
      )
    }, {
      primaryText: _react2.default.createElement(_components.Label, { label: "Examples", color: "#484848", fontSize: "16px", bold: true, labelStyle: labelStyle }),
      leftIcon: _react2.default.createElement(
        "div",
        { style: listIconStyle },
        _react2.default.createElement(_components.Icon, { action: "custom", name: "pt-example" })
      ),
      rightIcon: _react2.default.createElement(
        "div",
        { style: listIconStyle },
        _react2.default.createElement(_components.Icon, { action: "hardware", name: "keyboard-arrow-right" })
      )
    }];

    _this.componentDidMount = function () {
      var _this$props = _this.props,
          addBreadCrumTitle = _this$props.addBreadCrumTitle,
          title = _this$props.title,
          location = _this$props.location,
          fetchProperties = _this$props.fetchProperties,
          userInfo = _this$props.userInfo;
      var pathname = location.pathname;

      var url = pathname && pathname.split("/").pop();
      (title || url) && addBreadCrumTitle(url && url === "property-tax" ? "" : title);
      fetchProperties([{ key: "uuid", value: userInfo.uuid }], [{ key: "userId", value: userInfo.uuid }]);
    };

    _this.handleItemClick = function (item, index) {
      var route = item.route;

      _this.props.history.push(route);
    };

    _this.state = {
      dialogueOpen: false
    };
    return _this;
  }

  (0, _createClass3.default)(PTHome, [{
    key: "render",
    value: function render() {
      var listItems = this.listItems,
          handleItemClick = this.handleItemClick;
      var _props = this.props,
          numProperties = _props.numProperties,
          numDrafts = _props.numDrafts,
          loading = _props.loading;

      return _react2.default.createElement(
        _common.Screen,
        { loading: loading, className: "pt-home-screen" },
        _react2.default.createElement(_components.Card, {
          textChildren: _react2.default.createElement(
            "div",
            null,
            _react2.default.createElement(
              "div",
              { className: "rainmaker-displayInline" },
              _react2.default.createElement(_components.Icon, { style: { marginLeft: "18px" }, action: "action", name: "credit-card", color: "#767676" }),
              _react2.default.createElement(_components.Label, {
                label: "Pay Property Tax",
                containerStyle: { marginLeft: 25, marginTop: 3 },
                labelStyle: labelStyle,
                color: "#484848",
                fontSize: "16px",
                bold: true
              })
            ),
            _react2.default.createElement(
              "div",
              { className: "col-xs-12 row pt-service-list" },
              _react2.default.createElement(
                _reactRouterDom.Link,
                { to: "/property-tax/assess-pay" },
                _react2.default.createElement(
                  "div",
                  { className: "col-xs-4 text-center pt-new-property" },
                  _react2.default.createElement(_components.Icon, { style: iconStyle, action: "communication", name: "business" }),
                  _react2.default.createElement(_components.Label, { label: "Assess & Pay", fontSize: "20px", containerStyle: labelContainerStyle, color: "#484848", bold: true })
                )
              ),
              _react2.default.createElement(
                _reactRouterDom.Link,
                { to: "/property-tax/incomplete-assessments" },
                _react2.default.createElement(
                  "div",
                  { className: "col-xs-4 text-center pt-search-property" },
                  _react2.default.createElement(_components.Icon, { style: iconStyle, action: "image", name: "edit" }),
                  _react2.default.createElement(_components.Label, {
                    label: "Incomplete Assessments (" + numDrafts + ")",
                    fontSize: "20px",
                    containerStyle: labelContainerStyle,
                    color: "#484848",
                    bold: true
                  })
                )
              ),
              _react2.default.createElement(
                _reactRouterDom.Link,
                { to: "/property-tax/my-properties" },
                _react2.default.createElement(
                  "div",
                  { className: "col-xs-4 text-center pt-my-properties" },
                  _react2.default.createElement(_components.Icon, { style: iconStyle, action: "custom", name: "property-tax" }),
                  _react2.default.createElement(_components.Label, { label: "My Properties (" + numProperties + ")", fontSize: "20px", containerStyle: labelContainerStyle, color: "#484848" })
                )
              )
            )
          )
        }),
        _react2.default.createElement(_components.Card, {
          className: "property-tax-card",
          textChildren: _react2.default.createElement(_components.List, {
            innerDivStyle: innerDivStyle,
            onItemClick: handleItemClick,
            listItemStyle: { padding: "0px 20px", borderWidth: "10px 10px 0px" },
            nestedListStyle: { padding: "0px", background: "#f2f2f2" },
            autoGenerateNestedIndicator: false,
            primaryTogglesNestedList: true,
            items: listItems
          })
        })
      );
    }
  }]);
  return PTHome;
}(_react.Component);

var mapStateToProps = function mapStateToProps(state) {
  var properties = state.properties;

  var _ref = properties || {},
      propertiesById = _ref.propertiesById,
      draftsById = _ref.draftsById,
      loading = _ref.loading;

  var numProperties = propertiesById && Object.keys(propertiesById).length;
  var numDrafts = draftsById && Object.keys(draftsById).length;
  return { numProperties: numProperties, numDrafts: numDrafts, loading: loading };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    addBreadCrumTitle: function addBreadCrumTitle(url) {
      return dispatch((0, _actions2.addBreadCrumbs)(url));
    },
    fetchProperties: function fetchProperties(queryObjectProperty, queryObjectDraft) {
      return dispatch((0, _actions.fetchProperties)(queryObjectProperty, queryObjectDraft));
    }
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(PTHome);