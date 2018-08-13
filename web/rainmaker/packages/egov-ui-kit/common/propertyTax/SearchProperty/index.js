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

var _form = require("egov-ui-kit/hocs/form");

var _form2 = _interopRequireDefault(_form);

var _translationNode = require("egov-ui-kit/utils/translationNode");

var _translationNode2 = _interopRequireDefault(_translationNode);

var _Screen = require("egov-ui-kit/common/common/Screen");

var _Screen2 = _interopRequireDefault(_Screen);

var _components = require("egov-ui-kit/components");

var _actions = require("egov-ui-kit/redux/app/actions");

var _SearchPropertyForm = require("./components/SearchPropertyForm");

var _SearchPropertyForm2 = _interopRequireDefault(_SearchPropertyForm);

var _PropertyTable = require("./components/PropertyTable");

var _PropertyTable2 = _interopRequireDefault(_PropertyTable);

var _utils = require("egov-ui-kit/redux/form/utils");

var _actions2 = require("egov-ui-kit/redux/form/actions");

var _reactRedux = require("react-redux");

var _actions3 = require("egov-ui-kit/redux/properties/actions");

var _BlankAssessment = require("../AssessmentList/components/BlankAssessment");

var _BlankAssessment2 = _interopRequireDefault(_BlankAssessment);

