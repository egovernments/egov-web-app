"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateInstituteType = exports.getOwnerDetails = undefined;

var _get2 = require("lodash/get");

var _get3 = _interopRequireDefault(_get2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var subCategoriesInOwnersType = ["INDIVIDUAL"];

var formDropdown = function formDropdown(category) {
  var name = category.name,
      code = category.code;

  return {
    label: name,
    value: code
  };
};

var getOwnerDetails = exports.getOwnerDetails = function getOwnerDetails(state) {
  var _JSON$parse = JSON.parse(JSON.stringify(state.common.generalMDMSDataById)),
      OwnerShipCategory = _JSON$parse.OwnerShipCategory,
      SubOwnerShipCategory = _JSON$parse.SubOwnerShipCategory;

  var ownerShipdropDown = [];
  Object.keys(OwnerShipCategory).forEach(function (category) {
    var categoryCode = OwnerShipCategory[category].code;
    if (subCategoriesInOwnersType.indexOf(categoryCode) !== -1) {
      Object.keys(SubOwnerShipCategory).filter(function (subCategory) {
        return categoryCode === SubOwnerShipCategory[subCategory].ownerShipCategory;
      }).forEach(function (linkedCategory) {
        ownerShipdropDown.push(formDropdown(SubOwnerShipCategory[linkedCategory]));
      });
    } else {
      ownerShipdropDown.push(formDropdown(OwnerShipCategory[category]));
    }
  });
  return ownerShipdropDown;
};

var updateInstituteType = exports.updateInstituteType = function updateInstituteType(state, value) {
  var _get = (0, _get3.default)(state, "common.generalMDMSDataById", {}),
      SubOwnerShipCategory = _get.SubOwnerShipCategory;

  var institutedropDown = [];
  Object.keys(SubOwnerShipCategory).filter(function (subCategory) {
    return SubOwnerShipCategory[subCategory].ownerShipCategory === value;
  }).forEach(function (linkedCategory) {
    institutedropDown.push(formDropdown(SubOwnerShipCategory[linkedCategory]));
  });
  return institutedropDown;
};