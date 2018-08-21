import { pincode, mohalla, street, colony, houseNumber, dummy, city } from "egov-ui-kit/config/forms/specs/PropertyTaxPay/utils/reusableFields";
import { prepareFormData } from "egov-ui-kit/redux/common/actions";

const formConfig = {
  name: "propertyInformation",
  fields: {
    ...city,
    ...dummy,
    ...houseNumber,
    ...colony,
    ...street,

    mohalla: {
      id: "mohalla",
      jsonPath: "Properties[0].address.locality.code",
      type: "autoSuggestDropdown",
      floatingLabelText: "PT_PROPERTY_DETAILS_MOHALLA",
      hintText: "PT_COMMONS_SELECT_PLACEHOLDER",
      fullWidth: true,
      boundary: true,
      numcols: 6,
      errorMessage: "PT_PROPERTY_DETAILS_MOHALLA_ERRORMSG",
      dataFetchConfig: {
        url: "egov-location/location/v11/boundarys/_search",
        action: "",
        queryParams: [],
        requestBody: {},
        isDependent: true,
      },
      errorStyle: { position: "absolute", bottom: -8, zIndex: 5 },
      required: true,
      updateDependentFields: ({ formKey, field, dispatch }) => {
        const mohalla = field.dropDownData.find((option) => {
          return option.value === field.value;
        });
        dispatch(prepareFormData("Properties[0].address.locality.area", mohalla.area));
      },
    },

    ...pincode,
    oldPID: {
      id: "oldpid",
      type: "textFieldIcon",
      className: "pt-old-pid-text-field",
      iconRedirectionURL: "https://pmidc.punjab.gov.in/propertymis/search.php",
      jsonPath: "Properties[0].oldPropertyId",
      floatingLabelText: "PT_PROPERTY_ADDRESS_EXISTING_PID",
      hintText: "PT_PROPERTY_ADDRESS_EXISTING_PID_PLACEHOLDER",
      numcols: 6,
      errorMessage: "PT_PROPERTY_DETAILS_PINCODE_ERRORMSG",
      errorStyle: { position: "absolute", bottom: -8, zIndex: 5 },
      pattern: /^[a-zA-Z0-9\\\/\-_\s]{1,64}$/i,
      maxLength: 64,
    },
  },

  action: "",
  redirectionRoute: "",
  saveUrl: "",
  isFormValid: false,
};

export default formConfig;
