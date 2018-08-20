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

var _translationNode = require("egov-ui-kit/utils/translationNode");

var _translationNode2 = _interopRequireDefault(_translationNode);

var _reactRedux = require("react-redux");

var _common = require("modules/common");

var _components = require("components");

var _actions = require("egov-ui-kit/redux/app/actions");

var _actions2 = require("egov-ui-kit/redux/properties/actions");

var _commons = require("egov-ui-kit/utils/commons");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var innerDivStyle = {
  paddingTop: "16px",
  paddingLeft: 0,
  borderBottom: "1px solid #e0e0e0"
};

var MyProperties = function (_Component) {
  (0, _inherits3.default)(MyProperties, _Component);

  function MyProperties(props) {
    (0, _classCallCheck3.default)(this, MyProperties);

    var _this = (0, _possibleConstructorReturn3.default)(this, (MyProperties.__proto__ || Object.getPrototypeOf(MyProperties)).call(this, props));

    _this.closeYearRangeDialogue = function () {
      _this.setState({ dialogueOpen: false });
    };

    _this.componentDidMount = function () {
      var _this$props = _this.props,
          addBreadCrumbs = _this$props.addBreadCrumbs,
          title = _this$props.title,
          fetchProperties = _this$props.fetchProperties,
          userInfo = _this$props.userInfo;

      fetchProperties([{ key: "uuid", value: userInfo.uuid }]); //Unnecessary API call to prevent page break on reload
      // const { pathname } = location;
      // let url = pathname && pathname.split("/").pop();
      title && addBreadCrumbs({ title: title, path: window.location.pathname });
    };

    _this.onNewPropertyButtonClick = function () {
      _this.setState({
        dialogueOpen: true
      });
    };

    _this.onListItemClick = function (item) {
      var propertyId = item.route;

      _this.props.history.push("/property-tax/my-properties/property/" + propertyId);
    };

    _this.state = {
      dialogueOpen: false,
      items: [{
        primaryText: _react2.default.createElement(_translationNode2.default, { label: "EB-154, Maya Enclave, Jail Road, Harinagar", fontSize: "16px", color: "#484848", bold: true }),
        route: "/my-properties/property",
        secondaryText: "Property ID: PQL-98-876"
      }, {
        primaryText: _react2.default.createElement(_translationNode2.default, { label: "P-9/2, Balwinder Colony, Palwal Road, Indirapuram", fontSize: "16px", color: "#484848", bold: true }),
        route: "/my-properties/property",
        secondaryText: "Property ID: JML-34-756"
      }]
    };
    return _this;
  }

  (0, _createClass3.default)(MyProperties, [{
    key: "render",


    // onBreadcrumbsClick = (index, path) => {
    //   const { history } = this.props;
    //   this.setState({
    //     selected: index,
    //   });
    //   history.push(path);
    // };

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
        _react2.default.createElement(_AssessmentList2.default
        // pageTitle={`My Properties (${numProperties})`}
        , { onItemClick: this.onListItemClick,
          innerDivStyle: innerDivStyle,
          items: transformedProperties,
          history: this.props.history,
          noAssessmentMessage: "You have yet to assess for a property. Start Now:",
          button: true,
          yearDialogue: this.state.dialogueOpen,
          closeDialogue: this.closeYearRangeDialogue,
          onNewPropertyButtonClick: this.onNewPropertyButtonClick
        })
      );
    }
  }]);
  return MyProperties;
}(_react.Component);

var mapStateToProps = function mapStateToProps(state) {
  var properties = state.properties;
  var urls = state.app.urls;

  var _ref = properties || {},
      loading = _ref.loading,
      propertiesById = _ref.propertiesById;

  var numProperties = propertiesById && Object.keys(propertiesById).length;
  var transformedProperties = Object.values(propertiesById).map(function (property, index) {
    return {
      primaryText: _react2.default.createElement(_translationNode2.default, {
        label: (0, _commons.getCommaSeperatedAddress)(property.address.buildingName, property.address.street),
        fontSize: "16px",
        color: "#484848",
        bold: true,
        labelStyle: { letterSpacing: 0.6, marginBottom: 15 }
      }),
      secondaryText: _react2.default.createElement(
        "div",
        { className: "rainmaker-displayInline" },
        _react2.default.createElement(_translationNode2.default, { label: "Property Tax Assessment ID: ", dark: true, labelStyle: { letterSpacing: 0.6 } }),
        _react2.default.createElement(_translationNode2.default, { label: property.propertyId, dark: true, labelStyle: { letterSpacing: 0.6, marginLeft: 5 } })
      ),
      route: property.propertyId
    };
  });
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

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(MyProperties);