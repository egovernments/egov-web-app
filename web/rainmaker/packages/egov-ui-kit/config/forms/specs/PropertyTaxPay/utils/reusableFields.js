"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mergeMaster = exports.getAbsentMasterObj = exports.getPresentMasterObj = exports.prepareDropDownData = exports.pincode = exports.mohalla = exports.street = exports.colony = exports.houseNumber = exports.dummy = exports.city = exports.beforeInitFormForPlot = exports.beforeInitForm = exports.measuringUnit = exports.annualRent = exports.superArea = exports.builtArea = exports.occupancy = exports.subUsageType = exports.floorCount = exports.plotSize = undefined;

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _PTCommon = require("egov-ui-kit/utils/PTCommon");

var _actions = require("egov-ui-kit/redux/common/actions");

var _enableDependentFields = require("./enableDependentFields");

var _removeFloors = require("./removeFloors");

var _actions2 = require("egov-ui-kit/redux/form/actions");

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
        dispatch((0, _actions.prepareFormData)("Properties[0].propertyDetails[0].landArea", field.value));
        dispatch((0, _actions.prepareFormData)("Properties[0].propertyDetails[0].buildUpArea", null));
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

      // removeFormKey(formKey, field, dispatch, state);
      var previousFloorNo = localStorage.getItem("previousFloorNo") || -1;
      console.log(previousFloorNo, field.value);
      localStorage.setItem("previousFloorNo", field.value);
      // dispatch(toggleSpinner());
      if (previousFloorNo > field.value) {
        for (var i = field.value; i < previousFloorNo; i++) {
          if (state.form.hasOwnProperty("customSelect_" + i)) {
            dispatch((0, _actions2.removeForm)("customSelect_" + i));
          }
          for (var variable in state.form) {
            if (state.form.hasOwnProperty(variable) && variable.startsWith("floorDetails_" + i)) {
              dispatch((0, _actions2.removeForm)(variable));
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
        dispatch((0, _actions.prepareFormData)(field.jsonPath.split("usageCategoryDetail")[0] + "usageCategorySubMinor", subUsageMinor.usageCategorySubMinor));
      } else {
        dispatch((0, _actions.prepareFormData)(field.jsonPath.split("usageCategoryDetail")[0] + "usageCategorySubMinor", field.value));
        dispatch((0, _actions.prepareFormData)(field.jsonPath, null));
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

      dispatch((0, _actions.prepareFormData)("Properties[0].propertyDetails[0].units[0].unitArea", field.value));
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
    numcols: 4
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
        dispatch((0, _actions.prepareFormData)("Properties[0].propertyDetails[0].units[0].floorNo", "0"));
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
        // console.log(formKey);
        if (!state.form[formKey]) {
          var customSelectObj = state.form["customSelect_" + floorIndex];
          // console.log(customSelectObj);
          var floorNo = customSelectObj.fields && customSelectObj.fields.floorName && customSelectObj.fields.floorName.value;
          // console.log(floorNo);
          dispatch((0, _actions.prepareFormData)("Properties[0].propertyDetails[0].units[" + unitsCount + "].floorNo", "" + floorNo));
        }
      }
    }

    var occupancy = (0, _get2.default)(state, "common.generalMDMSDataById.OccupancyType");
    var usageCategoryMinor = (0, _get2.default)(state, "common.prepareFormData.Properties[0].propertyDetails[0].usageCategoryMinor");
    var usageCategoryMajor = (0, _get2.default)(state, "common.prepareFormData.Properties[0].propertyDetails[0].usageCategoryMajor");
    (0, _set2.default)(action, "form.fields.subUsageType.hideField", false);

    var unitFormUpdate = function unitFormUpdate(usageCategoryMinor) {
      var skipMajorUpdate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

      var filteredSubUsageMinor = (0, _filter2.default)(prepareDropDownData((0, _get2.default)(state, "common.generalMDMSDataById.UsageCategorySubMinor"), true), function (subUsageMinor) {
        return subUsageMinor.usageCategoryMinor === (0, _get2.default)(state, usageCategoryMinor);
      });
      if (filteredSubUsageMinor.length > 0) {
        var filteredUsageCategoryDetails = getPresentMasterObj(prepareDropDownData((0, _get2.default)(state, "common.generalMDMSDataById.UsageCategoryDetail"), true), filteredSubUsageMinor, "usageCategorySubMinor");
        var mergedMaster = mergeMaster(filteredSubUsageMinor, filteredUsageCategoryDetails, "usageCategorySubMinor");
        var subUsageData = (0, _PTCommon.sortDropdown)(mergedMaster, "label", true);
        (0, _set2.default)(action, "form.fields.subUsageType.dropDownData", subUsageData);
        if ((0, _get2.default)(action, "form.fields.subUsageType.jsonPath") && skipMajorUpdate) {
          dispatch((0, _actions.prepareFormData)(action.form.fields.subUsageType.jsonPath.split("usageCategoryDetail")[0] + "usageCategoryMinor", (0, _get2.default)(state, "common.prepareFormData.Properties[0].propertyDetails[0].usageCategoryMinor")));
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
        var usageTypeData = (0, _PTCommon.sortDropdown)(filterArrayWithoutMixed, "label", true);
        (0, _set2.default)(action, "form.fields.usageType.dropDownData", usageTypeData);
        unitFormUpdate("common.prepareFormData." + action.form.fields.subUsageType.jsonPath.split("usageCategoryDetail")[0] + "usageCategoryMinor", false);
      } else {
        (0, _set2.default)(action, "form.fields.subUsageType.hideField", true);
      }
    }
    (0, _set2.default)(action, "form.fields.occupancy.dropDownData", prepareDropDownData(occupancy));
    if ((0, _get2.default)(action, "form.fields.subUsageType.jsonPath") && usageCategoryMajor !== "MIXED") {
      dispatch((0, _actions.prepareFormData)(action.form.fields.subUsageType.jsonPath.split("usageCategoryDetail")[0] + "usageCategoryMajor", (0, _get2.default)(state, "common.prepareFormData.Properties[0].propertyDetails[0].usageCategoryMajor")));
    }
    if ((0, _get2.default)(state, "common.prepareFormData." + (0, _get2.default)(action, "form.fields.occupancy.jsonPath")) === "RENTED") {
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
          var mergedMaster = mergeMaster(filteredSubUsageMinor, filteredUsageCategoryDetails, "usageCategorySubMinor");
          var subUsageData = (0, _PTCommon.sortDropdown)(mergedMaster, "label", true);
          (0, _set2.default)(action, "form.fields.subUsageType.dropDownData", subUsageData);
          // set(
          //   action,
          //   "form.fields.subUsageType.value",
          //   null)
          // );
          if ((0, _get2.default)(action, "form.fields.subUsageType.jsonPath")) {
            dispatch((0, _actions.prepareFormData)(action.form.fields.subUsageType.jsonPath.split("usageCategoryDetail")[0] + "usageCategoryMinor", (0, _get2.default)(state, "common.prepareFormData.Properties[0].propertyDetails[0].usageCategoryMinor")));
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
          var usageTypeData = (0, _PTCommon.sortDropdown)(filterArrayWithoutMixed, "label", true);
          (0, _set2.default)(action, "form.fields.usageType.dropDownData", usageTypeData);
        }
        (0, _set2.default)(action, "form.fields.subUsageType.hideField", true);
      }
      (0, _set2.default)(action, "form.fields.occupancy.dropDownData", prepareDropDownData(occupancy));
      if ((0, _get2.default)(action, "form.fields.subUsageType.jsonPath") && usageCategoryMajor !== "MIXED") {
        dispatch((0, _actions.prepareFormData)(action.form.fields.subUsageType.jsonPath.split("usageCategoryDetail")[0] + "usageCategoryMajor", (0, _get2.default)(state, "common.prepareFormData.Properties[0].propertyDetails[0].usageCategoryMajor")));
      }
    }
    if (propertyType == "VACANT") {
      dispatch((0, _actions.prepareFormData)("Properties[0].propertyDetails[0].noOfFloors", 1));
    }
    if (propertyType == "SHAREDPROPERTY") {
      dispatch((0, _actions.prepareFormData)("Properties[0].propertyDetails[0].noOfFloors", 2));
      dispatch((0, _actions.prepareFormData)("Properties[0].propertyDetails[0].units[0].floorNo", -1));
    }
    if ((0, _get2.default)(state, "common.prepareFormData." + (0, _get2.default)(action, "form.fields.occupancy.jsonPath")) === "RENTED") {
      (0, _set2.default)(action, "form.fields.annualRent.hideField", false);
    } else {
      (0, _set2.default)(action, "form.fields.annualRent.hideField", true);
    }
    return action;
  }
};

