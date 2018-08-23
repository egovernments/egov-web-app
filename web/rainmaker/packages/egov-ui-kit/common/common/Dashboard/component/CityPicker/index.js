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

var _components = require("components");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CityPickerDialog = function (_Component) {
  (0, _inherits3.default)(CityPickerDialog, _Component);

  function CityPickerDialog() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, CityPickerDialog);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = CityPickerDialog.__proto__ || Object.getPrototypeOf(CityPickerDialog)).call.apply(_ref, [this].concat(args))), _this), _this.state = { results: [], searchTerm: "", open: false }, _this.prepareResultsForDisplay = function () {
      var results = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

      return results.map(function (result, index) {
        var mappedResult = {};
        mappedResult.key = result.key;
        mappedResult.primaryText = result.text;
        mappedResult.id = result.key;
        return mappedResult;
      });
    }, _this.onCityFieldClicked = function () {
      _this.setState({
        open: true,
        searchTerm: ""
      });
    }, _this.onClose = function () {
      _this.setState({ open: false });
    }, _this.onItemClick = function (item) {
      var history = _this.props.history;

      if (process.env.REACT_APP_NAME === "Citizen") {
        history.push("pgr-home");
      } else {
        history.push("all-complaints");
      }
    }, _this.autoSuggestCallback = function () {
      var results = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      var searchTerm = arguments[1];

      if (results.length === 0) {
        results.push({ key: "", text: "No City Found" });
      }
      _this.setState({ results: results, searchTerm: searchTerm });
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(CityPickerDialog, [{
    key: "render",
    value: function render() {
      var autoSuggestCallback = this.autoSuggestCallback,
          prepareResultsForDisplay = this.prepareResultsForDisplay,
          onClose = this.onClose,
          onItemClick = this.onItemClick;
      var _props = this.props,
          onDialogueClose = _props.onDialogueClose,
          dialogueOpen = _props.dialogueOpen,
          filteredTenants = _props.filteredTenants,
          moduleItems = _props.moduleItems;
      var _state = this.state,
          results = _state.results,
          searchTerm = _state.searchTerm,
          open = _state.open;

      var displayInitialList = searchTerm.length === 0 ? true : false;
      return _react2.default.createElement(
        "div",
        null,
        _react2.default.createElement(
          _components.Dialog,
          {
            className: "citipicker-dialog",
            titleStyle: { textAlign: "left", padding: "24px 16px" },
            handleClose: onClose,
            bodyStyle: { padding: "0px", overflowX: "hidden", maxHeight: "100%", minHeight: "100px" },
            title: "Choose City",
            modal: false,
            open: dialogueOpen,
            autoScrollBodyContent: true,
            onRequestClose: onDialogueClose,
            style: {
              paddingTop: "0",
              // marginTop: "-30px",
              bottom: "0",
              height: "auto"
            },
            isClose: true
          },
          _react2.default.createElement(_components.AutoSuggest, {
            id: "city-picker-search",
            dataSource: filteredTenants,
            searchInputText: "Search",
            searchKey: "text",
            autoFocus: false,
            callback: autoSuggestCallback
          }),
          _react2.default.createElement(_components.List, {
            onItemClick: onItemClick,
            innerDivStyle: { paddingLeft: "50px" },
            listItemStyle: { borderBottom: "1px solid #eee" },
            items: displayInitialList ? prepareResultsForDisplay(filteredTenants) : prepareResultsForDisplay(results)
          })
        )
      );
    }
  }]);
  return CityPickerDialog;
}(_react.Component);

var getCitiesfromTenantID = function getCitiesfromTenantID(tenantIds, cities) {
  return cities.filter(function (city) {
    return tenantIds && tenantIds.indexOf(city.code) > -1;
  });
};

var mapStateToProps = function mapStateToProps(state, ownProps) {
  var cities = state.common.cities || [];

  var _ref2 = ownProps || [],
      moduleItems = _ref2.moduleItems;

  var tenantIds = moduleItems.length && moduleItems.filter(function (item) {
    return item.moduleTitle === "Complaints";
  })[0].cities;
  var filteredTenants = getCitiesfromTenantID(tenantIds, cities);
  return { cities: cities, filteredTenants: filteredTenants };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps)(CityPickerDialog);