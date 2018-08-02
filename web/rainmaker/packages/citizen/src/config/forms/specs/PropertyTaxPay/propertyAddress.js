import { CITY } from "egov-ui-kit/utils/endPoints";
import SearchIcon from "material-ui/svg-icons/action/search";
import { prepareFormData } from "egov-ui-kit/redux/common/actions";
const cityCode = "";

const formConfig = {
  name: "propertyAddress",
  fields: {
    city: {
      id: "city",
      jsonPath: "Properties[0].address.city",
      required: true,
      // toolTip: true,
      // toolTipMessage: "",
      type: "singleValueList",
      floatingLabelText: "CORE_COMMON_CITY",
      errorStyle: { position: "absolute", bottom: -8, zIndex: 5 },
      fullWidth: true,
      hintText: "Select",
      numcols: 6,
      dataFetchConfig: {
        url: CITY.GET.URL,
        action: CITY.GET.ACTION,
        queryParams: [],
        requestBody: {
          MdmsCriteria: {
            tenantId: "pb",
            moduleDetails: [
              {
                moduleName: "tenant",
                masterDetails: [
                  {
                    name: "tenants",
                  },
                ],
              },
            ],
          },
        },
        dataPath: ["MdmsRes.tenant.tenants"],
        dependants: [
          {
            fieldKey: "mohalla",
          },
        ],
      },
      updateDependentFields: ({ formKey, field, dispatch, state }) => {
        dispatch(prepareFormData("Properties[0].tenantId", field.value));
      },
    },
    dummy: {
      numcols: 6,
      type: "dummy",
    },
    houseNumber: {
      id: "house-number",
      jsonPath: "Properties[0].address.doorNo",
      type: "textfield",
      floatingLabelText: "PT_PROPERTY_DETAILS_DOOR_NUMBER",
      hintText: "PT_PROPERTY_DETAILS_DOOR_NUMBER_PLACEHOLDER",
      numcols: 6,
      errorMessage: "PT_PROPERTY_DETAILS_DOOR_NUMBER_ERRORMSG",
      errorStyle: { position: "absolute", bottom: -8, zIndex: 5 },
      maxLength: 64,
    },
    colony: {
      id: "property-colony",
      jsonPath: "Properties[0].address.buildingName",
      type: "textfield",
      // floatingLabelText: "PT_PROPERTY_DETAILS_COLONY_NAME",
      floatingLabelText: "Building/Colony Name",
      // hintText: "PT_PROPERTY_DETAILS_COLONY_NAME_PLACEHOLDER",
      hintText: "Enter buiding/colony name",
      numcols: 6,
      errorMessage: "PT_PROPERTY_DETAILS_COLONY_NAME_ERRORMSG",
      errorStyle: { position: "absolute", bottom: -8, zIndex: 5 },
      maxLength: 64,
    },
    street: {
      id: "property-street",
      jsonPath: "Properties[0].address.street",
      type: "textfield",
      // floatingLabelText: "PT_PROPERTY_DETAILS_STREET",
      // hintText: "PT_PROPERTY_DETAILS_STREET_PLACEHOLDER"
      floatingLabelText: "Street Name",
      hintText: "Enter Street Name",
      numcols: 6,
      errorMessage: "PT_PROPERTY_DETAILS_STREET_ERRORMSG",
      errorStyle: { position: "absolute", bottom: -8, zIndex: 5 },
      maxLength: 64,
    },
    mohalla: {
      id: "mohalla",
      jsonPath: "Properties[0].address.locality.code",
      type: "autoSuggestDropdown",
      floatingLabelText: "PT_PROPERTY_DETAILS_MOHALLA",
      //hintText: "PT_COMMON_SELECT_PLACEHOLDER",
      hintText: "Select",
      fullWidth: true,
      toolTip: true,
      toolTipMessage: "Name of the area in which your property is located",
      boundary: true,
      numcols: 6,
      errorMessage: "PT_PROPERTY_DETAILS_MOHALLA_ERRORMSG",
      dataFetchConfig: {
        url: "egov-location/location/v11/boundarys/_search",
        action: "",
        queryParams: [],
        requestBody: {},
        isDependent: true,
        dataPath: `$.TenantBoundary.*.boundary[?(@.label=='City'&&@.code==${cityCode})]..children[?(@.label=='Locality')]`,
      },
      errorStyle: { position: "absolute", bottom: -8, zIndex: 5 },
      required: true,
    },
    pincode: {
      id: "pincode",
      type: "number",
      jsonPath: "Properties[0].address.pincode",
      floatingLabelText: "PT_PROPERTY_DETAILS_PINCODE",
      hintText: "PT_PROPERTY_DETAILS_PINCODE_PLACEHOLDER",
      numcols: 6,
      //errorMessage: "PT_PROPERTY_DETAILS_PINCODE_ERRORMSG",
      errorMessage: "Pincode should be 8 digits",
      errorStyle: { position: "absolute", bottom: -8, zIndex: 5 },
      pattern: "^([0-9]){8}$",
    },
    oldPID: {
      id: "oldpid",
      type: "textFieldIcon",
      Icon: SearchIcon,
      iconRedirectionURL: "https://www.google.co.in/",
      jsonPath: "Properties[0].oldPropertyId",
      floatingLabelText: "PT_PROPERTY_ADDRESS_OLDPID",
      hintText: "PT_PROPERTY_ADDRESS_OLDPID_PLACEHOLDER",
      numcols: 6,
      errorMessage: "PT_PROPERTY_DETAILS_PINCODE_ERRORMSG",
      errorStyle: { position: "absolute", bottom: -8, zIndex: 5 },
      toolTip: true,
      toolTipMessage: "ID assigned to your property by your Municipality ",
      maxLength: 64,
    },
  },

  action: "",
  redirectionRoute: "",
  saveUrl: "",
  isFormValid: false,
};

export default formConfig;
