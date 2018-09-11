"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.convertUnitsToSqFt = exports.transformPropertyDataToAssessInfo = exports.getEstimateFromBill = exports.getFinancialYearFromQuery = exports.getOwnerCategoryByYear = exports.sortDropdown = exports.findCorrectDateObj = exports.getQueryValue = exports.getLatestPropertyDetails = exports.resetFormWizard = undefined;

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

var _set = require("lodash/set");

var _set2 = _interopRequireDefault(_set);

var _cloneDeep = require("lodash/cloneDeep");

var _cloneDeep2 = _interopRequireDefault(_cloneDeep);

var _queryString = require("query-string");

var _queryString2 = _interopRequireDefault(_queryString);

var _assessInfoFormManager = require("egov-ui-kit/config/forms/specs/PropertyTaxPay/utils/assessInfoFormManager");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var resetFormWizard = exports.resetFormWizard = function resetFormWizard(form, removeForm) {
  var formKeys = form && Object.keys(form);
  var formToReset = ["basicInformation", "propertyAddress", "plotDetails", "ownershipType", "institutionAuthority", "institutionDetails", "cashInfo", "paymentModes", "receiptInfo", "additionalRebate"];
  formKeys.forEach(function (formKey) {
    if (formToReset.includes(formKey) || formKey.startsWith("ownerInfo") || formKey.startsWith("customSelect_") || formKey.startsWith("floorDetails_")) {
      removeForm(formKey);
    }
  });
};

var getLatestPropertyDetails = exports.getLatestPropertyDetails = function getLatestPropertyDetails(propertyDetailsArray) {
  if (propertyDetailsArray) {
    if (propertyDetailsArray.length > 1) {
      return propertyDetailsArray.reduce(function (acc, curr) {
        return acc.assessmentDate > curr.assessmentDate ? acc : curr;
      });
    } else {
      return propertyDetailsArray[0];
    }
  } else {
    return;
  }
};

var getQueryValue = exports.getQueryValue = function getQueryValue(query, key) {
  return (0, _get2.default)(_queryString2.default.parse(query), key, undefined);
};

var findCorrectDateObj = exports.findCorrectDateObj = function findCorrectDateObj(financialYear, category) {
  category.sort(function (a, b) {
    var yearOne = a.fromFY && a.fromFY.slice(0, 4);
    var yearTwo = b.fromFY && b.fromFY.slice(0, 4);
    if (yearOne < yearTwo) {
      return 1;
    } else return -1;
  });
  var assessYear = financialYear && financialYear.slice(0, 4);
  var chosenDateObj = {};
  var categoryYear = category.reduce(function (categoryYear, item) {
    var year = item.fromFY && item.fromFY.slice(0, 4);
    categoryYear.push(year);
    return categoryYear;
  }, []);
  var index = categoryYear.indexOf(assessYear);
  if (index > -1) {
    chosenDateObj = category[index];
  } else {
    for (var i = 0; i < categoryYear.length; i++) {
      if (assessYear > categoryYear[i]) {
        chosenDateObj = category[i];
        break;
      }
    }
  }
  var month = null;
  if (chosenDateObj.startingDay) {
    month = getMonth(chosenDateObj.startingDay);
    if (month === 1 || month === 2 || month === 3) {
      chosenDateObj.startingDay = chosenDateObj.startingDay + ("/" + ++assessYear);
    } else {
      chosenDateObj.startingDay = chosenDateObj.startingDay + ("/" + assessYear);
    }
  } else if (chosenDateObj.endingDay) {
    month = getMonth(chosenDateObj.endingDay);
    if (month === 1 || month === 2 || month === 3) {
      chosenDateObj.endingDay = chosenDateObj.endingDay + ("/" + ++assessYear);
    } else {
      chosenDateObj.endingDay = chosenDateObj.endingDay + ("/" + assessYear);
    }
  }
  return chosenDateObj;
};

