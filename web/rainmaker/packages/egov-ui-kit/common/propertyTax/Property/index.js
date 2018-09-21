"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toConsumableArray2 = require("babel-runtime/helpers/toConsumableArray");

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

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

var _translationNode = require("egov-ui-kit/utils/translationNode");

var _translationNode2 = _interopRequireDefault(_translationNode);

var _commons = require("egov-ui-kit/utils/commons");

var _PTCommon = require("egov-ui-kit/utils/PTCommon");

var _AssessmentList = require("../AssessmentList");

var _AssessmentList2 = _interopRequireDefault(_AssessmentList);

var _YearDialogue = require("../YearDialogue");

var _YearDialogue2 = _interopRequireDefault(_YearDialogue);

var _Screen = require("egov-ui-kit/common/common/Screen");

var _Screen2 = _interopRequireDefault(_Screen);

var _components = require("egov-ui-kit/components");

var _actions = require("egov-ui-kit/redux/app/actions");

var _actions2 = require("egov-ui-kit/redux/common/actions");

var _PropertyInformation = require("./components/PropertyInformation");

var _PropertyInformation2 = _interopRequireDefault(_PropertyInformation);

var _actions3 = require("egov-ui-kit/redux/properties/actions");

var _TransformedAssessments = require("egov-ui-kit/common/propertyTax/TransformedAssessments");

var _isEqual = require("lodash/isEqual");

var _isEqual2 = _interopRequireDefault(_isEqual);

var _orderBy = require("lodash/orderBy");

var _orderBy2 = _interopRequireDefault(_orderBy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var innerDivStyle = {
  padding: "20px 56px 20px 50px",
  borderBottom: "1px solid #e0e0e0",
  marginLeft: 0
};

var IconStyle = {
  margin: 0,
  top: 0,
  bottom: 0,
  display: "flex",
  alignItems: "center",
  height: "inherit"
};

var listItemStyle = {
  padding: "0px 20px",
  borderWidth: "10px 10px 0px"
};

var appName = process.env.REACT_APP_NAME;

var Property = function (_Component) {
  (0, _inherits3.default)(Property, _Component);

  function Property(props) {
    (0, _classCallCheck3.default)(this, Property);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Property.__proto__ || Object.getPrototypeOf(Property)).call(this, props));

    _initialiseProps.call(_this);

    _this.state = {
      pathName: null,
      dialogueOpen: false,
      urlToAppend: ""
    };
    return _this;
  }

  (0, _createClass3.default)(Property, [{
    key: "render",
    value: function render() {
      var _props = this.props,
          urls = _props.urls,
          location = _props.location,
          history = _props.history,
          generalMDMSDataById = _props.generalMDMSDataById,
          latestPropertyDetails = _props.latestPropertyDetails;
      var closeYearRangeDialogue = this.closeYearRangeDialogue;
      var _state = this.state,
          dialogueOpen = _state.dialogueOpen,
          urlToAppend = _state.urlToAppend;

      var urlArray = [];
      var pathname = location.pathname;

      if (urls.length === 0 && localStorage.getItem("path") === pathname) {
        urlArray = JSON.parse(localStorage.getItem("breadCrumbObject"));
      }
      //const uuid = get(latestPropertyDetails, "citizenInfo.uuid");

      return _react2.default.createElement(
        _Screen2.default,
        null,
        appName === "Citizen" && _react2.default.createElement(_components.BreadCrumbs, { url: urls.length > 0 ? urls : urlArray, pathname: pathname, history: history }),
        _react2.default.createElement(_AssessmentList2.default, {
          onItemClick: this.onListItemClick,
          items: this.getAssessmentListItems(this.props),
          innerDivStyle: innerDivStyle,
          listItemStyle: listItemStyle,
          history: history,
          hoverColor: "#fff",
          generalMDMSDataById: generalMDMSDataById && generalMDMSDataById
          // citizenUserId={uuid}
        }),
        dialogueOpen && _react2.default.createElement(_YearDialogue2.default, { open: dialogueOpen, history: history, urlToAppend: urlToAppend, closeDialogue: closeYearRangeDialogue })
      );
    }
  }]);
  return Property;
}(_react.Component);

