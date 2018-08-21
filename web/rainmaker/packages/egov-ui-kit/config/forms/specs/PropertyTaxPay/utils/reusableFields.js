"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mergeMaster = exports.getAbsentMasterObj = exports.getPresentMasterObj = exports.prepareDropDownData = exports.beforeInitFormForPlot = exports.beforeInitForm = exports.measuringUnit = exports.annualRent = exports.superArea = exports.builtArea = exports.occupancy = exports.subUsageType = exports.floorCount = exports.plotSize = undefined;

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _endPoints = require("egov-ui-kit/utils/endPoints");

var _enableDependentFields = require("./enableDependentFields");

var _removeFloors = require("./removeFloors");

var _actions = require("egov-ui-kit/redux/form/actions");

var _actions2 = require("egov-ui-kit/redux/common/actions");

var _set = require("lodash/set");

var _set2 = _interopRequireDefault(_set);

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

var _isEmpty = require("lodash/isEmpty");

var _isEmpty2 = _interopRequireDefault(_isEmpty);

var _filter = require("lodash/filter");

var _filter2 = _interopRequireDefault(_filter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var floorDropDownData = [];

for (var i = 1; i <= 25; i++) {
  floorDropDownData.push({ label: i, value: i });
}

var plotSize = exports.plotSize = {
  plotSize: {
    id: "assessment-plot-size",
    jsonPath: "Properties[0].propertyDetails[0].buildUpArea",
    type: "number",
    floatingLabelText: "PT_FORM2_PLOT_SIZE",
    hintText: "PT_FORM2_PLOT_SIZE_PLACEHOLDER",
    errorMessage: "Enter a valid Plot Size",
    required: true,
    fullWidth: true,
    pattern: /^([1-9]\d{0,7})(\.\d+)?$/,
    numcols: 6,
    updateDependentFields: function updateDependentFields(_ref) {
      var formKey = _ref.formKey,
          field = _ref.field,
          dispatch = _ref.dispatch,
          state = _ref.state;

      var propertyType = (0, _get2.default)(state, "common.prepareFormData.Properties[0].propertyDetails[0].propertyType");
      var propertySubType = (0, _get2.default)(state, "common.prepareFormData.Properties[0].propertyDetails[0].propertySubType");
      if (propertyType === "VACANT" || propertySubType === "INDEPENDENTPROPERTY") {
        dispatch((0, _actions2.prepareFormData)("Properties[0].propertyDetails[0].landArea", field.value));
        dispatch((0, _actions2.prepareFormData)("Properties[0].propertyDetails[0].buildUpArea", null));
      }
    }
  }
};

var floorCount = exports.floorCount = {
  floorCount: {
    id: "assessment-number-of-floors",
    jsonPath: "Properties[0].propertyDetails[0].noOfFloors",
    type: "singleValueList",
    floatingLabelText: "PT_FORM2_NUMBER_OF_FLOORS",
    hintText: "PT_COMMONS_SELECT_PLACEHOLDER",
    toolTip: true,
    fullWidth: true,
    toolTipMessage: "PT_NUMBER_OF_FLOORS_TOOLTIP_MESSAGE",
    required: true,
    numcols: 6,
    dropDownData: floorDropDownData,
    updateDependentFields: function updateDependentFields(_ref2) {
      var formKey = _ref2.formKey,
          field = _ref2.field,
          dispatch = _ref2.dispatch,
          state = _ref2.state;

      var previousFloorNo = localStorage.getItem("previousFloorNo") || -1;
      localStorage.setItem("previousFloorNo", field.value);
      if (previousFloorNo > field.value) {
        for (var i = field.value; i < previousFloorNo; i++) {
          if (state.form.hasOwnProperty("customSelect_" + i)) {
            dispatch((0, _actions.removeForm)("customSelect_" + i));
          }
          for (var variable in state.form) {
            if (state.form.hasOwnProperty(variable) && variable.startsWith("floorDetails_" + i)) {
              dispatch((0, _actions.removeForm)(variable));
            }
          }
        }
      }
    }
  }
};

var subUsageType = exports.subUsageType = {
  subUsageType: {
    id: "assessment-subUsageType",
    jsonPath: "Properties[0].propertyDetails[0].units[0].usageCategoryDetail",
    type: "singleValueList",
    floatingLabelText: "PT_FORM2_SUB_USAGE_TYPE",
    hintText: "PT_COMMONS_SELECT_PLACEHOLDER",
    errorStyle: { position: "absolute", bottom: -8, zIndex: 5 },
    dropDownData: [],
    required: true,
    numcols: 4,
    updateDependentFields: function updateDependentFields(_ref3) {
      var formKey = _ref3.formKey,
          field = _ref3.field,
          dispatch = _ref3.dispatch,
          state = _ref3.state;

      var subUsageMinor = (0, _get2.default)(state, "common.generalMDMSDataById.UsageCategoryDetail[" + field.value + "]");
      if (!(0, _isEmpty2.default)(subUsageMinor)) {
        dispatch((0, _actions2.prepareFormData)(field.jsonPath.split("usageCategoryDetail")[0] + "usageCategorySubMinor", subUsageMinor.usageCategorySubMinor));
      } else {
        dispatch((0, _actions2.prepareFormData)(field.jsonPath.split("usageCategoryDetail")[0] + "usageCategorySubMinor", field.value));
        dispatch((0, _actions2.prepareFormData)("Properties[0].propertyDetails[0].usageCategoryDetail", null));
      }
    }
  }
};

var occupancy = exports.occupancy = {
  occupancy: {
    id: "assessment-occupancy",
    jsonPath: "Properties[0].propertyDetails[0].units[0].occupancyType",
    type: "singleValueList",
    floatingLabelText: "PT_FORM2_OCCUPANCY",
    hintText: "PT_COMMONS_SELECT_PLACEHOLDER",
    required: true,
    numcols: 4,
    dropDownData: [],
    updateDependentFields: function updateDependentFields(_ref4) {
      var formKey = _ref4.formKey,
          sourceField = _ref4.field,
          dispatch = _ref4.dispatch;
      var value = sourceField.value;

      var dependentFields1 = ["annualRent"];
      switch (value) {
        case "RENTED":
          (0, _enableDependentFields.setDependentFields)(dependentFields1, dispatch, formKey, false);
          break;
        default:
          (0, _enableDependentFields.setDependentFields)(dependentFields1, dispatch, formKey, true);
          break;
      }
    }
  }
};

var builtArea = exports.builtArea = {
  builtArea: {
    id: "assessment-built-area",
    jsonPath: "Properties[0].propertyDetails[0].units[0].unitArea",
    type: "number",
    floatingLabelText: "PT_FORM2_BUILT_AREA",
    hintText: "PT_FORM2_BUILT_UP_AREA_PLACEHOLDER",
    errorMessage: "Enter a valid built area size",
    toolTip: true,
    toolTipMessage: "PT_BUILT_UP_AREA_TOOLTIP_MESSAGE",
    required: true,
    hideField: false,
    numcols: 4,
    pattern: /^([1-9]\d{0,7})(\.\d+)?$/
  }
};

var superArea = exports.superArea = {
  superArea: {
    id: "assessment-super-area",
    jsonPath: "Properties[0].propertyDetails[0].buildUpArea",
    type: "number",
    floatingLabelText: "PT_FORM2_TOTAL_BUILT_AREA",
    hintText: "PT_FORM2_TOTAL_BUILT_AREA_PLACEHOLDER",
    ErrorText: "Enter a valid super area size",
    errorStyle: { position: "absolute", bottom: -8, zIndex: 5 },
    toolTip: true,
    toolTipMessage: "Total Carpet Area + Total balcony area + Total thickness of outer walls + Total common area (lift, stairs, lobby etc.)",
    required: true,
    numcols: 4,
    hideField: false,
    updateDependentFields: function updateDependentFields(_ref5) {
      var formKey = _ref5.formKey,
          field = _ref5.field,
          dispatch = _ref5.dispatch,
          state = _ref5.state;

      dispatch((0, _actions2.prepareFormData)("Properties[0].propertyDetails[0].units[0].unitArea", field.value));
    },
    pattern: /^([1-9]\d{0,7})(\.\d+)?$/,
    errorMessage: "Enter a valid super area size"
  }
};

var annualRent = exports.annualRent = {
  annualRent: {
    id: "assessment-annual-rent",
    jsonPath: "Properties[0].propertyDetails[0].units[0].arv",
    type: "number",
    floatingLabelText: "PT_FORM2_TOTAL_ANNUAL_RENT",
    hintText: "PT_FORM2_TOTAL_ANNUAL_RENT_PLACEHOLDER",
    ErrorText: "Enter a valid amount",
    errorStyle: { position: "absolute", bottom: -8, zIndex: 5 },
    toolTip: true,
    toolTipMessage: "PT_TOTAL_ANNUAL_RENT_TOOLTIP_MESSAGE",
    required: true,
    pattern: /^([1-9]\d{0,7})(\.\d+)?$/,
    hideField: true,
    numcols: 4,
    errorMessage: "Enter a valid amount"
  }
};

var measuringUnit = exports.measuringUnit = {};

var beforeInitForm = exports.beforeInitForm = {
  beforeInitForm: function beforeInitForm(action, store) {
    var state = store.getState();
    var dispatch = store.dispatch;
    var form = action.form;
    var formKey = form.name,
        fields = form.fields;

    //For adding multiple units to prepareFormData

    if (formKey.startsWith("floorDetails_")) {
      var arr = formKey.split("_");
      var floorIndex = parseInt(arr[1]);
      var unitIndex = parseInt(arr[3]);
      var property = (0, _get2.default)(state, "common.prepareFormData.Properties[0].propertyDetails[0]");
      var unitsCount = null;
      if (state.form[formKey]) {
        unitsCount = state.form[formKey].unitsIndex;
      } else {
        unitsCount = property && property.units && property.units.length;
        form.unitsIndex = unitsCount;
      }
      if (floorIndex === 0 && unitIndex === 0) {
        form.unitsIndex = 0;
        dispatch((0, _actions2.prepareFormData)("Properties[0].propertyDetails[0].units[0].floorNo", "0"));
      } else {
        var updatedFields = Object.keys(fields).reduce(function (updatedFields, fieldKey) {
          var jsonPath = fields[fieldKey].jsonPath;
          updatedFields[fieldKey] = (0, _extends3.default)({}, fields[fieldKey], { unitsIndex: unitsCount });
          if (jsonPath.indexOf("units[") > -1) {
            var first = jsonPath.split("units[")[0];
            var last = jsonPath.split("units[")[1].split("]")[1];
            updatedFields[fieldKey].jsonPath = first + "units[" + unitsCount + "]" + last;
          }
          return updatedFields;
        }, {});
        (0, _set2.default)(action, "form.fields", (0, _extends3.default)({}, updatedFields));

        !state.form[formKey] && dispatch((0, _actions2.prepareFormData)("Properties[0].propertyDetails[0].units[" + unitsCount + "].floorNo", "" + floorIndex));
      }
    }

    var occupancy = (0, _get2.default)(state, "common.generalMDMSDataById.OccupancyType");
    var usageCategoryMinor = (0, _get2.default)(state, "common.prepareFormData.Properties[0].propertyDetails[0].usageCategoryMinor");
    var usageCategoryMajor = (0, _get2.default)(state, "common.prepareFormData.Properties[0].propertyDetails[0].usageCategoryMajor");
    (0, _set2.default)(action, "form.fields.subUsageType.hideField", false);
    //For adding multiple units to prepareFormData

    var unitFormUpdate = function unitFormUpdate(usageCategoryMinor) {
      var skipMajorUpdate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

      var filteredSubUsageMinor = (0, _filter2.default)(prepareDropDownData((0, _get2.default)(state, "common.generalMDMSDataById.UsageCategorySubMinor"), true), function (subUsageMinor) {
        return subUsageMinor.usageCategoryMinor === (0, _get2.default)(state, usageCategoryMinor);
      });
      if (filteredSubUsageMinor.length > 0) {
        var filteredUsageCategoryDetails = getPresentMasterObj(prepareDropDownData((0, _get2.default)(state, "common.generalMDMSDataById.UsageCategoryDetail"), true), filteredSubUsageMinor, "usageCategorySubMinor");
        (0, _set2.default)(action, "form.fields.subUsageType.dropDownData", mergeMaster(filteredSubUsageMinor, filteredUsageCategoryDetails, "usageCategorySubMinor"));
        if ((0, _get2.default)(action, "form.fields.subUsageType.jsonPath") && skipMajorUpdate) {
          dispatch((0, _actions2.prepareFormData)(action.form.fields.subUsageType.jsonPath.split("usageCategoryDetail")[0] + "usageCategoryMinor", (0, _get2.default)(state, "common.prepareFormData.Properties[0].propertyDetails[0].usageCategoryMinor")));
        }
        (0, _set2.default)(action, "form.fields.subUsageType.hideField", false);
      } else {
        (0, _set2.default)(action, "form.fields.subUsageType.hideField", true);
      }
    };

    if (usageCategoryMinor && usageCategoryMajor !== "MIXED") {
      unitFormUpdate("common.prepareFormData.Properties[0].propertyDetails[0].usageCategoryMinor");
    } else {
      if (usageCategoryMajor === "MIXED") {
        var masterOne = (0, _get2.default)(state, "common.generalMDMSDataById.UsageCategoryMajor");
        var masterTwo = (0, _get2.default)(state, "common.generalMDMSDataById.UsageCategoryMinor");
        var usageTypes = mergeMaster(masterOne, masterTwo, "usageCategoryMajor");
        var filterArrayWithoutMixed = (0, _filter2.default)(usageTypes, function (item) {
          return item.value !== "MIXED";
        });
        (0, _set2.default)(action, "form.fields.usageType.disabled", false);
        (0, _set2.default)(action, "form.fields.usageType.dropDownData", filterArrayWithoutMixed);
        unitFormUpdate("common.prepareFormData." + action.form.fields.subUsageType.jsonPath.split("usageCategoryDetail")[0] + "usageCategoryMinor", false);
      } else {
        (0, _set2.default)(action, "form.fields.subUsageType.hideField", true);
      }
    }
    (0, _set2.default)(action, "form.fields.occupancy.dropDownData", prepareDropDownData(occupancy));
    if ((0, _get2.default)(action, "form.fields.subUsageType.jsonPath")) {
      dispatch((0, _actions2.prepareFormData)(action.form.fields.subUsageType.jsonPath.split("usageCategoryDetail")[0] + "usageCategoryMajor", (0, _get2.default)(state, "common.prepareFormData.Properties[0].propertyDetails[0].usageCategoryMajor")));
    }
    if ((0, _get2.default)(state, "common.prepareFormData." + (0, _get2.default)(action, "form.fields.occupancy.jsonPath")) === 'RENTED') {
      (0, _set2.default)(action, "form.fields.annualRent.hideField", false);
    } else {
      (0, _set2.default)(action, "form.fields.annualRent.hideField", true);
    }
    return action;
  }
};

var beforeInitFormForPlot = exports.beforeInitFormForPlot = {
  beforeInitForm: function beforeInitForm(action, store) {
    var state = store.getState();
    var dispatch = store.dispatch;

    var propertyType = (0, _get2.default)(state, "form.basicInformation.fields.typeOfBuilding.value");
    if (propertyType != "VACANT") {
      var occupancy = (0, _get2.default)(state, "common.generalMDMSDataById.OccupancyType");
      var usageCategoryMinor = (0, _get2.default)(state, "common.prepareFormData.Properties[0].propertyDetails[0].usageCategoryMinor");
      var usageCategoryMajor = (0, _get2.default)(state, "common.prepareFormData.Properties[0].propertyDetails[0].usageCategoryMajor");
      (0, _set2.default)(action, "form.fields.subUsageType.hideField", false);

      if (usageCategoryMinor && usageCategoryMajor !== "MIXED") {
        var filteredSubUsageMinor = (0, _filter2.default)(prepareDropDownData((0, _get2.default)(state, "common.generalMDMSDataById.UsageCategorySubMinor"), true), function (subUsageMinor) {
          return subUsageMinor.usageCategoryMinor === (0, _get2.default)(state, "common.prepareFormData.Properties[0].propertyDetails[0].usageCategoryMinor");
        });
        if (filteredSubUsageMinor.length > 0) {
          var filteredUsageCategoryDetails = getPresentMasterObj(prepareDropDownData((0, _get2.default)(state, "common.generalMDMSDataById.UsageCategoryDetail"), true), filteredSubUsageMinor, "usageCategorySubMinor");
          (0, _set2.default)(action, "form.fields.subUsageType.dropDownData", mergeMaster(filteredSubUsageMinor, filteredUsageCategoryDetails, "usageCategorySubMinor"));
          // set(
          //   action,
          //   "form.fields.subUsageType.value",
          //   null)
          // );
          if ((0, _get2.default)(action, "form.fields.subUsageType.jsonPath")) {
            dispatch((0, _actions2.prepareFormData)(action.form.fields.subUsageType.jsonPath.split("usageCategoryDetail")[0] + "usageCategoryMinor", (0, _get2.default)(state, "common.prepareFormData.Properties[0].propertyDetails[0].usageCategoryMinor")));
          }
        } else {
          (0, _set2.default)(action, "form.fields.subUsageType.hideField", true);
        }
      } else {
        if (usageCategoryMajor === "MIXED") {
          var masterOne = (0, _get2.default)(state, "common.generalMDMSDataById.UsageCategoryMajor");
          var masterTwo = (0, _get2.default)(state, "common.generalMDMSDataById.UsageCategoryMinor");
          var usageTypes = mergeMaster(masterOne, masterTwo, "usageCategoryMajor");
          var filterArrayWithoutMixed = (0, _filter2.default)(usageTypes, function (item) {
            return item.value !== "MIXED";
          });
          (0, _set2.default)(action, "form.fields.usageType.disabled", false);
          (0, _set2.default)(action, "form.fields.usageType.dropDownData", filterArrayWithoutMixed);
        }
        (0, _set2.default)(action, "form.fields.subUsageType.hideField", true);
      }
      (0, _set2.default)(action, "form.fields.occupancy.dropDownData", prepareDropDownData(occupancy));
      if ((0, _get2.default)(action, "form.fields.subUsageType.jsonPath")) {
        dispatch((0, _actions2.prepareFormData)(action.form.fields.subUsageType.jsonPath.split("usageCategoryDetail")[0] + "usageCategoryMajor", (0, _get2.default)(state, "common.prepareFormData.Properties[0].propertyDetails[0].usageCategoryMajor")));
      }
    }
    if (propertyType == "VACANT") {
      dispatch((0, _actions2.prepareFormData)("Properties[0].propertyDetails[0].noOfFloors", 1));
    }
    if (propertyType == "SHAREDPROPERTY") {
      dispatch((0, _actions2.prepareFormData)("Properties[0].propertyDetails[0].noOfFloors", 2));
      dispatch((0, _actions2.prepareFormData)("Properties[0].propertyDetails[0].units[0].floorNo", -1));
    }
    if ((0, _get2.default)(state, "common.prepareFormData." + (0, _get2.default)(action, "form.fields.occupancy.jsonPath")) === 'RENTED') {
      (0, _set2.default)(action, "form.fields.annualRent.hideField", false);
    } else {
      (0, _set2.default)(action, "form.fields.annualRent.hideField", true);
    }
    return action;
  }
};

var prepareDropDownData = exports.prepareDropDownData = function prepareDropDownData(master) {
  var withOriginal = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  var dropDownData = [];
  for (var variable in master) {
    if (master.hasOwnProperty(variable)) {
      if (withOriginal) {
        dropDownData.push(master[variable]);
      } else {
        dropDownData.push({ label: master[variable].name, value: master[variable].code });
      }
    }
  }
  return dropDownData;
};

var getPresentMasterObj = exports.getPresentMasterObj = function getPresentMasterObj(master1Arr, master2Arr, propToCompare) {
  var propArray = master2Arr.reduce(function (result, item) {
    if (item["code"] && result.indexOf(item["code"]) === -1) {
      result.push(item["code"]);
    }
    return result;
  }, []);
  return master1Arr.filter(function (item) {
    return propArray.indexOf(item[propToCompare]) !== -1;
  });
};

var getAbsentMasterObj = exports.getAbsentMasterObj = function getAbsentMasterObj(master1Arr, master2Arr, propToCompare) {
  var propArray = master2Arr.reduce(function (result, item) {
    if (item[propToCompare] && result.indexOf(item[propToCompare]) === -1) {
      result.push(item[propToCompare]);
    }
    return result;
  }, []);
  return master1Arr.filter(function (item) {
    return propArray.indexOf(item.code) === -1;
  });
};

var mergeMaster = exports.mergeMaster = function mergeMaster(masterOne, masterTwo) {
  var parentName = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "";

  var dropDownData = [];
  var parentList = [];
  for (var variable in masterTwo) {
    if (masterTwo.hasOwnProperty(variable)) {
      dropDownData.push({ label: masterTwo[variable].name, value: masterTwo[variable].code });
    }
  }
  var masterOneData = getAbsentMasterObj(prepareDropDownData(masterOne, true), prepareDropDownData(masterTwo, true), parentName);
  // console.log(masterOneData);
  for (var i = 0; i < masterOneData.length; i++) {
    // masterOneData[i][parentName]=masterOneData[i].code;
    dropDownData.push({ label: masterOneData[i].name, value: masterOneData[i].code });
  }
  return dropDownData;
};