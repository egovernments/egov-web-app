const formConfig = {
  name: "ownerInfo",
  fields: {
    ownerName: {
      id: "ownerName",
      jsonPath: "",
      type: "textfield",
      floatingLabelText: "Name",
      hintText: "Enter Owner's Name",
    },
    ownerMobile: {
      id: "ownerMobile",
      jsonPath: "",
      type: "textfield",
      floatingLabelText: "Mobile No.",
      hintText: "Enter Mobile No.",
    },
    ownerGuardian: {
      id: "ownerGuardian",
      jsonPath: "",
      type: "textfield",
      floatingLabelText: "Father's/Husband's Name",
      hintText: "Enter father's/husband's name",
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
  },
  action: "",
  redirectionRoute: "",
  saveUrl: "",
};

export default formConfig;
