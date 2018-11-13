"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _PTCommon = require("egov-ui-kit/utils/PTCommon");

var _enableDependentFields = require("../utils/enableDependentFields");

var _actions = require("egov-ui-kit/redux/common/actions");

var _reusableFields = require("../utils/reusableFields");

var _filter = require("lodash/filter");

var _filter2 = _interopRequireDefault(_filter);

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

var _set = require("lodash/set");

var _set2 = _interopRequireDefault(_set);

var _isEmpty = require("lodash/isEmpty");

var _isEmpty2 = _interopRequireDefault(_isEmpty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var formConfig = (0, _extends3.default)({
  name: "plotDetails",
  fields: (0, _extends3.default)({
    usageType: {
      id: "assessment-usageType",
      jsonPath: "Properties[0].propertyDetails[0].units[0].usageCategoryMinor",
      type: "singleValueList",
      floatingLabelText: "PT_FORM2_USAGE_TYPE",
      required: true,
      numcols: 4,
      dropDownData: [],
      updateDependentFields: function updateDependentFields(_ref) {
        var formKey = _ref.formKey,
            field = _ref.field,
            dispatch = _ref.dispatch,
            state = _ref.state;

        var minorObject = (0, _get2.default)(state, "common.generalMDMSDataById.UsageCategoryMinor[" + field.value + "]");
        if (!(0, _isEmpty2.default)(minorObject)) {
          dispatch((0, _actions.prepareFormData)(field.jsonPath.split("usageCategoryMinor")[0] + "usageCategoryMajor", minorObject.usageCategoryMajor));
          var filteredSubUsageMinor = (0, _filter2.default)((0, _reusableFields.prepareDropDownData)((0, _get2.default)(state, "common.generalMDMSDataById.UsageCategorySubMinor"), true), function (subUsageMinor) {
            return subUsageMinor.usageCategoryMinor === field.value;
          });
          if (filteredSubUsageMinor.length > 0) {
            var filteredUsageCategoryDetails = (0, _reusableFields.getPresentMasterObj)((0, _reusableFields.prepareDropDownData)((0, _get2.default)(state, "common.generalMDMSDataById.UsageCategoryDetail"), true), filteredSubUsageMinor, "usageCategorySubMinor");
            (0, _enableDependentFields.setDependentFields)(["subUsageType"], dispatch, formKey, false);
            var mergedMaster = (0, _reusableFields.mergeMaster)(filteredSubUsageMinor, filteredUsageCategoryDetails, "usageCategorySubMinor");
            var subUsageData = (0, _PTCommon.sortDropdown)(mergedMaster, "label", true);
            (0, _enableDependentFields.setDependentFields)(["subUsageType"], dispatch, formKey, subUsageData, "dropDownData");
          }
        } else {
          (0, _enableDependentFields.setDependentFields)(["subUsageType"], dispatch, formKey, true);
          dispatch((0, _actions.prepareFormData)(field.jsonPath.split("usageCategoryMinor")[0] + "usageCategoryMajor", field.value));
          dispatch((0, _actions.prepareFormData)(field.jsonPath.split("usageCategoryMinor")[0] + "usageCategoryMinor", null));
        }
      }
    }
  }, _reusableFields.subUsageType, _reusableFields.occupancy, _reusableFields.superArea, _reusableFields.measuringUnit, _reusableFields.annualRent, _reusableFields.floorName),
  isFormValid: false
}, _reusableFields.beforeInitFormForPlot);

exports.default = formConfig;