var getMonth = function getMonth(date) {
  return parseInt(date.split("/")[1]);
};

var sortDropdown = exports.sortDropdown = function sortDropdown(data, sortBy, isAscending) {
  var sortedData = data.slice().sort(function (a, b) {
    var textA = a[sortBy].toUpperCase();
    var textB = b[sortBy].toUpperCase();
    return isAscending ? textA < textB ? -1 : textA > textB ? 1 : 0 : textA < textB ? 1 : textA > textB ? -1 : 0;
  });
  return sortedData;
};

var getOwnerCategoryByYear = exports.getOwnerCategoryByYear = function getOwnerCategoryByYear(data, financialYear) {
  data.sort(function (a, b) {
    var yearOne = a.fromFY && a.fromFY.slice(0, 4);
    var yearTwo = b.fromFY && b.fromFY.slice(0, 4);
    if (yearOne < yearTwo) {
      return -1;
    } else return 1;
  });

  var fY = financialYear.slice(0, 4);
  var OwnerCatArray = data.reduce(function (OwnerCatArray, item) {
    var year = item.fromFY && item.fromFY.slice(0, 4);
    if (year <= fY) {
      OwnerCatArray.push({ label: item.name, value: item.code });
    }
    return OwnerCatArray;
  }, []);
  return OwnerCatArray;
};

var getFinancialYearFromQuery = exports.getFinancialYearFromQuery = function getFinancialYearFromQuery() {
  var financialYearFromQuery = window.location.search.split("FY=")[1];
  if (financialYearFromQuery) {
    return financialYearFromQuery.split("&")[0];
  }
  return null;
};

var getEstimateFromBill = exports.getEstimateFromBill = function getEstimateFromBill(bill) {
  var _ref = bill && bill[0],
      billDetails = _ref.billDetails,
      tenantId = _ref.tenantId;

  var _ref2 = billDetails && billDetails[0],
      collectedAmount = _ref2.collectedAmount,
      totalAmount = _ref2.totalAmount,
      billAccountDetails = _ref2.billAccountDetails;

  var estimate = { totalAmount: 0 };
  estimate.totalAmount = totalAmount;
  estimate.tenantId = tenantId;
  estimate.collectedAmount = collectedAmount;
  var taxHeadEstimates = billAccountDetails.reduce(function (taxHeadEstimates, item) {
    taxHeadEstimates.push({
      taxHeadCode: item.accountDescription.split("-")[0],
      estimateAmount: item.crAmountToBePaid,
      category: item.purpose
    });
    return taxHeadEstimates;
  }, []);
  collectedAmount > 0 && taxHeadEstimates.push({
    taxHeadCode: "PT_ADVANCE_CARRYFORWARD",
    estimateAmount: collectedAmount,
    category: "EXEMPTION"
  });
  estimate.taxHeadEstimates = taxHeadEstimates;
  return [(0, _extends3.default)({}, estimate)];
};

