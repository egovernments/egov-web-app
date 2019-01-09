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

var _utils = require("egov-ui-kit/redux/app/utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var innerDivStyle = {
  padding: "0",
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

var locale = window.localStorage.getItem("locale") || "en_IN";
console.log(locale);
var localizationLabelsData = (0, _utils.initLocalizationLabels)(locale);

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
      var clsName = appName === "Citizen" ? "screen-with-bredcrumb" : "";
      return _react2.default.createElement(
        _Screen2.default,
        { className: clsName },
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

    console.log("sorted assessments are.....", sortedAssessments);
    return [{
      primaryText: _react2.default.createElement(_translationNode2.default, { label: "PT_PROPERTY_INFORMATION", labelClassName: "property-info-title" }),
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
      primaryText: _react2.default.createElement(_translationNode2.default, { label: "PT_PROPERTY_ASSESSMENT_HISTORY", labelClassName: "property-info-title" }),
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
    heading: (0, _commons.getTranslatedLabel)("PT_PROPERTY_ADDRESS_SUB_HEADER", localizationLabelsData),
    iconAction: "action",
    iconName: "home",
    items: [{
      key: (0, _commons.getTranslatedLabel)("PT_PROPERTY_ADDRESS_HOUSE_NO", localizationLabelsData),
      value: addressObj.doorNo || "NA"
    }, {
      key: (0, _commons.getTranslatedLabel)("PT_PROPERTY_ADDRESS_STREET_NAME", localizationLabelsData),
      value: addressObj.street || "NA"
    }, {
      key: (0, _commons.getTranslatedLabel)("PT_PROPERTY_ADDRESS_PINCODE", localizationLabelsData),
      value: addressObj.pincode || "NA"
    }, {
      key: (0, _commons.getTranslatedLabel)("PT_PROPERTY_ADDRESS_COLONY_NAME", localizationLabelsData),
      value: addressObj.buildingName || "NA"
    }, {
      key: (0, _commons.getTranslatedLabel)("PT_PROPERTY_ADDRESS_MOHALLA", localizationLabelsData),
      value: addressObj.locality.name || "NA"
    }, {
      key: (0, _commons.getTranslatedLabel)("PT_PROPERTY_ADDRESS_CITY", localizationLabelsData),
      value: addressObj.city || "NA"
    }].concat((0, _toConsumableArray3.default)(extraItems))
  }];
};

var transform = function transform(floor, key, generalMDMSDataById, propertyDetails) {
  var propertySubType = propertyDetails.propertySubType,
      usageCategoryMajor = propertyDetails.usageCategoryMajor;
  var masterName = key.masterName,
      dataKey = key.dataKey;

  if (!masterName) {
    return floor["occupancyType"] === "RENTED" ? "INR " + floor["arv"] : Math.round(floor[dataKey] * 100) / 100 + " sq yards";
  } else {
    if (floor[dataKey]) {
      if (dataKey === "usageCategoryDetail") {
        return generalMDMSDataById["UsageCategoryDetail"] ? generalMDMSDataById["UsageCategoryDetail"][floor[dataKey]].name : generalMDMSDataById["UsageCategorySubMinor"] ? generalMDMSDataById["UsageCategorySubMinor"][floor["usageCategorySubMinor"]].name : "NA";
      }
      // if (usageCategoryMajor === "RESIDENTIAL" && propertySubType === "SHAREDPROPERTY" && dataKey === "floorNo") {
      //   return "NA";
      // }
      if (floor[dataKey] === "NONRESIDENTIAL") {
        return generalMDMSDataById["UsageCategoryMinor"] ? generalMDMSDataById["UsageCategoryMinor"][floor["usageCategoryMinor"]].name : "NA";
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
    heading: (0, _commons.getTranslatedLabel)("PT_ASSESMENT_INFO_SUB_HEADER", localizationLabelsData),
    iconAction: "action",
    iconName: "assignment",
    showTable: true,
    tableHeaderItems: [{
      key: (0, _commons.getTranslatedLabel)("PT_ASSESMENT_INFO_PLOT_SIZE", localizationLabelsData),
      value: propertyDetails.propertySubType === "SHAREDPROPERTY" ? "NA" : propertyDetails.uom ? propertyDetails.landArea + " " + propertyDetails.uom : Math.round(propertyDetails.landArea * 100) / 100 + " sq yards"
    }, {
      key: (0, _commons.getTranslatedLabel)("PT_ASSESMENT_INFO_TYPE_OF_BUILDING", localizationLabelsData),
      value: generalMDMSDataById ? propertyDetails.propertySubType ? generalMDMSDataById["PropertySubType"] ? generalMDMSDataById["PropertySubType"][propertyDetails.propertySubType].name : "NA" : generalMDMSDataById["PropertyType"] ? generalMDMSDataById["PropertyType"][propertyDetails.propertyType].name : "NA" : "NA"
    }],
    items: {
      header: units ? [(0, _commons.getTranslatedLabel)("PT_ASSESMENT_INFO_FLOOR", localizationLabelsData), (0, _commons.getTranslatedLabel)("PT_ASSESMENT_INFO_USAGE_TYPE", localizationLabelsData), (0, _commons.getTranslatedLabel)("PT_ASSESMENT_INFO_SUB_USAGE_TYPE", localizationLabelsData), (0, _commons.getTranslatedLabel)("PT_ASSESMENT_INFO_OCCUPLANCY", localizationLabelsData), (0, _commons.getTranslatedLabel)("PT_ASSESMENT_INFO_AREA_RENT", localizationLabelsData)] : [],
      values: units ? units.map(function (floor) {
        return {
          value: keys.map(function (key) {
            return transform(floor, key, generalMDMSDataById, propertyDetails);
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
    heading: (0, _commons.getTranslatedLabel)("PT_OWNERSHIP_INFO_SUB_HEADER", localizationLabelsData),
    iconAction: "social",
    iconName: "person",
    nestedItems: true,
    items: ownerDetails.map(function (owner) {
      return {
        items: [isInstitution ? {
          key: (0, _commons.getTranslatedLabel)("PT_OWNERSHIP_INFO_NAME_INSTI", localizationLabelsData),
          value: institution && institution.name || "NA"
        } : {
          key: (0, _commons.getTranslatedLabel)("PT_OWNERSHIP_INFO_NAME", localizationLabelsData),
          value: owner.name || "NA"
        }, isInstitution ? {
          key: (0, _commons.getTranslatedLabel)("PT_OWNERSHIP_INFO_TYPE_INSTI", localizationLabelsData),
          value: institution && institution.type && generalMDMSDataById && generalMDMSDataById["SubOwnerShipCategory"] && generalMDMSDataById["SubOwnerShipCategory"][institution.type].name || "NA"
        } : {
          key: (0, _commons.getTranslatedLabel)("PT_OWNERSHIP_INFO_GENDER", localizationLabelsData),
          value: owner.gender || "NA"
        }, isInstitution ? {
          key: (0, _commons.getTranslatedLabel)("PT_OWNERSHIP_INFO_NAME_OF_AUTH", localizationLabelsData),
          value: owner.name || "NA"
        } : {
          key: (0, _commons.getTranslatedLabel)("PT_OWNERSHIP_INFO_MOBILE_NO", localizationLabelsData),
          value: owner.mobileNumber || "NA"
        }, isInstitution ? {
          key: (0, _commons.getTranslatedLabel)("PT_OWNERSHIP_INFO_DESIGNATION", localizationLabelsData),
          value: institution.designation || "NA"
        } : {
          key: (0, _commons.getTranslatedLabel)("PT_OWNERSHIP_INFO_FATHER_NAME", localizationLabelsData),
          value: owner.fatherOrHusbandName || "NA"
        }, isInstitution ? {
          key: (0, _commons.getTranslatedLabel)("PT_OWNERSHIP_INFO_MOBILE_NO", localizationLabelsData),
          value: owner.mobileNumber || "NA"
        } : {
          key: (0, _commons.getTranslatedLabel)("PT_OWNERSHIP_INFO_USER_CATEGORY", localizationLabelsData),
          value: owner && owner.ownerType && generalMDMSDataById && generalMDMSDataById["OwnerType"] && generalMDMSDataById["OwnerType"][owner.ownerType].name || "NA"
        }, isInstitution ? {
          key: (0, _commons.getTranslatedLabel)("PT_OWNERSHIP_INFO_TEL_NO", localizationLabelsData),
          value: owner.altContactNumber || "NA"
        } : {
          key: (0, _commons.getTranslatedLabel)("PT_OWNERSHIP_INFO_EMAIL_ID", localizationLabelsData),
          value: owner.emailId || "NA"
        }, {
          key: (0, _commons.getTranslatedLabel)("PT_OWNERSHIP_INFO_CORR_ADDR", localizationLabelsData),
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
  var addressInfo = getAddressInfo(selPropertyDetails.address, [{ key: (0, _commons.getTranslatedLabel)("PT_PROPERTY_ADDRESS_PROPERTY_ID", localizationLabels), value: selPropertyDetails.propertyId }]) || [];
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