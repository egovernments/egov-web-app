"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toConsumableArray2 = require("babel-runtime/helpers/toConsumableArray");

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _PTCommon = require("egov-ui-kit/utils/PTCommon");

var _enableDependentFields = require("./utils/enableDependentFields");

var _get2 = require("lodash/get");

var _get3 = _interopRequireDefault(_get2);

var _set = require("lodash/set");

var _set2 = _interopRequireDefault(_set);

var _actions = require("egov-ui-kit/redux/form/actions");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var formConfig = {
  name: "ownerInfo",
  fields: {
    ownerName: {
      id: "ownerName",
      jsonPath: "Properties[0].propertyDetails[0].owners[0].name",
      type: "textfield",
      floatingLabelText: "PT_OWNER_NAME",
      hintText: "PT_FORM3_OWNER_NAME_PLACEHOLDER",
      required: true,
      errorStyle: { position: "absolute", bottom: -8, zIndex: 5 },
      pattern: /^[a-zA-Z\s]{1,64}$/i,
      errorMessage: "Enter valid name (max length 64)"
    },
    ownerMobile: {
      id: "ownerMobile",
      jsonPath: "Properties[0].propertyDetails[0].owners[0].mobileNumber",
      type: "textfield",
      floatingLabelText: "PT_FORM3_MOBILE_NO",
      hintText: "PT_FORM3_MOBILE_NO_PLACEHOLDER",
      required: true,
      pattern: /^([0]|((\+\d{1,2}[-]{0,1})))?\(?[6-9]\d{2}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/i,
      errorMessage: "Enter valid mobile number",
      errorStyle: { position: "absolute", bottom: -8, zIndex: 5 }
    },
    ownerGuardian: {
      id: "ownerGuardian",
      jsonPath: "Properties[0].propertyDetails[0].owners[0].fatherOrHusbandName",
      type: "textfield",
      floatingLabelText: "PT_FORM3_GUARDIAN",
      hintText: "PT_FORM3_GUARDIAN_PLACEHOLDER",
      required: true,
      errorStyle: { position: "absolute", bottom: -8, zIndex: 5 }
    },
    // ownerAadhar: {
    //   id: "ownerAadhar",
    //   jsonPath: "Properties[0].propertyDetails[0].owners[0].aadhaarNumber",
    //   type: "textfield",
    //   floatingLabelText: "Aadhar ID",
    //   hintText: "Enter aadhar card no.",
    //   errorMessage: "Enter valid aadhar number",
    //   pattern: /^[0-9]{12}$/i,
    // },
    ownerEmail: {
      id: "ownerEmail",
      jsonPath: "Properties[0].propertyDetails[0].owners[0].emailId",
      type: "textfield",
      floatingLabelText: "PT_FORM3_EMAIL_ID",
      hintText: "PT_FORM3_EMAIL_ID_PLACEHOLDER",
      errorMessage: "Enter valid email id",
      errorStyle: { position: "absolute", bottom: -8, zIndex: 5 },
      pattern: /^(?=^.{1,64}$)((([^<>()\[\]\\.,;:\s$*@'"]+(\.[^<>()\[\]\\.,;:\s@'"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,})))$/
    },
    ownerAddress: {
      id: "ownerAddress",
      jsonPath: "Properties[0].propertyDetails[0].owners[0].permanentAddress",
      type: "textfield",
      floatingLabelText: "PT_FORM3_CORRESPONDENCE_ADDRESS",
      hintText: "PT_FORM3_CORRESPONDENCE_ADDRESS_PLACEHOLDER",
      errorStyle: { position: "absolute", bottom: -8, zIndex: 5 },
      pattern: /^[<>()\-+_\|\[\]\\.,;:\s$*@'"\/#%& 0-9A-Za-z]{1,500}$/,
      errorMessage: "Enter valid address"
    },
    ownerRelationship: {
      id: "ownerRelationship",
      jsonPath: "Properties[0].propertyDetails[0].owners[0].relationship",
      type: "singleValueList",
      floatingLabelText: "PT_FORM3_RELATIONSHIP",
      hintText: "",
      dropDownData: [{ label: "Father", value: "father" }, { label: "Husband", value: "husband" }],
      value: "father",
      errorStyle: { position: "absolute", bottom: -8, zIndex: 5 }
    },
    ownerCategory: {
      id: "ownerCategory",
      required: true,
      jsonPath: "Properties[0].propertyDetails[0].owners[0].ownerType",
      type: "singleValueList",
      floatingLabelText: "PT_FORM3_SPECIAL_CATEGORY",
      hintText: "PT_COMMONS_SELECT_PLACEHOLDER",
      dropDownData: [],
      fullWidth: true,
      errorStyle: { position: "absolute", bottom: -8, zIndex: 5 },
      // dataFetchConfig: {
      //   url: MDMS.GET.URL,
      //   action: MDMS.GET.ACTION,
      //   queryParams: [],
      //   requestBody: {
      //     MdmsCriteria: {
      //       tenantId: "pb",
      //       moduleDetails: [
      //         {
      //           moduleName: "PropertyTax",
      //           masterDetails: [
      //             {
      //               name: "OwnerType",
      //             },
      //           ],
      //         },
      //       ],

      //     },
      //   },
      //   dataPath: ["MdmsRes.PropertyTax.OwnerType"],
      // },
      updateDependentFields: function updateDependentFields(_ref) {
        var formKey = _ref.formKey,
            sourceField = _ref.field,
            dispatch = _ref.dispatch,
            state = _ref.state;
        var value = sourceField.value;

        var dependentFields = ["ownerCategoryId", "ownerCategoryIdType"];
        var documentTypes = (0, _get3.default)(state, (process.env.REACT_APP_NAME === "Citizen" ? "citizen" : "employee") + ".mdms.document.MdmsRes.PropertyTax.OwnerTypeDocument", []).filter(function (docu) {
          return docu.ownerTypeCode === value;
        }).reduce(function (acc, curr) {
          var currAcc = [].concat((0, _toConsumableArray3.default)(acc));
          var dropDownData = {
            label: curr.name,
            value: curr.code
          };
          currAcc.push(dropDownData);
          return currAcc;
        }, []);
        dispatch((0, _actions.setFieldProperty)(formKey, "ownerCategoryIdType", "dropDownData", documentTypes));
        dispatch((0, _actions.setFieldProperty)(formKey, "ownerCategoryIdType", "value", (0, _get3.default)(documentTypes, "[0].value", "")));
        switch (value) {
          case "NONE":
            (0, _enableDependentFields.setDependentFields)(dependentFields, dispatch, formKey, true);
            break;
          default:
            (0, _enableDependentFields.setDependentFields)(dependentFields, dispatch, formKey, false);
            break;
        }
      },
      updateOnSetField: function updateOnSetField(store, action) {
        var dispatch = store.dispatch;
        var state = store.getState();
        var fieldKey = action.fieldKey,
            formKey = action.formKey,
            propertyValue = action.propertyValue;

        var dependentFields = ["ownerCategoryId", "ownerCategoryIdType"];
        var currentCategory = (0, _get3.default)(state, "form." + formKey + ".fields." + fieldKey + ".value", "NONE");
        var documentTypes = (0, _get3.default)(state, (process.env.REACT_APP_NAME === "Citizen" ? "citizen" : "employee") + ".mdms.document.MdmsRes.PropertyTax.OwnerTypeDocument", []).filter(function (docu) {
          return docu.ownerTypeCode === currentCategory;
        }).reduce(function (acc, curr) {
          var currAcc = [].concat((0, _toConsumableArray3.default)(acc));
          var dropDownData = {
            label: curr.name,
            value: curr.code
          };
          currAcc.push(dropDownData);
          return currAcc;
        }, []);
        dispatch((0, _actions.setFieldProperty)(formKey, "ownerCategoryIdType", "dropDownData", documentTypes));
        dispatch((0, _actions.setFieldProperty)(formKey, "ownerCategoryIdType", "value", (0, _get3.default)(documentTypes, "[0].value", "")));
        if (propertyValue.length > 0) {
          if (currentCategory === "NONE") {
            (0, _enableDependentFields.setDependentFields)(dependentFields, dispatch, formKey, true);
          } else {
            (0, _enableDependentFields.setDependentFields)(dependentFields, dispatch, formKey, false);
          }
        }
        return action;
      }
    },
    ownerCategoryId: {
      id: "ownerCategoryId",
      jsonPath: "Properties[0].propertyDetails[0].owners[0].document.documentUid",
      required: true,
      type: "textfield",
      floatingLabelText: "PT_FORM3_DOCUMENT_ID_NO",
      hintText: "PT_FORM3_DOCUMENT_ID_NO_PLACEHOLDER",
      hideField: true,
      toolTip: true,
      toolTipMessage: "PT_DOCUMENT_ID_TOOLTIP_MESSAGE",
      errorStyle: { position: "absolute", bottom: -8, zIndex: 5 }
    },
    ownerCategoryIdType: {
      id: "ownerCategoryIdType",
      jsonPath: "Properties[0].propertyDetails[0].owners[0].document.documentType",
      required: true,
      type: "singleValueList",
      floatingLabelText: "PT_FORM3_DOCUMENT_ID_TYPE",
      hideField: true,
      fullWidth: true,
      hintText: "PT_COMMONS_SELECT_PLACEHOLDER",
      toolTip: true,
      toolTipMessage: "PT_DOCUMENT_ID_TYPE_TOOLTIP_MESSAGE",
      errorStyle: { position: "absolute", bottom: -8, zIndex: 5 },
      dropDownData: [], //[{ label: "AADHAR", value: "Aadhar" }, { label: "Driving License", value: "Driving License" }],
      updateDependentFields: function updateDependentFields(_ref2) {
        var formKey = _ref2.formKey,
            sourceField = _ref2.field,
            dispatch = _ref2.dispatch,
            state = _ref2.state;
        var value = sourceField.value;

        if (value === "Aadhar") {
          dispatch((0, _actions.setFieldProperty)(formKey, "ownerCategoryId", "pattern", /^[0-9]{12}$/i));
          dispatch((0, _actions.setFieldProperty)(formKey, "ownerCategoryId", "errorMessage", "Enter valid 12 digits aadhar no"));
        } else {
          dispatch((0, _actions.setFieldProperty)(formKey, "ownerCategoryId", "pattern", ""));
          dispatch((0, _actions.setFieldProperty)(formKey, "ownerCategoryId", "errorMessage", ""));
        }
      }
    },
    ownerGender: {
      id: "ownerGender",
      jsonPath: "Properties[0].propertyDetails[0].owners[0].gender",
      value: "Male"
    },
    isSameAsPropertyAddress: {
      id: "rcpt",
      type: "checkbox",
      jsonPath: "",
      errorMessage: "",
      floatingLabelText: "PT_FORM3_ADDRESS_CHECKBOX",
      value: "",
      updateDependentFields: function updateDependentFields(_ref3) {
        var formKey = _ref3.formKey,
            sourceField = _ref3.field,
            dispatch = _ref3.dispatch,
            state = _ref3.state;
        var iscorrAddrSameProp = sourceField.value;

        var _get = (0, _get3.default)(state, "form.propertyAddress.fields", {}),
            _get$city = _get.city,
            city = _get$city === undefined ? "" : _get$city,
            _get$colony = _get.colony,
            colony = _get$colony === undefined ? "" : _get$colony,
            _get$houseNumber = _get.houseNumber,
            houseNumber = _get$houseNumber === undefined ? "" : _get$houseNumber,
            _get$mohalla = _get.mohalla,
            mohalla = _get$mohalla === undefined ? "" : _get$mohalla,
            _get$pincode = _get.pincode,
            pincode = _get$pincode === undefined ? "" : _get$pincode,
            _get$street = _get.street,
            street = _get$street === undefined ? "" : _get$street;

        var mohallaDetails = mohalla && mohalla.dropDownData && mohalla.dropDownData.find(function (mohallaData) {
          return mohallaData.value === (0, _get3.default)(mohalla, "value", "");
        });
        if (iscorrAddrSameProp) {
          var correspondingAddress = ["" + (0, _get3.default)(houseNumber, "value", ""), "" + (0, _get3.default)(colony, "value", ""), "" + (0, _get3.default)(street, "value", ""), "" + (0, _get3.default)(mohallaDetails, "label", ""), "" + (0, _get3.default)(city, "value", "").split(".").pop(), "" + (0, _get3.default)(pincode, "value", "")].join(", ").replace(/^(,\s)+|(,\s)+$/g, "").replace(/(,\s){2,}/g, ", ");
          dispatch((0, _actions.setFieldProperty)(formKey, "ownerAddress", "value", correspondingAddress));
        } else {
          dispatch((0, _actions.setFieldProperty)(formKey, "ownerAddress", "value", ""));
        }
      }
    }
  },
  beforeInitForm: function beforeInitForm(action, store, dispatch) {
    try {
      var state = store.getState();
      var OwnerTypes = (0, _get3.default)(state, "common.generalMDMSDataById.OwnerType");
      console.log(Object.values(OwnerTypes));
      var financialYearFromQuery = window.location.search.split("FY=")[1];
      financialYearFromQuery = financialYearFromQuery.split("&")[0];
      var dropdownData = (0, _PTCommon.getOwnerCategoryByYear)(Object.values(OwnerTypes), financialYearFromQuery);
      (0, _set2.default)(action, "form.fields.ownerCategory.dropDownData", dropdownData);
      // dispatch(setFieldProperty("ownerInfo", "ownerCategory", "dropDownData", dropdownData));
      console.log(dropdownData);
      return action;
    } catch (e) {
      console.log(e);
      return action;
    }
  },
  action: "",
  redirectionRoute: "",
  saveUrl: "",
  isFormValid: false
};

exports.default = formConfig;