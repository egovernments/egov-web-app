"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reusableFields = require("./utils/reusableFields");

var _actions = require("egov-ui-kit/redux/form/actions");

var _actions2 = require("egov-ui-kit/redux/common/actions");

var _set = require("lodash/set");

var _set2 = _interopRequireDefault(_set);

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var formConfig = {
  name: "customSelect",
  fields: {
    floorName: {
      id: "floorName",
      type: "singleValueList",
      floatingLabelText: "PT_FORM2_SELECT_FLOOR",
      hintText: "PT_FORM2_SELECT_FLOOR",
      numcols: 12,
      errorMessage: "",
      required: true,
      className: "pt-floor-name",
      beforeFieldChange: function beforeFieldChange(_ref) {
        var action = _ref.action,
            dispatch = _ref.dispatch,
            state = _ref.state;
        var value = action.value;

        var floorValues = Object.keys(state.form).reduce(function (floorValues, key) {
          if (key.startsWith("customSelect_")) {
            var form = state.form[key];
            if (form && form.fields.floorName.value) {
              floorValues.push(form.fields.floorName.value);
            }
          }
          return floorValues;
        }, []);
        var valueExists = floorValues.find(function (floorvalue) {
          return floorvalue === value;
        });
        if (valueExists && (0, _get2.default)(state, "form[" + action.formKey + "].fields[" + action.fieldKey + "].value") !== action.value) {
          alert("This floor is already selected, please select another floor");
          action.value = "";
        }
        return action;
      },
      updateDependentFields: function updateDependentFields(_ref2) {
        var formKey = _ref2.formKey,
            field = _ref2.field,
            dispatch = _ref2.dispatch,
            state = _ref2.state;

        var arr = formKey.split("_");
        var floorIndex = parseInt(arr[1]);
        var floorNo = (0, _get2.default)(state, "form." + formKey + ".fields.floorName.value");
        dispatch((0, _actions2.prepareFormData)("Properties[0].propertyDetails[0].units[" + floorIndex + "].floorNo", floorNo));
      }
    }
  },
  action: "",
  redirectionRoute: "",
  saveUrl: "",
  isFormValid: false,
  beforeInitForm: function beforeInitForm(action, store, dispatch) {
    try {
      var state = store.getState();
      if ((0, _get2.default)(state, "common.prepareFormData.Properties[0].propertyDetails[0].usageCategoryMajor") !== "RESIDENTIAL" && (0, _get2.default)(state, "common.prepareFormData.Properties[0].propertyDetails[0].propertySubType") === "SHAREDPROPERTY") {
        dispatch((0, _actions.setFieldProperty)(action.form.name, "floorName", "hideField", true));
      } else {
        dispatch((0, _actions.setFieldProperty)(action.form.name, "floorName", "hideField", false));

        var _ref3 = state.common && state.common.generalMDMSDataById,
            Floor = _ref3.Floor;

        (0, _set2.default)(action, "form.fields.floorName.dropDownData", (0, _reusableFields.prepareDropDownData)(Floor));
      }
      return action;
    } catch (e) {
      console.log(e);
    }
  },
  afterInitForm: function afterInitForm(action, store, dispatch) {
    try {
      var state = store.getState();
      if (action.form.name === "customSelect_0") {
        if ((0, _get2.default)(state, "common.prepareFormData.Properties[0].propertyDetails[0].usageCategoryMajor") !== "RESIDENTIAL" && (0, _get2.default)(state, "common.prepareFormData.Properties[0].propertyDetails[0].propertySubType") === "SHAREDPROPERTY") {
          //Do nothing
        } else {
          dispatch((0, _actions.handleFieldChange)("customSelect_0", "floorName", "0"));
          dispatch((0, _actions.setFieldProperty)("customSelect_0", "floorName", "disabled", true));
        }
      }
      return action;
    } catch (e) {
      console.log(e);
    }
  }
};

exports.default = formConfig;