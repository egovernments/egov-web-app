"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _formConfigModifier = require("./utils/formConfigModifier");

var _set = require("lodash/set");

var _set2 = _interopRequireDefault(_set);

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

var _actions = require("egov-ui-kit/redux/form/actions");

var _actions2 = require("egov-ui-kit/redux/common/actions");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var formConfig = {
  name: "ownershipType",
  fields: {
    typeOfOwnership: {
      id: "typeOfOwnership",
      jsonPath: "Properties[0].propertyDetails[0].subOwnershipCategory",
      type: "singleValueList",
      floatingLabelText: "PT_FORM3_OWNERSHIP_TYPE",
      hintText: "PT_FORM3_OWNERSHIP_TYPE_PLACEHOLDER",
      numcols: 6,
      required: true,
      updateDependentFields: function updateDependentFields(_ref) {
        var formKey = _ref.formKey,
            sourceField = _ref.field,
            dispatch = _ref.dispatch,
            state = _ref.state;
        var value = sourceField.value;

        var institutedropDown = (0, _formConfigModifier.updateInstituteType)(state, value);
        dispatch((0, _actions2.prepareFormData)("Properties[0].propertyDetails[0].ownershipCategory", (0, _get2.default)(state, "common.generalMDMSDataById.SubOwnerShipCategory[" + sourceField.value + "].ownerShipCategory", value)));
        if (value.toUpperCase().indexOf("INSTITUTIONAL") !== -1) {
          dispatch((0, _actions2.prepareFormData)("Properties[0].propertyDetails[0].subOwnershipCategory", null));
        }
        dispatch((0, _actions.setFieldProperty)("institutionDetails", "type", "dropDownData", institutedropDown));
      }
    }
  },
  beforeInitForm: function beforeInitForm(action, store) {
    var state = store.getState();
    var dispatch = store.dispatch;

    var ownerDetails = (0, _formConfigModifier.getOwnerDetails)(state);
    var currentOwnershipType = (0, _get2.default)(state, "form.ownershipType.fields.typeOfOwnership.value", ownerDetails[0].value);
    (0, _set2.default)(action, "form.fields.typeOfOwnership.dropDownData", ownerDetails);
    (0, _set2.default)(action, "form.fields.typeOfOwnership.value", currentOwnershipType);
    dispatch((0, _actions2.prepareFormData)("Properties[0].propertyDetails[0].subOwnershipCategory", ownerDetails[0].value));
    dispatch((0, _actions2.prepareFormData)("Properties[0].propertyDetails[0].ownershipCategory", (0, _get2.default)(state, "common.generalMDMSDataById.SubOwnerShipCategory[" + ownerDetails[0].value + "]").ownerShipCategory));
    return action;
  },
  action: "",
  redirectionRoute: "",
  saveUrl: "",
  isFormValid: false
};

exports.default = formConfig;