var _initialiseProps = function _initialiseProps() {
  var _this2 = this;

  this.componentDidMount = function () {
    var _props2 = _this2.props,
        location = _props2.location,
        addBreadCrumbs = _props2.addBreadCrumbs,
        fetchGeneralMDMSData = _props2.fetchGeneralMDMSData,
        renderCustomTitleForPt = _props2.renderCustomTitleForPt,
        customTitle = _props2.customTitle,
        fetchProperties = _props2.fetchProperties;

    var requestBody = {
      MdmsCriteria: {
        tenantId: "pb",
        moduleDetails: [{
          moduleName: "PropertyTax",
          masterDetails: [{
            name: "Floor"
          }, {
            name: "UsageCategoryMajor"
          }, {
            name: "UsageCategoryMinor"
          }, {
            name: "UsageCategorySubMinor"
          }, {
            name: "OccupancyType"
          }, {
            name: "PropertyType"
          }, {
            name: "PropertySubType"
          }, {
            name: "OwnerType"
          }, {
            name: "UsageCategoryDetail"
          }, {
            name: "SubOwnerShipCategory"
          }]
        }]
      }
    };
    fetchGeneralMDMSData(requestBody, "PropertyTax", ["Floor", "UsageCategoryMajor", "UsageCategoryMinor", "UsageCategorySubMinor", "OccupancyType", "PropertyType", "PropertySubType", "OwnerType", "UsageCategoryDetail", "SubOwnerShipCategory"]);
    fetchProperties([{ key: "ids", value: decodeURIComponent(_this2.props.match.params.propertyId) }, { key: "tenantId", value: _this2.props.match.params.tenantId }]);
    var pathname = location.pathname;

    if (appName === "Citizen" && !(localStorage.getItem("path") === pathname)) {
      customTitle && addBreadCrumbs({ title: customTitle, path: window.location.pathname });
    }
    renderCustomTitleForPt(customTitle);
  };

  this.onListItemClick = function (item) {
    var getSingleAssesmentandStatus = _this2.props.getSingleAssesmentandStatus;
    var route = item.route;

    route && getSingleAssesmentandStatus(route);
  };

  this.onAssessPayClick = function () {
    var _props3 = _this2.props,
        latestPropertyDetails = _props3.latestPropertyDetails,
        propertyId = _props3.propertyId,
        tenantId = _props3.tenantId;

    var assessmentNo = latestPropertyDetails && latestPropertyDetails.assessmentNumber;
    //const uuid = get(latestPropertyDetails, "citizenInfo.uuid");
    localStorage.removeItem("draftId");
    _this2.setState({
      dialogueOpen: true,
      urlToAppend: "/property-tax/assessment-form?assessmentId=" + assessmentNo + "&isReassesment=true&propertyId=" + propertyId + "&tenantId=" + tenantId
    });
  };

  this.getAssessmentListItems = function (props) {
    var propertyItems = props.propertyItems,
        propertyId = props.propertyId,
        history = props.history,
        sortedAssessments = props.sortedAssessments,
        selPropertyDetails = props.selPropertyDetails,
        tenantId = props.tenantId;

    return [{
      primaryText: _react2.default.createElement(_translationNode2.default, { label: "PT_PROPERTY_INFORMATION", fontSize: "16px", color: "#484848", labelStyle: { fontWeight: 500 } }),
      leftIcon: _react2.default.createElement(
        "div",
        { style: IconStyle },
        _react2.default.createElement(_components.Icon, { action: "action", name: "info", color: "#484848" })
      ),
      nestedItems: [{
        secondaryText: _react2.default.createElement(_PropertyInformation2.default, {
          items: propertyItems,
          propertyTaxAssessmentID: propertyId,
          history: history,
          tenantId: tenantId,
          onButtonClick: _this2.onAssessPayClick
        })
      }],
      rightIcon: _react2.default.createElement(
        "div",
        { style: IconStyle },
        _react2.default.createElement(_components.Icon, { action: "hardware", name: "keyboard-arrow-right", color: "#484848" })
      ),
      initiallyOpen: true
    }, {
      primaryText: _react2.default.createElement(_translationNode2.default, { label: "PT_PROPERTY_ASSESSMENT_HISTORY", fontSize: "16px", color: "#484848", labelStyle: { fontWeight: 500 } }),
      leftIcon: _react2.default.createElement(
        "div",
        { style: IconStyle },
        _react2.default.createElement(_components.Icon, { action: "action", name: "receipt", color: "#484848", style: IconStyle })
      ),
      route: selPropertyDetails,
      nestedItems: sortedAssessments && sortedAssessments,
      rightIcon: _react2.default.createElement(
        "div",
        { style: IconStyle },
        _react2.default.createElement(_components.Icon, { action: "hardware", name: "keyboard-arrow-right", color: "#484848" })
      )
    }];
  };

  this.componentWillReceiveProps = function (nextProps) {
    var _props4 = _this2.props,
        customTitle = _props4.customTitle,
        renderCustomTitleForPt = _props4.renderCustomTitleForPt;

    if (!(0, _isEqual2.default)(customTitle, nextProps.customTitle)) {
      renderCustomTitleForPt(nextProps.customTitle);
    }
  };

  this.closeYearRangeDialogue = function () {
    _this2.setState({ dialogueOpen: false });
  };
};

