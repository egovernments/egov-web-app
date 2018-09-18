"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _PTCommon = require("egov-ui-kit/utils/PTCommon");

var _actions = require("egov-ui-kit/redux/common/actions");

var _actions2 = require("egov-ui-kit/redux/form/actions");

var _removeFloors = require("./utils/removeFloors");

var _reusableFields = require("./utils/reusableFields");

var _set = require("lodash/set");

var _set2 = _interopRequireDefault(_set);

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

var _isEmpty = require("lodash/isEmpty");

var _isEmpty2 = _interopRequireDefault(_isEmpty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var formConfig = {
  name: "basicInformation",
  fields: {
    typeOfUsage: {
      id: "typeOfUsage",
      jsonPath: "Properties[0].propertyDetails[0].usageCategoryMinor",
      type: "singleValueList",
      floatingLabelText: "PT_COMMONS_PROPERTY_USAGE_TYPE",
      hintText: "PT_COMMONS_SELECT_PLACEHOLDER",
      required: true,
      fullWidth: true,
      updateDependentFields: function updateDependentFields(_ref) {
        var formKey = _ref.formKey,
            field = _ref.field,
            dispatch = _ref.dispatch,
            state = _ref.state;

        (0, _removeFloors.removeFormKey)(formKey, field, dispatch, state);
        dispatch((0, _actions.prepareFormData)("Properties[0].propertyDetails[0].units", []));
        var minorObject = (0, _get2.default)(state, "common.generalMDMSDataById.UsageCategoryMinor[" + field.value + "]");
        if (!(0, _isEmpty2.default)(minorObject)) {
          dispatch((0, _actions.prepareFormData)("Properties[0].propertyDetails[0].usageCategoryMajor", minorObject.usageCategoryMajor));
        } else {
          dispatch((0, _actions.prepareFormData)("Properties[0].propertyDetails[0].usageCategoryMajor", field.value));
          dispatch((0, _actions.prepareFormData)("Properties[0].propertyDetails[0].usageCategoryMinor", null));
        }
      },
      dropDownData: []
    },
    typeOfBuilding: {
      id: "typeOfBuilding",
      jsonPath: "Properties[0].propertyDetails[0].propertySubType",
      type: "singleValueList",
      floatingLabelText: "PT_COMMONS_PROPERTY_TYPE",
      hintText: "PT_COMMONS_SELECT_PLACEHOLDER",
      required: true,
      fullWidth: true,
      updateDependentFields: function updateDependentFields(_ref2) {
        var formKey = _ref2.formKey,
            field = _ref2.field,
            dispatch = _ref2.dispatch,
            state = _ref2.state;

        dispatch((0, _actions.prepareFormData)("Properties[0].propertyDetails[0].units", []));
        dispatch((0, _actions.prepareFormData)("Properties[0].propertyDetails[0].landArea", null));
        dispatch((0, _actions.prepareFormData)("Properties[0].propertyDetails[0].buildUpArea", null));
        dispatch((0, _actions2.removeForm)("plotDetails"));
        (0, _removeFloors.removeFormKey)(formKey, field, dispatch, state);
        var subTypeObject = (0, _get2.default)(state, "common.generalMDMSDataById.PropertySubType[" + field.value + "]");
        if (!(0, _isEmpty2.default)(subTypeObject)) {
          dispatch((0, _actions.prepareFormData)("Properties[0].propertyDetails[0].propertyType", subTypeObject.propertyType));
        } else {
          dispatch((0, _actions.prepareFormData)("Properties[0].propertyDetails[0].propertyType", field.value));
          dispatch((0, _actions.prepareFormData)("Properties[0].propertyDetails[0].propertySubType", null));
        }
      },
      dropDownData: []
    }
  },
  action: "",
  redirectionRoute: "",
  saveUrl: "",
  isFormValid: false,
  beforeInitForm: function beforeInitForm(action, store) {
    try {
      var state = store.getState();
      localStorage.setItem("previousFloorNo", -1);
      var masterOne = (0, _get2.default)(state, "common.generalMDMSDataById.UsageCategoryMajor");
      var masterTwo = (0, _get2.default)(state, "common.generalMDMSDataById.UsageCategoryMinor");
      var mergedMaster = mergeMaster(masterOne, masterTwo, "usageCategoryMajor");
      var typeOfUsageSorted = (0, _PTCommon.sortDropdown)(mergedMaster, "label", true);
      (0, _set2.default)(action, "form.fields.typeOfUsage.dropDownData", typeOfUsageSorted);
      masterOne = (0, _get2.default)(state, "common.generalMDMSDataById.PropertyType");
      masterTwo = (0, _get2.default)(state, "common.generalMDMSDataById.PropertySubType");
      (0, _set2.default)(action, "form.fields.typeOfBuilding.dropDownData", mergeMaster(masterOne, masterTwo, "propertyType"));
      return action;
    } catch (e) {
      console.log(e);
    }
  }
};

exports.default = formConfig;


var mergeMaster = function mergeMaster(masterOne, masterTwo) {
  var parentName = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "";

  var dropDownData = [];
  var parentList = [];
  for (var variable in masterTwo) {
    if (masterTwo.hasOwnProperty(variable)) {
      dropDownData.push({ label: masterTwo[variable].name, value: masterTwo[variable].code });
    }
  }
  var masterOneData = getAbsentMasterObj((0, _reusableFields.prepareDropDownData)(masterOne, true), (0, _reusableFields.prepareDropDownData)(masterTwo, true), parentName);
  // console.log(masterOneData);
  for (var i = 0; i < masterOneData.length; i++) {
    // masterOneData[i][parentName]=masterOneData[i].code;
    dropDownData.push({ label: masterOneData[i].name, value: masterOneData[i].code });
  }
  return dropDownData;
};

var getAbsentMasterObj = function getAbsentMasterObj(master1Arr, master2Arr, propToCompare) {
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