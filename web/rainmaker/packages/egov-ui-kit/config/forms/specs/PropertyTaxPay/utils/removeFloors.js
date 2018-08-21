"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.removeFormKey = undefined;

var _actions = require("egov-ui-kit/redux/form/actions");

var _actions2 = require("egov-ui-kit/redux/common/actions");

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var removeFormKey = exports.removeFormKey = function removeFormKey(formKey, field, dispatch, state) {
  var form = state.form;

  var floorCards = form && Object.keys(form).filter(function (key, index) {
    if (key.includes("customSelect") || key.includes("floorDetails")) {
      return key;
    }
  });
  var updateFloorCount = function updateFloorCount() {
    dispatch((0, _actions.setFieldProperty)("plotDetails", "subUsageType", "value", null));
    dispatch((0, _actions.setFieldProperty)("plotDetails", "occupancy", "value", null));
    dispatch((0, _actions.setFieldProperty)("plotDetails", "annualRent", "hideField", true));
    var updateFloorValue = function updateFloorValue() {
      dispatch((0, _actions.setFieldProperty)("plotDetails", "floorCount", "value", 1));
      dispatch((0, _actions2.prepareFormData)("Properties[0].propertyDetails[0].noOfFloors", 2));
    };
    if (field.id === "typeOfBuilding" && (0, _get2.default)(state, "common.prepareFormData.Properties[0].propertyDetails[0].usageCategoryMajor") !== "RESIDENTIAL") {
      updateFloorValue();
    } else if (field.id === "typeOfUsage" && (0, _get2.default)(state, "common.prepareFormData.Properties[0].propertyDetails[0].usageCategoryMajor") !== "RESIDENTIAL") {
      updateFloorValue();
    }
  };

  if (field.id === "typeOfBuilding" && field.value === "SHAREDPROPERTY") {
    updateFloorCount();
  } else if (field.id === "typeOfUsage" && (0, _get2.default)(state, "common.prepareFormData.Properties[0].propertyDetails[0].propertySubType") === "SHAREDPROPERTY") {
    updateFloorCount();
  }

  if (floorCards.length > 0) {
    if (window.confirm("Are you sure you want delete the floors entered?")) {
      if (formKey === "basicInformation") {
        dispatch((0, _actions.setFieldProperty)("plotDetails", "floorCount", "value", 0));
      }

      floorCards.forEach(function (floorFormKey, key) {
        floorFormKey && dispatch((0, _actions.removeForm)(floorFormKey));
      });
    }
  }
};