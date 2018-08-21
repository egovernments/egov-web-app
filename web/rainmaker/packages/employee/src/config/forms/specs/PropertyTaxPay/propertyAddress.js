import { pincode, mohalla, street, colony, houseNumber, dummy, city } from "./utils/reusableFields";
import { handleFieldChange } from "egov-ui-kit/redux/form/actions";
// const Search = <Icon action="action" name="home" color="#30588c" />;

const formConfig = {
  name: "propertyAddress",
  fields: {
    ...city,
    ...dummy,
    ...houseNumber,
    ...colony,
    ...street,
    ...mohalla,
    ...pincode,
    oldPID: {
      id: "oldpid",
      type: "textFieldIcon",
      className: "pt-old-pid-text-field",
      text: "SEARCH",
      iconRedirectionURL: "https://pmidc.punjab.gov.in/propertymis/search.php",
      jsonPath: "Properties[0].oldPropertyId",
      floatingLabelText: "PT_PROPERTY_ADDRESS_EXISTING_PID",
      hintText: "PT_PROPERTY_ADDRESS_EXISTING_PID_PLACEHOLDER",
      numcols: 6,
      errorMessage: "PT_PROPERTY_DETAILS_PINCODE_ERRORMSG",
      errorStyle: { position: "absolute", bottom: -8, zIndex: 5 },
      toolTip: true,
      pattern: /^[a-zA-Z0-9\\\/\-_\s]{1,64}$/i,
      toolTipMessage: "PT_OLDPID_TOOLTIP_MESSAGE",
      maxLength: 64,
    },
  },
  afterInitForm: (action, store, dispatch) => {
    let tenantId = JSON.parse(localStorage.getItem("user-info")).tenantId;
    dispatch(handleFieldChange("propertyAddress", "city", tenantId));
    return action;
  },
  action: "",
  redirectionRoute: "",
  saveUrl: "",
  isFormValid: false,
};

export default formConfig;
