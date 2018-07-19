import { setFieldProperty } from "egov-ui-kit/redux/form/actions";
import { MDMS } from "egov-ui-kit/utils/endPoints";
const formConfig = {
  name: "ownerInfo",
  fields: {
    ownerName: {
      id: "ownerName",
      jsonPath: "Properties[0].propertyDetails[0].owners[0].name",
      type: "textfield",
      floatingLabelText: "Name",
      hintText: "Enter Owner's Name",
      required: true,
    },
    ownerMobile: {
      id: "ownerMobile",
      jsonPath: "Properties[0].propertyDetails[0].owners[0].mobileNumber",
      type: "textfield",
      floatingLabelText: "Mobile No.",
      hintText: "Enter Mobile No.",
      required: true,
      pattern: /^(\+\d{1,2}\s)?\(?[6-9]\d{2}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/i,
      errorMessage: "Enter valid mobile number",
    },
    ownerGuardian: {
      id: "ownerGuardian",
      jsonPath: "Properties[0].propertyDetails[0].owners[0].fatherOrHusbandName",
      type: "textfield",
      floatingLabelText: "Father's/Husband's Name",
      hintText: "Enter details",
      required: true,
    },
    ownerAadhar: {
      id: "ownerAadhar",
      jsonPath: "Properties[0].propertyDetails[0].owners[0].aadhaarNumber",
      type: "textfield",
      floatingLabelText: "Aadhar ID",
      hintText: "Enter aadhar card no.",
      errorMessage: "Enter valid aadhar number",
      pattern: /^[0-9]{12}$/i,
    },
    ownerEmail: {
      id: "ownerEmail",
      jsonPath: "Properties[0].propertyDetails[0].owners[0].emailId",
      type: "textfield",
      floatingLabelText: "Email ID",
      hintText: "Enter email ID",
      errorMessage: "Enter valid email id",
      pattern: /^(([^<>()\[\]\\.,;:\s$*@'"]+(\.[^<>()\[\]\\.,;:\s@'"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    },
    ownerAddress: {
      id: "ownerAddress",
      jsonPath: "Properties[0].propertyDetails[0].owners[0].correspondenceAddress",
      type: "textfield",
      floatingLabelText: "Correspondence Address",
      hintText: "Enter correspondence address",
    },
    ownerRelationship: {
      id: "ownerRelationship",
      jsonPath: "Properties[0].propertyDetails[0].owners[0].relationship",
      type: "singleValueList",
      floatingLabelText: "Relationship",
      hintText: "",
      dropDownData: [{ label: "Father", value: "father" }, { label: "Husband", value: "husband" }],
      value: "father",
    },
    ownerCategory: {
      id: "ownerCategory",
      required: true,
      jsonPath: "Properties[0].propertyDetails[0].owners[0].ownerType",
      type: "singleValueList",
      floatingLabelText: "Owner Category",
      hintText: "Select",
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
                    filter: "[?(@.fromFY=='2018-19')]", //year value for this filter should be dynamic.
                  },
                ],
              },
            ],
          },
        },
        dataPath: ["MdmsRes.PropertyTax.OwnerType"],
      },
      updateDependentFields: (formKey, sourceField, dispatch) => {
        const { value } = sourceField;
        switch (value) {
          case "abcd":
            dispatch(setFieldProperty(formKey, "ownerCategoryId", "hideField", true));
            break;
          default:
            dispatch(setFieldProperty(formKey, "ownerCategoryId", "hideField", false));
            break;
        }
      },
    },
    ownerCategoryId: {
      id: "ownerCategoryId",
      jsonPath: "Properties[0].propertyDetails[0].owners[0].document.documentUid",
      required: true,
      type: "textfield",
      floatingLabelText: "Owner Category Id number",
      hintText: "Enter identification number",
      hideField: true,
    },
    ownerGender: {
      id: "ownerGender",
      jsonPath: "Properties[0].propertyDetails[0].owners[0].gender",
    },
  },
  action: "",
  redirectionRoute: "",
  saveUrl: "",
  isFormValid: false,
};

export default formConfig;
