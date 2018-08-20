import get from "lodash/get";
import { setFieldProperty } from "egov-ui-kit/redux/form/actions";
const formConfig = {
  name: "institutionAuthority",
  fields: {
    name: {
      id: "authority-name",
      jsonPath: "Properties[0].propertyDetails[0].owners[0].name",
      type: "textfield",
      floatingLabelText: "PT_OWNER_NAME",
      hintText: "PT_FORM3_OWNER_NAME_PLACEHOLDER",
      required: true,
    },
    mobile: {
      id: "authority-mobile",
      jsonPath: "Properties[0].propertyDetails[0].owners[0].mobileNumber",
      type: "textfield",
      floatingLabelText: "PT_FORM3_MOBILE_NO",
      hintText: "PT_FORM3_MOBILE_NO_PLACEHOLDER",
      pattern: /^(\+\d{1,2}[\s-]{0,1})?\(?[6-9]\d{2}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/i,
      errorMessage: "Enter valid mobile number",
    },
    designation: {
      id: "authority-designation",
      jsonPath: "propertyDetails[0].institution.designation",
      type: "textfield",
      floatingLabelText: "Designation",
      hintText: "Enter designation",
      errorMessage: "",
      required: true,
    },
    telephone: {
      id: "authority-telephone",
      jsonPath: "Properties[0].propertyDetails[0].owners[0].altContactNumber",
      type: "textfield",
      floatingLabelText: "Landline No.(with STD code)",
      hintText: "Enter Landline No.",
      required: true,
      pattern: /^[0-9]{11}$/i,
      errorMessage: "Enter valid landline number",
      required: true,
    },
    email: {
      id: "authority-email",
      jsonPath: "Properties[0].propertyDetails[0].owners[0].emailId",
      type: "textfield",
      floatingLabelText: "PT_FORM3_EMAIL_ID",
      hintText: "PT_FORM3_EMAIL_ID_PLACEHOLDER",
      errorMessage: "Enter valid email id",
      pattern: /^(([^<>()\[\]\\.,;:\s$*@'"]+(\.[^<>()\[\]\\.,;:\s@'"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    },
    address: {
      id: "authority-address",
      jsonPath: "Properties[0].propertyDetails[0].owners[0].correspondenceAddress",
      type: "textfield",
      floatingLabelText: "PT_FORM3_CORRESPONDENCE_ADDRESS",
      hintText: "PT_FORM3_CORRESPONDENCE_ADDRESS_PLACEHOLDER",
      required: true,
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
        const { city = "", colony = "", houseNumber = "", mohalla = "", pincode = "", street = ""} = get(state, "form.propertyAddress.fields", {});
        const mohallaDetails = mohalla && mohalla.dropDownData.find(mohallaData => mohallaData.value === get(mohalla, "value", ""))
        if (iscorrAddrSameProp) {
        const correspondingAddress = [`${get(houseNumber, "value", "")}`,`${get(colony, "value", "")}`,`${get(street, "value", "")}`, `${get(mohallaDetails, "label", "")}`,`${get(city,"value","").split(".").pop()}`, `${get(pincode, "value", "")}`].join(", ").replace(/^(,\s)+|(,\s)+$/g, '').replace(/(,\s){2,}/g, ", ")
          dispatch(setFieldProperty(formKey, "address", "value", correspondingAddress));
        } else {
          dispatch(setFieldProperty(formKey, "address", "value", ""));
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