require("./index.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var userType = localStorage.getItem("user-info") && JSON.parse(localStorage.getItem("user-info")).type;

var PropertySearchFormHOC = (0, _form2.default)({ formKey: "searchProperty", path: "PropertyTaxPay" })(_SearchPropertyForm2.default);

var SearchProperty = function (_Component) {
  (0, _inherits3.default)(SearchProperty, _Component);

  function SearchProperty(props) {
    (0, _classCallCheck3.default)(this, SearchProperty);

    var _this = (0, _possibleConstructorReturn3.default)(this, (SearchProperty.__proto__ || Object.getPrototypeOf(SearchProperty)).call(this, props));

    _this.componentDidMount = function () {
      var _this$props = _this.props,
          location = _this$props.location,
          addBreadCrumbs = _this$props.addBreadCrumbs,
          title = _this$props.title;

      var pathname = location && location.pathname;
      if (userType === "CITIZEN" && !(localStorage.getItem("path") === pathname)) {
        title && addBreadCrumbs({ title: title, path: window.location.pathname });
      }
    };

    _this.onSearchClick = function (form, formKey) {
      var _ref = form.fields || {},
          city = _ref.city,
          ids = _ref.ids,
          oldAssessmentNumber = _ref.oldAssessmentNumber,
          mobileNumber = _ref.mobileNumber;

      if (!(0, _utils.validateForm)(form)) {
        _this.props.displayFormErrors(formKey);
      } else if (!oldAssessmentNumber.value && !ids.value && !mobileNumber.value) {
        _this.props.toggleSnackbarAndSetText(true, "Please fill atleast one field along with city", true);
      } else {
        var queryParams = [];
        if (city.value) {
          queryParams.push({ key: "tenantId", value: city.value });
        }
        if (ids.value) {
          queryParams.push({ key: "ids", value: ids.value });
        }
        if (oldAssessmentNumber.value) {
          queryParams.push({ key: "oldAssessmentNumber", value: oldAssessmentNumber.value });
        }
        if (mobileNumber.value) {
          queryParams.push({ key: "mobileNumber", value: mobileNumber.value });
        }
        _this.props.fetchProperties(queryParams);
        _this.setState({ showTable: true });
      }
    };

    _this.extractTableData = function (properties) {
      var history = _this.props.history;

      var tableData = properties.reduce(function (tableData, property, index) {
        var propertyId = property.propertyId,
            oldPropertyId = property.oldPropertyId,
            address = property.address,
            propertyDetails = property.propertyDetails;
        var doorNo = address.doorNo,
            buildingName = address.buildingName,
            street = address.street,
            locality = address.locality;

        var displayAddress = doorNo ? "" + (doorNo ? doorNo + "," : "") + ("" + (buildingName ? buildingName + "," : "")) + ("" + (street ? street + "," : "")) : "" + (locality.name ? locality.name : "");
        var name = propertyDetails[0].owners[0].name;
        var button = _react2.default.createElement(_components.Button, {
          onClick: userType === "CITIZEN" ? function (e) {
            history.push("/property-tax/assessment-form?FY=" + propertyDetails[0].financialYear + "&assessmentId=" + (propertyDetails[0] && propertyDetails[0].assessmentNumber) + "&isReassesment=true&propertyId=" + propertyId);
          } : function (e) {
            history.push("/property-tax/property/" + propertyId);
          },
          label: _react2.default.createElement(_translationNode2.default, { buttonLabel: true, label: userType === "CITIZEN" ? "PT_PAYMENT_ASSESS_AND_PAY" : "View", fontSize: "12px" }),
          value: propertyId,
          primary: true,
          style: { height: 20, lineHeight: "auto", minWidth: "inherit" }
        });
        var item = { index: index + 1, name: name, propertyId: propertyId, oldPropertyId: oldPropertyId, address: displayAddress, action: button };
        tableData.push(item);
        return tableData;
      }, []);
      return tableData;
    };

    _this.onActionClick = function (e) {
      console.log(e);
    };

    _this.closeYearRangeDialogue = function () {
      _this.setState({ dialogueOpen: false });
    };

    _this.onNewPropertyButtonClick = function () {
      _this.setState({
        dialogueOpen: true
      });
    };

    _this.state = {
      dialogueOpen: false,
      searchResult: [],
      showTable: false
    };
    return _this;
  }

  (0, _createClass3.default)(SearchProperty, [{
    key: "render",
    value: function render() {
      var _props = this.props,
          urls = _props.urls,
          location = _props.location,
          history = _props.history,
          propertiesFound = _props.propertiesFound,
          loading = _props.loading;
      var showTable = this.state.showTable;

      var urlArray = [];
      var pathname = location && location.pathname;
      var tableData = this.extractTableData(propertiesFound);
      if (userType === "CITIZEN" && urls.length == 0 && localStorage.getItem("path") === pathname) {
        urlArray = JSON.parse(localStorage.getItem("breadCrumbObject"));
      }
      return _react2.default.createElement(
        _Screen2.default,
        { loading: loading },
        userType === "CITIZEN" ? _react2.default.createElement(_components.BreadCrumbs, { url: urls.length > 0 ? urls : urlArray, history: history }) : [],
        _react2.default.createElement(PropertySearchFormHOC, { history: this.props.history, onSearchClick: this.onSearchClick }),
        tableData.length > 0 && showTable ? _react2.default.createElement(_PropertyTable2.default, { tableData: tableData, onActionClick: this.onActionClick }) : null,
        showTable && tableData.length === 0 && _react2.default.createElement(
          "div",
          { className: "search-no-property-found" },
          _react2.default.createElement(
            "div",
            { className: "no-search-text" },
            "No property records found"
          ),
          _react2.default.createElement(
            "div",
            { className: "new-assess-btn" },
            _react2.default.createElement(_components.Button, {
              label: "New Property Assessment",
              labelStyle: { fontSize: 12 },
              className: "new-property-assessment",
              onClick: function onClick() {
                return history.push("/property-tax");
              },
              primary: true,
              fullWidth: true
            })
          )
        )
      );
    }
  }]);
  return SearchProperty;
}(_react.Component);

var mapStateToProps = function mapStateToProps(state) {
  var properties = state.properties;
  var urls = state.app.urls;

  var _ref2 = properties && properties,
      propertiesById = _ref2.propertiesById,
      loading = _ref2.loading;

  var propertiesFound = Object.values(propertiesById);
  return { propertiesFound: propertiesFound, urls: urls, loading: loading };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    addBreadCrumbs: function addBreadCrumbs(url) {
      return dispatch((0, _actions.addBreadCrumbs)(url));
    },
    displayFormErrors: function displayFormErrors(formKey) {
      return dispatch((0, _actions2.displayFormErrors)(formKey));
    },
    fetchProperties: function fetchProperties(queryObject) {
      return dispatch((0, _actions3.fetchProperties)(queryObject));
    },
    toggleSnackbarAndSetText: function toggleSnackbarAndSetText(open, message, error) {
      return dispatch((0, _actions.toggleSnackbarAndSetText)(open, message, error));
    }
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(SearchProperty);