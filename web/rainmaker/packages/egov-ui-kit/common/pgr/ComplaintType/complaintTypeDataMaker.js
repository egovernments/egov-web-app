"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getNestedObjFormat = undefined;

var _typeof2 = require("babel-runtime/helpers/typeof");

var _typeof3 = _interopRequireDefault(_typeof2);

var _set = require("lodash/set");

var _set2 = _interopRequireDefault(_set);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getNestedObjFormat = exports.getNestedObjFormat = function getNestedObjFormat(categories) {
  var categoryList = {};
  Object.values(categories).map(function (item) {
    (0, _set2.default)(categoryList, item.menuPath && item.menuPath.trim().length ? item.menuPath + "." + item.serviceCode : item.serviceCode, item);
  });
  return transform(categoryList);
};

var transform = function transform(input) {
  return Object.keys(input).reduce(function (result, itemKey) {
    var item = Object.assign({}, input[itemKey]);
    var nestedItemKeys = Object.keys(item).filter(function (childItemKey) {
      return item[childItemKey] && (0, _typeof3.default)(item[childItemKey]) === "object";
    });
    var nestedItems = nestedItemKeys.map(function (key) {
      return completeDetails(item[key], key);
    });
    nestedItemKeys.forEach(function (key) {
      return delete item[key];
    });
    item.nestedItems = transform(nestedItems, []);
    result.push(completeDetails(item, itemKey));
    return result;
  }, []);
};

// currently icon hardcoded to accumulation of litter but it should be dynamically formed
var completeDetails = function completeDetails(item, key) {
  return Object.assign({}, item, {
    id: item.text || key,
    text: item.text || key,
    displayKey: item.text && "SERVICEDEFS." + item.id.toUpperCase() || "SERVICEDEFS." + key.toUpperCase(),
    icon: item.menuPath && item.menuPath.toLowerCase() || key.toLowerCase().replace(/\\s+/, "-")
  });
};