var getAddressInfo = function getAddressInfo(addressObj, extraItems) {
  return addressObj && [{
    heading: "Property Address",
    iconAction: "action",
    iconName: "home",
    items: [{
      key: " House No:",
      value: addressObj.doorNo || "NA"
    }, {
      key: "Street Name:",
      value: addressObj.street || "NA"
    }, {
      key: "Pincode:",
      value: addressObj.pincode || "NA"
    }, {
      key: "Colony Name:",
      value: addressObj.buildingName || "NA"
    }, {
      key: "Mohalla:",
      value: addressObj.locality.name || "NA"
    }, {
      key: "City:",
      value: addressObj.city || "NA"
    }].concat((0, _toConsumableArray3.default)(extraItems))
  }];
};

var transform = function transform(floor, key, generalMDMSDataById, propertySubType) {
  var masterName = key.masterName,
      dataKey = key.dataKey;

  if (!masterName) {
    return floor["occupancyType"] === "RENTED" ? "INR " + floor["arv"] : floor[dataKey] + " sq yards";
  } else {
    if (floor[dataKey]) {
      if (dataKey === "usageCategoryDetail") {
        return generalMDMSDataById["UsageCategoryDetail"] ? generalMDMSDataById["UsageCategoryDetail"][floor[dataKey]].name : generalMDMSDataById["UsageCategorySubMinor"] ? generalMDMSDataById["UsageCategorySubMinor"][floor["usageCategorySubMinor"]].name : "NA";
      }
      if (floor[dataKey] === "NONRESIDENTIAL") {
        return generalMDMSDataById["UsageCategoryMinor"] ? generalMDMSDataById["UsageCategoryMinor"][floor["usageCategoryMinor"]].name : "NA";
      } else if (propertySubType === "SHAREDPROPERTY" && dataKey === "floorNo") {
        return "NA";
      } else {
        return generalMDMSDataById[masterName] ? generalMDMSDataById[masterName][floor[dataKey]].name : "NA";
      }
    } else {
      return "NA";
    }
  }
};

var getAssessmentInfo = function getAssessmentInfo(propertyDetails, keys, generalMDMSDataById) {
  var _ref = propertyDetails || {},
      units = _ref.units;

  return propertyDetails && [{
    heading: "Assessment Information",
    iconAction: "action",
    iconName: "assignment",
    showTable: true,
    tableHeaderItems: [{
      key: "Plot Size:",
      value: propertyDetails.propertySubType === "SHAREDPROPERTY" ? "NA" : propertyDetails.uom ? propertyDetails.landArea + " " + propertyDetails.uom : propertyDetails.landArea + " sq yards"
    }, {
      key: "Type of Building:",
      value: generalMDMSDataById ? propertyDetails.propertySubType ? generalMDMSDataById["PropertySubType"] ? generalMDMSDataById["PropertySubType"][propertyDetails.propertySubType].name : "NA" : generalMDMSDataById["PropertyType"] ? generalMDMSDataById["PropertyType"][propertyDetails.propertyType].name : "NA" : "NA"
    }],
    items: {
      header: units ? ["Floor", "Usage Type", "Sub Usage Type", "Occupancy", "Built Area/Total Annual Rent"] : [],
      values: units ? units.map(function (floor) {
        return {
          value: keys.map(function (key) {
            return transform(floor, key, generalMDMSDataById, propertyDetails.propertySubType);
          })
        };
      }) : []
    }
  }];
};

