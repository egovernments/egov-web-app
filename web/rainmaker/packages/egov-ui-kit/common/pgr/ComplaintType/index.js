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

var _actions = require("egov-ui-kit/redux/form/actions");

var _translationNode = require("egov-ui-kit/utils/translationNode");

var _translationNode2 = _interopRequireDefault(_translationNode);

var _complaintTypeDataMaker = require("./complaintTypeDataMaker");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var customIconStyles = {
  height: 25,
  width: 25,
  margin: 0,
  top: 10,
  left: 12
};

var ComplaintType = function (_Component) {
  (0, _inherits3.default)(ComplaintType, _Component);

  function ComplaintType() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, ComplaintType);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = ComplaintType.__proto__ || Object.getPrototypeOf(ComplaintType)).call.apply(_ref, [this].concat(args))), _this), _this.state = { results: [], searchTerm: "", dataSource: [], transformedDataSource: [] }, _this.componentDidMount = function () {
      _this.generateDataSource();
    }, _this.generateResultsForAutoComplete = function (categoryList, transformedDataSource) {
      categoryList.forEach(function (item) {
        if (item.hasOwnProperty("nestedItems") && item.nestedItems.length) {
          _this.generateResultsForAutoComplete(item.nestedItems, transformedDataSource);
        } else {
          transformedDataSource.push(item);
        }
      });
    }, _this.generateDataSource = function () {
      var categories = _this.props.categories;

      var categoryList = (0, _complaintTypeDataMaker.getNestedObjFormat)(categories);
      var transformedDataSource = [];
      _this.generateResultsForAutoComplete(categoryList, transformedDataSource);
      _this.setState({ dataSource: categoryList, transformedDataSource: transformedDataSource });
    }, _this.onComplaintTypeChosen = function (item, index) {
      var employeeScreen = _this.props.employeeScreen;

      _this.props.handleFieldChange("complaint", "complaintType", item.id);
      if (employeeScreen) {
        _this.props.onClose();
      } else {
        _this.props.history.goBack();
      }
    }, _this.autoSuggestCallback = function () {
      var results = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      var searchTerm = arguments[1];

      _this.setState({ results: results, searchTerm: searchTerm });
    }, _this.prepareListItem = function (item) {
      var listItem = {};
      var displayKey = item.displayKey,
          id = item.id,
          icon = item.icon;

      listItem.primaryText = _react2.default.createElement(_translationNode2.default, { label: displayKey });
      listItem.id = id;
      listItem.leftIcon = _react2.default.createElement(_components.Icon, { style: customIconStyles, action: "custom", name: icon, color: "#f89a3f" });
      return listItem;
    }, _this.prepareResultsForDisplay = function () {
      var results = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

      return results.map(function (result) {
        var listItem = _this.prepareListItem(result);
        if (result.nestedItems && result.nestedItems.length) {
          // listItem.rightIcon = <Icon action="hardware" name="keyboard-arrow-right" />;
          listItem.nestedItems = _this.prepareResultsForDisplay(result.nestedItems);
        } else {
          listItem.onClick = _this.onComplaintTypeChosen.bind(null, result);
        }
        return listItem;
      });
    }, _this.renderList = function (dataSource, enableClick) {
      return _react2.default.createElement(_components.List, {
        onItemClick: enableClick && _this.onComplaintTypeChosen,
        listItemStyle: { borderBottom: "1px solid #e0e0e0", paddingTop: "8px", paddingBottom: "8px" },
        nestedListStyle: { padding: "0px", background: "#f2f2f2" },
        autoGenerateNestedIndicator: true,
        primaryTogglesNestedList: true,
        items: dataSource
      });
    }, _this.baseContainerStyle = {
      overflowX: "hidden",
      padding: "0px 16px 16px 16px",
      background: "#00bcd1",
      boxShadow: "0 4px 4px 0 rgba(0, 0, 0, 0.24), 0 0 4px 0 rgba(0, 0, 0, 0.12)"
    }, _this.baseTextStyle = { boxShadow: "0 2px 2px 0 rgba(0, 0, 0, 0.24), 0 0 2px 0 rgba(0, 0, 0, 0.12)", background: "#ffffff" }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(ComplaintType, [{
    key: "render",
    value: function render() {
      var autoSuggestCallback = this.autoSuggestCallback,
          prepareResultsForDisplay = this.prepareResultsForDisplay,
          baseContainerStyle = this.baseContainerStyle,
          baseTextStyle = this.baseTextStyle;
      var _state = this.state,
          results = _state.results,
          searchTerm = _state.searchTerm;

      var displayInitialList = searchTerm.length === 0 ? true : false;
      var _state2 = this.state,
          transformedDataSource = _state2.transformedDataSource,
          dataSource = _state2.dataSource;

      return _react2.default.createElement(
        "div",
        { style: { marginBottom: 60 } },
        _react2.default.createElement(_components.AutoSuggest, {
          id: "complainttype-search",
          containerStyle: this.props.containerStyle || baseContainerStyle,
          textFieldStyle: this.props.textFieldStyle || baseTextStyle,
          dataSource: transformedDataSource,
          searchInputText: "Search",
          searchKey: "text",
          callback: autoSuggestCallback,
          autoFocus: true
        }),
        displayInitialList ? this.renderList(prepareResultsForDisplay(dataSource)) : this.renderList(prepareResultsForDisplay(results), true)
      );
    }
  }]);
  return ComplaintType;
}(_react.Component);

var mapStateToProps = function mapStateToProps(state) {
  return {
    categories: state.complaints.categoriesById
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    handleFieldChange: function handleFieldChange(formKey, fieldKey, value) {
      return dispatch((0, _actions.handleFieldChange)(formKey, fieldKey, value));
    }
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(ComplaintType);