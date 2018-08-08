import { MDMS } from "egov-ui-kit/utils/endPoints";
import { setDependentFields } from "modules/citizen/PropertyTax/FormWizard/utils/enableDependentFields";
import get from "lodash/get";
import { setFieldProperty } from "egov-ui-kit/redux/form/actions";

const formConfig = {
  name: "ownerInfo",
  fields: {
    ownerName: {
      id: "ownerName",
      jsonPath: "Properties[0].propertyDetails[0].owners[0].name",
      type: "textfield",
      floatingLabelText: "PT_OWNER_NAME",
      hintText: "PT_FORM3_OWNER_NAME_PLACEHOLDER",
      required: true,
    },
    ownerMobile: {
      id: "ownerMobile",
      jsonPath: "Properties[0].propertyDetails[0].owners[0].mobileNumber",
      type: "textfield",
      floatingLabelText: "PT_FORM3_MOBILE_NO",
      hintText: "PT_FORM3_MOBILE_NO_PLACEHOLDER",
      required: true,
      pattern: /^(\+\d{1,2}\s)?\(?[6-9]\d{2}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/i,
      errorMessage: "Enter valid mobile number",
    },
    ownerGuardian: {
      id: "ownerGuardian",
      jsonPath: "Properties[0].propertyDetails[0].owners[0].fatherOrHusbandName",
      type: "textfield",
      floatingLabelText: "PT_FORM3_GUARDIAN",
      hintText: "PT_FORM3_GUARDIAN_PLACEHOLDER",
      required: true,
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
      pattern: /^(([^<>()\[\]\\.,;:\s$*@'"]+(\.[^<>()\[\]\\.,;:\s@'"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    },
    ownerAddress: {
      id: "ownerAddress",
      jsonPath: "Properties[0].propertyDetails[0].owners[0].permanentAddress",
      type: "textfield",
      floatingLabelText: "PT_FORM3_CORRESPONDENCE_ADDRESS",
      hintText: "PT_FORM3_CORRESPONDENCE_ADDRESS_PLACEHOLDER",
    },
    ownerRelationship: {
      id: "ownerRelationship",
      jsonPath: "Properties[0].propertyDetails[0].owners[0].relationship",
      type: "singleValueList",
      floatingLabelText: "PT_FORM3_RELATIONSHIP",
      hintText: "",
      dropDownData: [{ label: "Father", value: "father" }, { label: "Husband", value: "husband" }],
      value: "father",
    },
    ownerCategory: {
      id: "ownerCategory",
      required: true,
      jsonPath: "Properties[0].propertyDetails[0].owners[0].ownerType",
      type: "singleValueList",
      floatingLabelText: "PT_FORM3_SPECIAL_CATEGORY",
      hintText: "PT_COMMONS_SELECT_PLACEHOLDER",
      dropDownData: [],
      dataFetchConfig: {
        url: MDMS.GET.URL,
        action: MDMS.GET.ACTION,
        queryParams: [],
        requestBody: {
          MdmsCriteria: {
            tenantId: "pb",
            moduleDetails: [
              {
                moduleName: "PropertyTax",
                masterDetails: [
                  {
                    name: "OwnerType",
                    filter: "[?(@.fromFY=='2013-14')]", //year value for this filter should be dynamic.
                  },
                ],
              },
            ],
          },
        },
        dataPath: ["MdmsRes.PropertyTax.OwnerType"],
      },
      updateDependentFields: ({ formKey, field: sourceField, dispatch }) => {
        const { value } = sourceField;
        const dependentFields = ["ownerCategoryId", "ownerCategoryIdType"];
        switch (value) {
          case "FREEDOMFIGHTER":
            setDependentFields(dependentFields, dispatch, formKey, false);
            break;
          default:
            setDependentFields(dependentFields, dispatch, formKey, true);
            break;
        }
      },
    },
    ownerCategoryId: {
      id: "ownerCategoryId",
      jsonPath: "Properties[0].propertyDetails[0].owners[0].document.documentUid",
      required: true,
      type: "textfield",
      floatingLabelText: "PT_FORM3_DOCUMENT_ID_NO",
      hintText: "PT_FORM3_DOCUMENT_ID_NO_PLACEHOLDER",
      hideField: true,
    },
    ownerCategoryIdType: {
      id: "ownerCategoryIdType",
      jsonPath: "Properties[0].propertyDetails[0].owners[0].document.documentType",
      required: true,
      type: "singleValueList",
      floatingLabelText: "PT_FORM3_DOCUMENT_ID_TYPE",
      hideField: true,
      hintText: "PT_COMMONS_SELECT_PLACEHOLDER",
      dropDownData: [{ label: "AADHAR", value: "Aadhar" }, { label: "Driving License", value: "Driving License" }],
    },
    ownerGender: {
      id: "ownerGender",
      jsonPath: "Properties[0].propertyDetails[0].owners[0].gender",
    },
    isSameAsPropertyAddress: {
      id: "rcpt",
      type: "checkbox",
      jsonPath: "",
      errorMessage: "",
      floatingLabelText: "PT_FORM3_ADDRESS_CHECKBOX",
      value: "",
      updateDependentFields: ({ formKey, field: sourceField, dispatch, state }) => {
        const { value: iscorrAddrSameProp } = sourceField;
        const { city = "", colony = "", houseNumber = "", mohalla = "", pincode = "", street = "" } = get(state, "form.propertyAddress.fields", {});
        if (iscorrAddrSameProp) {
          const correspondingAddress = `${get(houseNumber, "value", "")} ${get(colony, "value", "")} ${get(street, "value", "")} ${get(
            city,
            "value",
            ""
          )
            .split(".")
            .pop()} ${get(pincode, "value", "")}`;
          dispatch(setFieldProperty(formKey, "ownerAddress", "value", correspondingAddress));
        } else {
          dispatch(setFieldProperty(formKey, "ownerAddress", "value", ""));
        }
      },
    },
  },
  action: "",
  redirectionRoute: "",
  saveUrl: "",
  isFormValid: false,
};

export default formConfig;