var getOwnerInfo = function getOwnerInfo(latestPropertyDetails, generalMDMSDataById) {
  var isInstitution = latestPropertyDetails.ownershipCategory === "INSTITUTIONALPRIVATE" || latestPropertyDetails.ownershipCategory === "INSTITUTIONALGOVERNMENT";

  var _ref2 = latestPropertyDetails || {},
      institution = _ref2.institution,
      ownerDetails = _ref2.owners;

  return ownerDetails && [{
    heading: "Ownership Information",
    iconAction: "social",
    iconName: "person",
    nestedItems: true,
    items: ownerDetails.map(function (owner) {
      return {
        items: [isInstitution ? {
          key: "Name of Institution",
          value: institution && institution.name || "NA"
        } : {
          key: "Name",
          value: owner.name || "NA"
        }, isInstitution ? {
          key: "Type of Institution",
          value: institution && institution.type && generalMDMSDataById && generalMDMSDataById["SubOwnerShipCategory"] && generalMDMSDataById["SubOwnerShipCategory"][institution.type].name || "NA"
        } : {
          key: "Gender:",
          value: owner.gender || "NA"
        }, isInstitution ? {
          key: "Name of Authorised Person",
          value: owner.name || "NA"
        } : {
          key: "Mobile No:",
          value: owner.mobileNumber || "NA"
        }, isInstitution ? {
          key: "Designation:",
          value: institution.designation || "NA"
        } : {
          key: "Father's/Husband's Name:",
          value: owner.fatherOrHusbandName || "NA"
        }, isInstitution ? {
          key: "Mobile Number:",
          value: owner.mobileNumber || "NA"
        } : {
          key: "User Category:",
          value: owner && owner.ownerType && generalMDMSDataById && generalMDMSDataById["OwnerType"] && generalMDMSDataById["OwnerType"][owner.ownerType].name || "NA"
        }, isInstitution ? {
          key: "Telephone Number:",
          value: owner.altContactNumber || "NA"
        } : {
          key: "Email ID:",
          value: owner.emailId || "NA"
        }, {
          key: "Correspondence Address:",
          value: owner.permanentAddress || "NA"
        }]
      };
    })
  }];
};

var mapStateToProps = function mapStateToProps(state, ownProps) {
  var app = state.app,
      common = state.common;
  var urls = app.urls,
      localizationLabels = app.localizationLabels;
  var cities = common.cities;

  var _ref3 = state.common || {},
      generalMDMSDataById = _ref3.generalMDMSDataById;

  var _ref4 = state.properties || {},
      propertiesById = _ref4.propertiesById,
      singleAssessmentByStatus = _ref4.singleAssessmentByStatus,
      loading = _ref4.loading;

  var tenantId = ownProps.match.params.tenantId;
  var propertyId = decodeURIComponent(ownProps.match.params.propertyId);
  var selPropertyDetails = propertiesById[propertyId] || {};
  var latestPropertyDetails = (0, _PTCommon.getLatestPropertyDetails)(selPropertyDetails.propertyDetails);
  var addressInfo = getAddressInfo(selPropertyDetails.address, [{ key: "Property ID:", value: selPropertyDetails.propertyId }]) || [];
  var assessmentInfoKeys = [{ masterName: "Floor", dataKey: "floorNo" }, { masterName: "UsageCategoryMajor", dataKey: "usageCategoryMajor" }, { masterName: "UsageCategoryDetail", dataKey: "usageCategoryDetail" }, { masterName: "OccupancyType", dataKey: "occupancyType" }, { masterName: "", dataKey: "unitArea" }];
  var assessmentInfo = generalMDMSDataById ? latestPropertyDetails ? getAssessmentInfo(latestPropertyDetails, assessmentInfoKeys, generalMDMSDataById) : [] : [];
  var ownerInfo = latestPropertyDetails && getOwnerInfo(latestPropertyDetails, generalMDMSDataById) || [];
  var propertyItems = [].concat((0, _toConsumableArray3.default)(addressInfo), (0, _toConsumableArray3.default)(assessmentInfo), (0, _toConsumableArray3.default)(ownerInfo));
  var customTitle = selPropertyDetails && selPropertyDetails.address && (0, _commons.getCommaSeperatedAddress)(selPropertyDetails.address, cities);
  var completedAssessments = (0, _TransformedAssessments.getCompletedTransformedItems)(singleAssessmentByStatus, cities, localizationLabels);
  var sortedAssessments = completedAssessments && (0, _orderBy2.default)(completedAssessments, ["epocDate"], ["desc"]);
  return {
    urls: urls,
    propertyItems: propertyItems,
    propertyId: propertyId,
    tenantId: tenantId,
    customTitle: customTitle,
    latestPropertyDetails: latestPropertyDetails,
    selPropertyDetails: selPropertyDetails,
    sortedAssessments: sortedAssessments,
    generalMDMSDataById: generalMDMSDataById
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    addBreadCrumbs: function addBreadCrumbs(url) {
      return dispatch((0, _actions.addBreadCrumbs)(url));
    },
    fetchGeneralMDMSData: function fetchGeneralMDMSData(requestBody, moduleName, masterName) {
      return dispatch((0, _actions2.fetchGeneralMDMSData)(requestBody, moduleName, masterName));
    },
    fetchProperties: function fetchProperties(queryObjectProperty) {
      return dispatch((0, _actions3.fetchProperties)(queryObjectProperty));
    },
    getSingleAssesmentandStatus: function getSingleAssesmentandStatus(queryObj) {
      return dispatch((0, _actions3.getSingleAssesmentandStatus)(queryObj));
    }
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(Property);