var city = exports.city = {
  city: {
    id: "city",
    jsonPath: "Properties[0].address.city",
    required: true,
    type: "singleValueList",
    floatingLabelText: "CORE_COMMON_CITY",
    className: "pt-emp-property-address-city",
    disabled: true,
    errorStyle: { position: "absolute", bottom: -8, zIndex: 5 },
    fullWidth: true,
    hintText: "PT_COMMONS_SELECT_PLACEHOLDER",
    numcols: 6,
    dataFetchConfig: {
      // url: CITY.GET.URL,
      // action: CITY.GET.ACTION,
      // queryParams: [],
      // requestBody: {
      //   MdmsCriteria: {
      //     tenantId: "pb",
      //     moduleDetails: [
      //       {
      //         moduleName: "tenant",
      //         masterDetails: [
      //           {
      //             name: "tenants",
      //           },
      //         ],
      //       },
      //     ],
      //   },
      // },
      // dataPath: ["MdmsRes.tenant.tenants"],
      dependants: [{
        fieldKey: "mohalla"
      }]
    },
    updateDependentFields: function updateDependentFields(_ref6) {
      var formKey = _ref6.formKey,
          field = _ref6.field,
          dispatch = _ref6.dispatch,
          state = _ref6.state;

      dispatch((0, _actions.prepareFormData)("Properties[0].tenantId", field.value));
      var requestBody = {
        MdmsCriteria: {
          tenantId: field.value,
          moduleDetails: [{
            moduleName: "PropertyTax",
            masterDetails: [{
              name: "Floor"
            }, {
              name: "OccupancyType"
            }, {
              name: "OwnerShipCategory"
            }, {
              name: "OwnerType"
            }, {
              name: "PropertySubType"
            }, {
              name: "PropertyType"
            }, {
              name: "SubOwnerShipCategory"
            }, {
              name: "UsageCategoryDetail"
            }, {
              name: "UsageCategoryMajor"
            }, {
              name: "UsageCategoryMinor"
            }, {
              name: "UsageCategorySubMinor"
            }]
          }]
        }
      };

      dispatch((0, _actions.fetchGeneralMDMSData)(requestBody, "PropertyTax", ["Floor", "OccupancyType", "OwnerShipCategory", "OwnerType", "PropertySubType", "PropertyType", "SubOwnerShipCategory", "UsageCategoryDetail", "UsageCategoryMajor", "UsageCategoryMinor", "UsageCategorySubMinor"]));
    }
  }
};

