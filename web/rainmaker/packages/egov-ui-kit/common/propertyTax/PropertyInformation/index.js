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

var _AssessmentList = require("../AssessmentList");

var _AssessmentList2 = _interopRequireDefault(_AssessmentList);

var _Screen = require("egov-ui-kit/common/common/Screen");

var _Screen2 = _interopRequireDefault(_Screen);

var _Icon = require("egov-ui-kit/components/Icon");

var _Icon2 = _interopRequireDefault(_Icon);

var _BreadCrumbs = require("egov-ui-kit/components/BreadCrumbs");

var _BreadCrumbs2 = _interopRequireDefault(_BreadCrumbs);

var _actions = require("egov-ui-kit/redux/app/actions");

var _actions2 = require("egov-ui-kit/redux/common/actions");

var _PropertyInformation = require("./components/PropertyInformation");

var _PropertyInformation2 = _interopRequireDefault(_PropertyInformation);

var _isEqual = require("lodash/isEqual");

var _isEqual2 = _interopRequireDefault(_isEqual);

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

var Property = function (_Component) {
  (0, _inherits3.default)(Property, _Component);

  function Property(props) {
    (0, _classCallCheck3.default)(this, Property);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Property.__proto__ || Object.getPrototypeOf(Property)).call(this, props));

    _initialiseProps.call(_this);

    _this.state = {
      pathName: null,
      dialogueOpen: false
    };
    return _this;
  }

  (0, _createClass3.default)(Property, [{
    key: "render",
    value: function render() {
      var _props = this.props,
          urls = _props.urls,
          location = _props.location,
          history = _props.history;

      var urlArray = [];
      var pathname = location.pathname;

      if (urls.length === 0 && localStorage.getItem("path") === pathname) {
        urlArray = JSON.parse(localStorage.getItem("breadCrumbObject"));
      }

      return _react2.default.createElement(
        _Screen2.default,
        null,
        _react2.default.createElement(_BreadCrumbs2.default, { url: urls.length > 0 ? urls : urlArray, pathname: pathname, history: history }),
        _react2.default.createElement(_AssessmentList2.default, {
          items: this.getAssessmentListItems(this.props),
          innerDivStyle: innerDivStyle,
          listItemStyle: listItemStyle,
          history: history
        })
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
        customTitle = _props2.customTitle;

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
          }]
        }]
      }
    };
    fetchGeneralMDMSData(requestBody, "PropertyTax", ["Floor", "UsageCategoryMajor", "UsageCategoryMinor", "UsageCategorySubMinor", "OccupancyType", "PropertyType"]);
    var pathname = location.pathname;

    if (!(localStorage.getItem("path") === pathname)) {
      customTitle && addBreadCrumbs({ title: customTitle, path: window.location.pathname });
    }
    renderCustomTitleForPt(customTitle);
  };

  this.getAssessmentListItems = function (props) {
    var propertyItems = props.propertyItems,
        propertyId = props.propertyId,
        history = props.history,
        transformedAssessments = props.transformedAssessments;

    var viewAllAssessmentItem = {
      primaryText: _react2.default.createElement(
        "div",
        {
          onClick: function onClick() {
            history.push("/property-tax/my-properties/property/view-assessments/" + propertyId);
          }
        },
        _react2.default.createElement(_translationNode2.default, { label: "VIEW ALL ASSESSMENTS", fontSize: "16px", color: "#fe7a51", bold: true })
      )
    };
    transformedAssessments.push(viewAllAssessmentItem);
    return [{
      primaryText: _react2.default.createElement(_translationNode2.default, { label: "Property Information", fontSize: "16px", color: "#484848", labelStyle: { fontWeight: 500 } }),
      leftIcon: _react2.default.createElement(
        "div",
        { style: IconStyle },
        _react2.default.createElement(_Icon2.default, { action: "action", name: "info", color: "#484848" })
      ),
      nestedItems: [{
        secondaryText: _react2.default.createElement(_PropertyInformation2.default, { items: propertyItems, propertyTaxAssessmentID: propertyId, history: history })
      }],
      rightIcon: _react2.default.createElement(
        "div",
        { style: IconStyle },
        _react2.default.createElement(_Icon2.default, { action: "hardware", name: "keyboard-arrow-right", color: "#484848" })
      )
    }, {
      primaryText: _react2.default.createElement(_translationNode2.default, { label: "Assessment History", fontSize: "16px", color: "#484848", labelStyle: { fontWeight: 500 } }),
      leftIcon: _react2.default.createElement(
        "div",
        { style: IconStyle },
        _react2.default.createElement(_Icon2.default, { action: "action", name: "receipt", color: "#484848", style: IconStyle })
      ),
      nestedItems: transformedAssessments,
      rightIcon: _react2.default.createElement(
        "div",
        { style: IconStyle },
        _react2.default.createElement(_Icon2.default, { action: "hardware", name: "keyboard-arrow-right", color: "#484848" })
      )
    }];
  };

  this.componentWillReceiveProps = function (nextProps) {
    var _props3 = _this2.props,
        customTitle = _props3.customTitle,
        renderCustomTitleForPt = _props3.renderCustomTitleForPt;

    if (!(0, _isEqual2.default)(customTitle, nextProps.customTitle)) {
      renderCustomTitleForPt(nextProps.customTitle);
    }
  };

  this.closeReceiptDialogue = function () {
    _this2.setState({ dialogueOpen: false });
  };
};

