import { setFieldProperty } from "egov-ui-kit/redux/form/actions"

const formConfig = {
  name: "institutionAuthority",
  fields: {
    name: {
      id: "authority-name",
      jsonPath: "",
      type: "textfield",
      floatingLabelText: "Name",
      hintText: "Enter Owner's Name",
      required: true,
    },
    mobile: {
      id: "authority-mobile",
      jsonPath: "",
      type: "textfield",
      floatingLabelText: "Mobile No.",
      hintText: "Enter Mobile No.",
      required: true,
      pattern: /^(\+\d{1,2}[\s-]{0,1})?\(?[6-9]\d{2}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/i,
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
    designation: {
      id: "authority-designation",
      jsonPath: "",
      type: "textfield",
      floatingLabelText: "Designation",
      hintText: "Enter designation",
      errorMessage: "",
    },
    telephone: {
      id: "authority-telephone",
      jsonPath: "",
      type: "textfield",
      floatingLabelText: "Telephone No.",
      hintText: "Enter Telephone No.",
      required: true,
      pattern: /^(\+\d{1,2}\s)?\(?[6-9]\d{2}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/i,
      errorMessage: "Enter valid mobile number",
    },
    email: {
      id: "authority-email",
      jsonPath: "",
      type: "textfield",
      floatingLabelText: "Email ID",
      hintText: "Enter email ID",
      errorMessage: "Enter valid email id",
      pattern: /^(([^<>()\[\]\\.,;:\s$*@'"]+(\.[^<>()\[\]\\.,;:\s@'"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    },
    address: {
      id: "authority-address",
      jsonPath: "",
      type: "textfield",
      floatingLabelText: "Official Correspondence Address",
      hintText: "Enter official correspondence address",
      required: true,
    },
  },
  action: "",
  redirectionRoute: "",
  saveUrl: "",
  isFormValid: false,
};

export default formConfig;
