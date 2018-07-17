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
    },
    ownerEmail: {
      id: "ownerEmail",
      jsonPath: "",
      type: "textfield",
      floatingLabelText: "Email ID",
      hintText: "Enter email ID",
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
    },
    ownerCategoryId: {
      id: "ownerCategoryId",
      jsonPath: "",
      required: true,
      type: "textfield",
      floatingLabelText: "Owner Category Id number",
      hintText: "Enter identification number",
    }
  },
  action: "",
  redirectionRoute: "",
  saveUrl: "",
  isFormValid: false,
};

export default formConfig;
