"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof2 = require("babel-runtime/helpers/typeof");

var _typeof3 = _interopRequireDefault(_typeof2);

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

var _components = require("components");

var _download = require("egov-ui-kit/assets/images/download.png");

var _download2 = _interopRequireDefault(_download);

var _translationNode = require("egov-ui-kit/utils/translationNode");

var _translationNode2 = _interopRequireDefault(_translationNode);

var _commons = require("egov-ui-kit/utils/commons");

require("./index.css");

var _isEqual = require("lodash/isEqual");

var _isEqual2 = _interopRequireDefault(_isEqual);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ListCard = function (_Component) {
  (0, _inherits3.default)(ListCard, _Component);

  function ListCard() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, ListCard);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = ListCard.__proto__ || Object.getPrototypeOf(ListCard)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      results: [],
      searchTerm: "",
      selectedEmployeeId: "",
      dataSource: []
    }, _this.avatarStyle = {
      top: 8,
      left: 17,
      height: 33,
      width: 33
    }, _this.mainLabelStyle = {
      letterSpacing: 0.6,
      marginBottom: 4
    }, _this.callIconStyle = {
      width: 16,
      height: 16,
      top: 0,
      right: 30,
      margin: "0px"
    }, _this.prepareRawDataToFormat = function (rawData) {
      var _this$props = _this.props,
          designationsById = _this$props.designationsById,
          departmentById = _this$props.departmentById;

      var seperateByDepartment = rawData && rawData.reduce(function (result, item) {
        if (!result[item.assignments[0].department]) result[item.assignments[0].department] = [];
        result[item.assignments[0].department].push(item);
        return result;
      }, {});
      return seperateByDepartment && Object.keys(seperateByDepartment).map(function (depDetails, index) {
        return {
          id: seperateByDepartment[depDetails][0].assignments[0].department,
          primaryText: _react2.default.createElement(_translationNode2.default, {
            label: (0, _commons.getNameFromId)(departmentById, seperateByDepartment[depDetails][0].assignments[0].department, "Administration"),
            dark: true,
            bold: true,
            containerStyle: { position: "absolute", top: 0, left: 0 },
            labelStyle: _this.mainLabelStyle
          }),
          open: true,
          toplevel: "true",
          nestedItems: seperateByDepartment[depDetails].map(function (depItem, depItemIndex) {
            return {
              id: depItem.id,
              primaryText: _react2.default.createElement(_translationNode2.default, { label: depItem && depItem.name, dark: true, bold: true, labelStyle: _this.mainLabelStyle }),
              leftAvatar: _react2.default.createElement(_components.Image, { circular: true, source: depItem.photo ? depItem.photo : _download2.default, style: _this.avatarStyle }),
              secondaryText: _react2.default.createElement(_translationNode2.default, {
                label: depItem && depItem.assignments && (0, _commons.getNameFromId)(designationsById, depItem.assignments[0].designation, "Engineer"),
                style: { letterSpacing: 0 }
              }),
              rightIcon: depItem && depItem.mobileNumber && _react2.default.createElement(
                "a",
                {
                  className: "pgr-call-icon emp-directory-call-icon-link",
                  href: "tel:+91" + depItem.mobileNumber,
                  style: {
                    textDecoration: "none",
                    height: "inherit",
                    width: "inherit",
                    top: 0,
                    margin: 0,
                    right: 16,
                    bottom: 0,
                    display: "flex",
                    alignItems: "center"
                  }
                },
                _react2.default.createElement(_components.Icon, { className: "emp-directory-call-icon", action: "communication", name: "call", style: _this.callIconStyle, color: "#22b25f" }),
                _react2.default.createElement(
                  "span",
                  { style: { color: "#484848" } },
                  "+91" + depItem.mobileNumber
                )
              )
            };
          })
        };
      });
    }, _this.componentDidMount = function () {
      var APIData = _this.props.APIData;
      var _this2 = _this,
          prepareRawDataToFormat = _this2.prepareRawDataToFormat;
      // initForm(this.formConfig);

      var dataSource = prepareRawDataToFormat(APIData);
      _this.setState({ dataSource: dataSource });
    }, _this.componentWillReceiveProps = function (nextProps) {
      if (!(0, _isEqual2.default)(_this.props.APIData, nextProps.APIData)) {
        var dataSource = _this.prepareRawDataToFormat(nextProps.APIData);
        _this.setState({ dataSource: dataSource });
      }
    }, _this.prepareResultsForDisplay = function () {
      var results = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

      return results.map(function (result) {
        var listItem = {};
        listItem.id = result.id;
        listItem.primaryText = result.primaryText;
        listItem.open = result.open;
        listItem.toplevel = result.toplevel;
        listItem.secondaryText = result.secondaryText;
        listItem.leftAvatar = result.leftAvatar;
        listItem.rightIcon = result.rightIcon;
        listItem.style = result.style && result.style;
        if (result.nestedItems) {
          listItem.nestedItems = result.nestedItems.map(function (nestedItem, index) {
            var item = {};
            item.id = nestedItem.id;
            item.primaryText = nestedItem.primaryText;
            item.secondaryText = nestedItem.secondaryText;
            item.leftAvatar = nestedItem.leftAvatar;
            item.rightIcon = nestedItem.rightIcon;
            item.style = nestedItem.style && nestedItem.style;
            item.onClick = _this.onEmployeeChosen.bind(null, item);
            return item;
          });
        }

        return listItem;
      });
    }, _this.flatten = function (arr) {
      return arr.reduce(function (flat, toFlatten) {
        return flat.concat(Array.isArray(toFlatten) ? _this.flatten(toFlatten) : toFlatten);
      }, []);
    }, _this.changeClickedItem = function (dataSource, id) {
      // let _dataSource = dataSource.map((item) => ({ ...item }));
      for (var i = 0; i < dataSource.length; i++) {
        if (dataSource[i].nestedItems) {
          _this.changeClickedItem(dataSource[i].nestedItems, id);
        }
        if (dataSource[i].id === id) {
          dataSource[i] = (0, _extends3.default)({}, dataSource[i], {
            style: { background: "#f8f8f8", borderLeft: "3px solid #fe7a51" },
            leftAvatar: _react2.default.createElement(
              "div",
              { className: "avatar-selected", style: { width: 33, height: 33, background: "#fe7a51", borderRadius: "50%", top: 8, left: 17 } },
              _react2.default.createElement(_components.Icon, { action: "navigation", name: "check", color: "#ffffff", style: { width: 16, height: 16 } })
            )
          });
        }
      }
      return dataSource;
    }, _this.returnResults = function (searchTerm, dataSource) {
      searchTerm = searchTerm.replace(/\s+/g, "").toLowerCase();
      if (searchTerm.length > 0) {
        return dataSource.filter(function (result) {
          return (0, _typeof3.default)(result["primaryText"]) === "object" ? result["primaryText"].props.label.replace(/\s+/g, "").toLowerCase().indexOf(searchTerm) !== -1 : result["primaryText"].toLowerCase().replace(/\s+/g, "").indexOf(searchTerm) !== -1;
        });
      }
    }, _this.changeDataSourceAndResultsOnClick = function () {
      var _this$state = _this.state,
          selectedEmployeeId = _this$state.selectedEmployeeId,
          searchTerm = _this$state.searchTerm;
      var _this3 = _this,
          prepareRawDataToFormat = _this3.prepareRawDataToFormat,
          generateDataSource = _this3.generateDataSource,
          returnResults = _this3.returnResults;
      var APIData = _this.props.APIData;

      var rawDataSource = prepareRawDataToFormat(APIData);
      _this.setState({ dataSource: rawDataSource });
      var allResultData = generateDataSource(prepareRawDataToFormat(APIData));
      var realResults = returnResults(searchTerm, allResultData);
      if (searchTerm) {
        var resultsAfterClick = _this.changeClickedItem(realResults, selectedEmployeeId);
        _this.setState({ results: resultsAfterClick });
      }

      var dataSourceAfterClick = _this.changeClickedItem(rawDataSource, selectedEmployeeId);
      _this.setState({ dataSource: dataSourceAfterClick });
    }, _this.onEmployeeChosen = function (item, index) {
      var handleFieldChange = _this.props.handleFieldChange;

      var isEmployeeDirectory = window.location.href.includes("employee-directory") ? true : false;
      if (item.toplevel !== "true" && !isEmployeeDirectory) {
        var isReassignScreen = window.location.href.includes("reassign-complaint") ? true : false;
        handleFieldChange("assignee", item.id);
        var intent = isReassignScreen ? "reassign" : "assign";
        handleFieldChange("action", intent);
        _this.setState({ selectedEmployeeId: item.id }, function () {
          return _this.changeDataSourceAndResultsOnClick();
        });
      }
    }, _this.renderList = function (dataSource, enableClick) {
      return _react2.default.createElement(_components.List, {
        onItemClick: _this.onEmployeeChosen,
        listItemStyle: { paddingTop: "8px", paddingBottom: "8px", paddingLeft: "8px", background: "#ffffff" },
        nestedListStyle: { padding: "0px" },
        autoGenerateNestedIndicator: false,
        primaryTogglesNestedList: true,
        innerDivStyle: {
          paddingTop: "8px",
          paddingRight: "0px",
          paddingBottom: "8px",
          paddingLeft: "72px",
          margin: 0
        },
        items: dataSource
      });
    }, _this.autoSuggestCallback = function () {
      var results = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      var searchTerm = arguments[1];

      _this.setState({ results: results, searchTerm: searchTerm }, function () {
        return _this.changeDataSourceAndResultsOnClick();
      });
    }, _this.generateDataSource = function (dataSource) {
      return dataSource && dataSource.reduce(function (transformedDataSource, source) {
        return transformedDataSource.concat(source.nestedItems);
      }, []);
    }, _this.submitAssignee = function (formKey, label, serviceRequestId) {
      var submitForm = _this.props.submitForm;
      var selectedEmployeeId = _this.state.selectedEmployeeId;

      selectedEmployeeId && submitForm(formKey);
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(ListCard, [{
    key: "render",
    value: function render() {
      var _this4 = this;

      var _ref2 = this.props || [],
          APIData = _ref2.APIData;

      var prepareResultsForDisplay = this.prepareResultsForDisplay,
          renderList = this.renderList,
          generateDataSource = this.generateDataSource,
          prepareRawDataToFormat = this.prepareRawDataToFormat;
      var dataSource = this.state.dataSource;

      var realDataSource = generateDataSource(prepareRawDataToFormat(APIData));
      var _state = this.state,
          results = _state.results,
          searchTerm = _state.searchTerm;

      var displayInitialList = searchTerm.length === 0 ? true : false;
      var isEmployeeDirectory = window.location.href.includes("employee-directory") ? true : false;
      var isReassignScreen = window.location.href.includes("reassign-complaint") ? true : false;
      var assignstatus = isReassignScreen ? "ES_ASSIGN_STATUS_REASSIGN" : "ES_ASSIGN_STATUS_ASSIGN";
      var _props = this.props,
          serviceRequestId = _props.serviceRequestId,
          formKey = _props.formKey;

      return _react2.default.createElement(
        "div",
        null,
        _react2.default.createElement(_components.Card, {
          className: "assign-complaint-main-card",
          textChildren: _react2.default.createElement(
            "div",
            { className: "form-without-button-cont-generic" },
            _react2.default.createElement(
              "div",
              { className: "employee-search-cont" },
              isEmployeeDirectory ? "" : _react2.default.createElement(_translationNode2.default, { label: "" + assignstatus, labelStyle: this.mainLabelStyle, containerStyle: { padding: "0 40px 0 0" } }),
              _react2.default.createElement(_components.AutoSuggest, {
                id: "employee-search",
                containerStyle: {
                  margin: "16px 0",
                  padding: "0 8px",
                  background: "#f8f8f8"
                },
                textFieldStyle: { border: 0 },
                searchInputText: _react2.default.createElement(_translationNode2.default, { label: "ES_COMMON_SEARCH_EMPLOYEE" }),
                searchKey: "primaryText.props.label",
                iconStyle: { right: 15, left: "inherit" },
                hintStyle: { letterSpacing: 0, bottom: 10, fontSize: 14 },
                iconPosition: "after",
                callback: this.autoSuggestCallback,
                dataSource: realDataSource
              })
            ),
            _react2.default.createElement(
              "div",
              { className: "employee-list-cont" },
              displayInitialList ? renderList(prepareResultsForDisplay(dataSource), false) : isEmployeeDirectory ? renderList(prepareResultsForDisplay(results), false) : renderList(prepareResultsForDisplay(results), true)
            )
          )
        }),
        !isEmployeeDirectory && _react2.default.createElement(
          "div",
          { className: "responsive-action-button-cont" },
          _react2.default.createElement(_components.Button, {
            className: "responsive-action-button",
            primary: true,
            fullWidth: true,
            label: _react2.default.createElement(_translationNode2.default, { buttonLabel: true, label: isReassignScreen ? "ES_COMMON_REASSIGN" : "ES_COMMON_ASSIGN" }),
            onClick: function onClick() {
              return _this4.submitAssignee(formKey, isReassignScreen ? "RE-ASSIGN" : "ASSIGN", serviceRequestId);
            }
          })
        )
      );
    }
  }]);
  return ListCard;
}(_react.Component);
// import faceOne from "egov-ui-kit/assets/images/faceOne.jpg";


exports.default = ListCard;