var getAddressInfo = function getAddressInfo(addressObj, extraItems) {
  return [{
    heading: "Property Address",
    iconAction: "action",
    iconName: "home",
    items: [{
      key: " House No:",
      value: addressObj.houseNo || "NA"
    }, {
      key: "Street Name:",
      value: addressObj.street || "NA"
    }, {
      key: "Pincode:",
      value: addressObj.pincode || "NA"
    }, {
      key: "Colony Name:",
      value: addressObj.colonyName || "NA"
    }, {
      key: "Mohalla:",
      value: addressObj.mohalla || "NA"
    }].concat((0, _toConsumableArray3.default)(extraItems))
  }];
};

var transform = function transform(floor, key, generalMDMSDataById) {
  var masterName = key.masterName,
      dataKey = key.dataKey;

  if (!masterName) {
    return floor[dataKey];
  } else {
    if (floor[dataKey] === "NONRESIDENTIAL") {
      return generalMDMSDataById["UsageCategoryMinor"][floor["usageCategoryMinor"]].name;
    } else {
      return generalMDMSDataById[masterName][floor[dataKey]].name;
    }
  }
};

var getAssessmentInfo = function getAssessmentInfo(propertyDetails, keys, generalMDMSDataById) {
  var units = propertyDetails.units;

  return [{
    heading: "Assessment Information",
    iconAction: "action",
    iconName: "assignment",
    showTable: true,
    tableHeaderItems: [{
      key: "Plot Size:",
      value: propertyDetails.uom ? propertyDetails.landArea + " " + propertyDetails.uom : propertyDetails.landArea + " sq yards"
    }, {
      key: "Type of Building:",
      value: generalMDMSDataById && generalMDMSDataById["PropertyType"][propertyDetails.propertyType] ? generalMDMSDataById["PropertyType"][propertyDetails.propertyType].name : "NA"
    }],
    items: {
      header: ["Floor", "Usage Type", "Sub Usage Type", "Occupancy", "Built Area/Total Annual Rent"],
      values: units.map(function (floor) {
        return {
          value: keys.map(function (key) {
            return transform(floor, key, generalMDMSDataById);
          })
        };
      })
    }
  }];
};

var getOwnerInfo = function getOwnerInfo(ownerDetails) {
  return [{
    heading: "Ownership Information",
    iconAction: "social",
    iconName: "person",
    nestedItems: true,
    items: ownerDetails.map(function (owner) {
      return {
        items: [{
          key: "Name",
          value: owner.name || "NA"
        }, {
          key: "Gender:",
          value: owner.gender || "NA"
        }, {
          key: "Mobile No:",
          value: owner.mobileNumber || "NA"
        }, {
          key: "Father's/Husband's Name:",
          value: owner.fatherOrHusbandName || "NA"
        }, {
          key: "User Category:",
          value: owner.ownerType || "NA"
        }, {
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

var getLatestPropertyDetails = function getLatestPropertyDetails(propertyDetailsArray) {
  if (propertyDetailsArray.length > 1) {
    return propertyDetailsArray.reduce(function (acc, curr) {
      return acc.assessmentDate > curr.assessmentDate ? acc : curr;
    });
  } else {
    return propertyDetailsArray[0];
  }
};

var mapStateToProps = function mapStateToProps(state, ownProps) {
  var urls = state.app.urls;

  var _ref = state.common || {},
      generalMDMSDataById = _ref.generalMDMSDataById;

  var _ref2 = state.properties || {},
      propertiesById = _ref2.propertiesById;

  var propertyId = ownProps.match.params.propertyId;
  var selPropertyDetails = propertiesById[propertyId];
  var latestPropertyDetails = getLatestPropertyDetails(selPropertyDetails.propertyDetails);
  var addressInfo = getAddressInfo(selPropertyDetails.address, [{ key: "Property ID:", value: selPropertyDetails.propertyId }]);
  var assessmentInfoKeys = [{ masterName: "Floor", dataKey: "floorNo" }, { masterName: "UsageCategoryMajor", dataKey: "usageCategoryMajor" }, { masterName: "UsageCategorySubMinor", dataKey: "usageCategorySubMinor" }, { masterName: "OccupancyType", dataKey: "occupancyType" }, { masterName: "", dataKey: "unitArea" }];
  var assessmentInfo = generalMDMSDataById ? getAssessmentInfo(latestPropertyDetails, assessmentInfoKeys, generalMDMSDataById) : [];
  var ownerInfo = getOwnerInfo(latestPropertyDetails.owners);
  var propertyItems = [].concat((0, _toConsumableArray3.default)(addressInfo), (0, _toConsumableArray3.default)(assessmentInfo), (0, _toConsumableArray3.default)(ownerInfo));
  var customTitle = (0, _commons.getCommaSeperatedAddress)(selPropertyDetails.address.buildingName, selPropertyDetails.address.street);

  var propertyDetails = selPropertyDetails.propertyDetails;

  var transformedAssessments = Object.values(propertyDetails).map(function (assessment, index) {
    return {
      primaryText: _react2.default.createElement(_translationNode2.default, { label: assessment.financialYear, fontSize: "16px", color: "#484848", containerStyle: { padding: "10px 0" } }),
      status: "ASSESS & PAY",
      receipt: true,
      assessmentNo: assessment.assessmentNumber
    };
  });
  return { urls: urls, propertyItems: propertyItems, propertyId: propertyId, customTitle: customTitle, transformedAssessments: transformedAssessments };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    addBreadCrumbs: function addBreadCrumbs(url) {
      return dispatch((0, _actions.addBreadCrumbs)(url));
    },
    fetchGeneralMDMSData: function fetchGeneralMDMSData(requestBody, moduleName, masterName) {
      return dispatch((0, _actions2.fetchGeneralMDMSData)(requestBody, moduleName, masterName));
    }
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(Property);