var dummy = exports.dummy = {
  dummy: {
    numcols: 6,
    type: "dummy"
  }
};

var houseNumber = exports.houseNumber = {
  houseNumber: {
    id: "house-number",
    jsonPath: "Properties[0].address.doorNo",
    type: "textfield",
    floatingLabelText: "PT_PROPERTY_DETAILS_DOOR_NUMBER",
    hintText: "PT_PROPERTY_DETAILS_DOOR_NUMBER_PLACEHOLDER",
    numcols: 6,
    errorMessage: "PT_PROPERTY_DETAILS_DOOR_NUMBER_ERRORMSG",
    errorStyle: { position: "absolute", bottom: -8, zIndex: 5 },
    maxLength: 64
  }
};

var colony = exports.colony = {
  colony: {
    id: "property-colony",
    jsonPath: "Properties[0].address.buildingName",
    type: "textfield",
    floatingLabelText: "PT_PROPERTY_DETAILS_BUILDING_COLONY_NAME",
    hintText: "PT_PROPERTY_DETAILS_BUILDING_COLONY_NAME_PLACEHOLDER",
    numcols: 6,
    errorMessage: "PT_PROPERTY_DETAILS_COLONY_NAME_ERRORMSG",
    errorStyle: { position: "absolute", bottom: -8, zIndex: 5 },
    maxLength: 64
  }
};

var street = exports.street = {
  street: {
    id: "property-street",
    jsonPath: "Properties[0].address.street",
    type: "textfield",
    floatingLabelText: "PT_PROPERTY_DETAILS_STREET_NAME",
    hintText: "PT_PROPERTY_DETAILS_STREET_NAME_PLACEHOLDER",
    numcols: 6,
    errorMessage: "PT_PROPERTY_DETAILS_STREET_ERRORMSG",
    errorStyle: { position: "absolute", bottom: -8, zIndex: 5 },
    maxLength: 64
  }
};

var mohalla = exports.mohalla = {
  mohalla: {
    id: "mohalla",
    jsonPath: "Properties[0].address.locality.code",
    type: "autoSuggestDropdown",
    floatingLabelText: "PT_PROPERTY_DETAILS_MOHALLA",
    hintText: "PT_COMMONS_SELECT_PLACEHOLDER",
    fullWidth: true,
    toolTip: true,
    toolTipMessage: "PT_MOHALLA_TOOLTIP_MESSAGE",
    //toolTipMessage: "Name of the area in which your property is located",
    boundary: true,
    numcols: 6,
    errorMessage: "PT_PROPERTY_DETAILS_MOHALLA_ERRORMSG",
    dataFetchConfig: {
      url: "egov-location/location/v11/boundarys/_search?hierarchyTypeCode=REVENUE&boundaryType=Locality",
      action: "",
      queryParams: [],
      requestBody: {},
      isDependent: true
    },
    errorStyle: { position: "absolute", bottom: -8, zIndex: 5 },
    required: true,
    updateDependentFields: function updateDependentFields(_ref7) {
      var formKey = _ref7.formKey,
          field = _ref7.field,
          dispatch = _ref7.dispatch;

      if (field.value && field.value.length > 0) {
        var _mohalla = field.dropDownData.find(function (option) {
          return option.value === field.value;
        });
        dispatch((0, _actions.prepareFormData)("Properties[0].address.locality.area", _mohalla.area));
      }
    }
  }
};

var pincode = exports.pincode = {
  pincode: {
    id: "pincode",
    type: "number",
    jsonPath: "Properties[0].address.pincode",
    floatingLabelText: "PT_PROPERTY_DETAILS_PINCODE",
    hintText: "PT_PROPERTY_DETAILS_PINCODE_PLACEHOLDER",
    numcols: 6,
    //errorMessage: "PT_PROPERTY_DETAILS_PINCODE_ERRORMSG",
    errorMessage: "Pincode should be 6 digits",
    errorStyle: { position: "absolute", bottom: -8, zIndex: 5 },
    pattern: "^([0-9]){6}$"
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