var transformPropertyDataToAssessInfo = exports.transformPropertyDataToAssessInfo = function transformPropertyDataToAssessInfo(data) {
  var propertyType = data["Properties"][0]["propertyDetails"][0]["propertyType"];
  var propertySubType = data["Properties"][0]["propertyDetails"][0]["propertySubType"];
  var usageCategoryMajor = data["Properties"][0]["propertyDetails"][0]["usageCategoryMajor"];
  var usageCategoryMinor = data["Properties"][0]["propertyDetails"][0]["usageCategoryMinor"];
  var propType = propertySubType === null ? propertyType : propertySubType;
  var propUsageType = usageCategoryMinor == null ? usageCategoryMajor : usageCategoryMinor;
  console.log(propType, propUsageType);
  var formConfigPath = (0, _assessInfoFormManager.getPlotAndFloorFormConfigPath)(propUsageType, propType);
  console.log(formConfigPath);
  var path = formConfigPath["path"];
  console.log(path);
  var dictFloor = {};
  var dictCustomSelect = {};

  var customSelectconfig = require("egov-ui-kit/config/forms/specs/PropertyTaxPay/customSelect.js").default;
  var basicInfoConfig = require("egov-ui-kit/config/forms/specs/PropertyTaxPay/basicInformation.js").default;
  var configPlot = null,
      configFloor = null;

  basicInfoConfig = (0, _cloneDeep2.default)(basicInfoConfig);
  (0, _set2.default)(basicInfoConfig, "fields.typeOfUsage.value", propUsageType);
  (0, _set2.default)(basicInfoConfig, "fields.typeOfBuilding.value", propType);

  // console.log(customSelectconfig, basicInfoConfig);
  if (formConfigPath["hasPlot"]) {
    configPlot = require("egov-ui-kit/config/forms/specs/" + path + "/plotDetails.js").default;
    configPlot = (0, _cloneDeep2.default)(configPlot);
    Object.keys(configPlot["fields"]).map(function (item) {
      var jsonPath = configPlot["fields"][item]["jsonPath"];
      // let value = get(data, jsonPath);
      if (item === "plotSize" && (propType === "VACANT" || propType === "INDEPENDENTPROPERTY")) {
        var jP = jsonPath.split(".");
        jP.pop();
        jsonPath = jP.join(".") + ".landArea";
        var value = (0, _get2.default)(data, jsonPath);
        configPlot["fields"][item]["value"] = value;
      } else {
        var _value = (0, _get2.default)(data, jsonPath);
        configPlot["fields"][item]["value"] = _value;
      }
    });
  }
  console.log(configPlot);

  if (formConfigPath["hasFloor"]) {
    configFloor = require("egov-ui-kit/config/forms/specs/" + path + "/floorDetails.js").default;
    var units = data["Properties"][0]["propertyDetails"][0]["units"];

    for (var unitIndex = 0; unitIndex < units.length; unitIndex++) {
      var floorNo = units[unitIndex]["floorNo"];
      var formKey = "floorDetails_" + floorNo + "_unit_" + unitIndex;
      configFloor = (0, _cloneDeep2.default)(configFloor);
      Object.keys(configFloor["fields"]).map(function (item) {
        var jsonPath = configFloor["fields"][item]["jsonPath"];
        jsonPath = jsonPath.replace(/units\[[0-9]\]/g, "units[" + unitIndex + "]");
        var valueInJSON = (0, _get2.default)(data, jsonPath);
        configFloor["fields"][item].value = valueInJSON;
      });
      dictFloor[formKey] = configFloor;
      if (!("customSelect_" + floorNo in dictCustomSelect)) {
        customSelectconfig = (0, _cloneDeep2.default)(customSelectconfig);
        customSelectconfig["fields"]["floorName"]["value"] = floorNo;
        dictCustomSelect["customSelect_" + floorNo] = customSelectconfig;
      }
    }
  }

  // Object.keys(basicInfoConfig["fields"]).map((item) => {
  //   var jsonPath = basicInfoConfig["fields"][item]["jsonPath"];
  //   var valueInJSON = get(data, jsonPath);
  //   basicInfoConfig["fields"][item].value = valueInJSON;
  //   console.log(jsonPath, valueInJSON, basicInfoConfig["fields"][item].value);
  // });
  // console.log(basicInfoConfig);
  console.log((0, _extends3.default)({ basicInformation: basicInfoConfig, plotDetails: configPlot }, dictFloor, dictCustomSelect));
  return (0, _extends3.default)({ basicInformation: basicInfoConfig, plotDetails: configPlot }, dictFloor, dictCustomSelect);
};

var convertUnitsToSqFt = exports.convertUnitsToSqFt = function convertUnitsToSqFt(unitArray) {
  return unitArray.map(function (unit) {
    var value = unit.unitArea;
    value = value * 9.0;
    value = Math.round(value * 100) / 100;
    unit.unitArea = value;
    return unit;
  });
};