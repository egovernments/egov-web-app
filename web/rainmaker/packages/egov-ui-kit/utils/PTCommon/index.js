"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getOwnerCategoryByYear = exports.sortDropdown = exports.findCorrectDateObj = exports.getQueryValue = exports.getLatestPropertyDetails = exports.resetFormWizard = undefined;

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

var _queryString = require("query-string");

var _queryString2 = _interopRequireDefault(_queryString);

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
  console.log(data, financialYear);
  data.sort(function (a, b) {
    var yearOne = a.fromFY && a.fromFY.slice(0, 4);
    var yearTwo = b.fromFY && b.fromFY.slice(0, 4);
    if (yearOne < yearTwo) {
      return -1;
    } else return 1;
  });

  var fY = financialYear.slice(0, 4);
  console.log(data, fY);
  var OwnerCatArray = data.reduce(function (OwnerCatArray, item) {
    var year = item.fromFY && item.fromFY.slice(0, 4);
    if (year <= fY) {
      OwnerCatArray.push({ label: item.name, value: item.code });
    }
    return OwnerCatArray;
  }, []);
  console.log(OwnerCatArray);
  return OwnerCatArray;
};