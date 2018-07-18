import { setFieldProperty } from "egov-ui-kit/redux/form/actions"

const formConfig = {
  name: "ownerInfo",
  fields: {
    ownerName: {
      id: "ownerName",
      jsonPath: "",
      type: "textfield",
      floatingLabelText: "Name",
      hintText: "Enter Owner's Name",
      required: true,
    },
    ownerMobile: {
      id: "ownerMobile",
      jsonPath: "",
      type: "textfield",
      floatingLabelText: "Mobile No.",
      hintText: "Enter Mobile No.",
      required: true,
      pattern: /^(\+\d{1,2}\s)?\(?[6-9]\d{2}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/i,
      errorMessage: "Enter valid mobile number",
    },
    ownerGuardian: {
      id: "ownerGuardian",
      jsonPath: "",
      type: "textfield",
      floatingLabelText: "Father's/Husband's Name",
      hintText: "Enter father's/husband's name",
      required: true,
    },
    ownerAadhar: {
      id: "ownerAadhar",
      jsonPath: "",
      type: "textfield",
      floatingLabelText: "Aadhar ID",
      hintText: "Enter aadhar card no.",
      errorMessage: "Enter valid aadhar number",
      pattern: /^[0-9]{12}$/i,
    },
    ownerEmail: {
      id: "ownerEmail",
      jsonPath: "",
      type: "textfield",
      floatingLabelText: "Email ID",
      hintText: "Enter email ID",
      errorMessage: "Enter valid email id",
      pattern: /^(([^<>()\[\]\\.,;:\s$*@'"]+(\.[^<>()\[\]\\.,;:\s@'"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    },
    ownerAddress: {
      id: "ownerAddress",
      jsonPath: "",
      type: "textfield",
      floatingLabelText: "Correspondence Address",
      hintText: "Enter correspondence address",
    },
    ownerRelationship: {
      id: "ownerRelationship",
      jsonPath: "",
      type: "singleValueList",
      floatingLabelText: "Relationship",
      hintText: "",
      dropDownData: [
        { label: "Father", value: "father" },
        { label: "Husband", value: "husband" },
      ],
      value: "father",
    },
    ownerCategory: {
      id: "ownerCategory",
      required: true,
      jsonPath: "",
      type: "singleValueList",
      floatingLabelText: "Owner Category",
      hintText: "Select",
      dropDownData: [
        { label: "xyzz", value: "abcd"},
        { label: "2xyzz", value: "2abcd"},
      ],
      updateDependentFields: (formKey, sourceField, dispatch) => {
        const { value } = sourceField
        switch (value) {
          case "abcd":
            dispatch(setFieldProperty(formKey, "ownerCategoryId", "hideField", true))
            break
          default:
            dispatch(setFieldProperty(formKey, "ownerCategoryId", "hideField", false))
            break
        }
      },
    },
    ownerCategoryId: {
      id: "ownerCategoryId",
      jsonPath: "",
      required: true,
      type: "textfield",
      floatingLabelText: "Owner Category Id number",
      hintText: "Enter identification number",
      hideField: false,
    },
    ownerGender: {
      id: "ownerGender",
      jsonPath: "",
    }
  },
  action: "",
  redirectionRoute: "",
  saveUrl: "",
  isFormValid: false,
};

export default formConfig;
