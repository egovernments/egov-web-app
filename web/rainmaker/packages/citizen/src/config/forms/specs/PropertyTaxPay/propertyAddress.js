import { CITY } from "egov-ui-kit/utils/endPoints";
import SearchIcon from "material-ui/svg-icons/action/search";

// const formConfig = {
//   name: "propertyAddress",
//   fields: {
//     doorNumber: {
//       id: "door-number",
//       jsonPath: "",
//       required: true,
//       type: "textfield",
//       floatingLabelText: "PT_PROPERTY_DETAILS_DOOR_NUMBER",
//       hintText: "PT_PROPERTY_DETAILS_DOOR_NUMBER_PLACEHOLDER",
//       errorMessage: "PT_PROPERTY_DETAILS_DOOR_NUMBER_ERRORMSG",
//     },
//     colony: {
//       id: "property-colony",
//       jsonPath: "",
//       required: true,
//       type: "textfield",
//       floatingLabelText: "PT_PROPERTY_DETAILS_COLONY_NAME",
//       hintText: "PT_PROPERTY_DETAILS_COLONY_NAME_PLACEHOLDER",
//       errorMessage: "PT_PROPERTY_DETAILS_COLONY_NAME_ERRORMSG",
//     },
//     street: {
//       id: "property-street",
//       jsonPath: "",
//       type: "textfield",
//       floatingLabelText: "PT_PROPERTY_DETAILS_STREET",
//       hintText: "PT_PROPERTY_DETAILS_STREET_PLACEHOLDER",
//       errorMessage: "PT_PROPERTY_DETAILS_STREET_ERRORMSG",
//     },
//     mohalla: {
//       id: "mohalla",
//       jsonPath: "",
//       type: "singleValueList",
//       floatingLabelText: "PT_PROPERTY_DETAILS_MOHALLA",
//       hintText: "PT_PROPERTY_DETAILS_MOHALLA_PLACEHOLDER",
//       errorMessage: "PT_PROPERTY_DETAILS_MOHALLA_ERRORMSG",
//     },
//     city: {
//       id: "city",
//       jsonPath: "",
//       required: true,
//       type: "singleValueList",
//       floatingLabelText: "CS_ADDCOMPLAINT_CITY",
//       hintText: "PT_PROPERTY_DETAILS_CITY_PLACEHOLDER",
//     },
//     pincode: {
//       id: "pincode",
//       type: "textfield",
//       jsonPath: "",
//       floatingLabelText: "PT_PROPERTY_DETAILS_PINCODE",
//       hintText: "PT_PROPERTY_DETAILS_PINCODE_PLACEHOLDER",
//       errorMessage: "PT_PROPERTY_DETAILS_PINCODE_ERRORMSG",
//     },
//   },

//   action: "",
//   redirectionRoute: "",
//   saveUrl: "",
// };

// export default formConfig;

const formConfig = {
  name: "propertyAddress",
  fields: {
    city: {
      id: "city",
      jsonPath: "Properties[0].address.city",
      required: true,
      toolTip: true,
      toolTipMessage: "",
      value: localStorage.getItem("tenant-id"),
      type: "singleValueList",
      floatingLabelText: "CORE_COMMON_CITY",
      errorStyle: { position: "absolute", bottom: -8, zIndex: 5 },
      fullWidth: true,
      hintText: "",
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
    },
    mohalla: {
      id: "mohalla",
      jsonPath: "Properties[0].address.locality.code",
      type: "singleValueList",
      floatingLabelText: "PT_PROPERTY_DETAILS_MOHALLA",
      //hintText: "PT_COMMON_SELECT_PLACEHOLDER",
      hintText: "Select",
      toolTip: true,
      toolTipMessage: "Name of the area in which your property is located",
      numcols: 6,
      errorMessage: "PT_PROPERTY_DETAILS_MOHALLA_ERRORMSG",
      dropDownData: [{ value: "sm", label: "Shashtri Market" }, { value: "MN", label: "Malind Nagar" }, { label: "Kishanpura", value: "Kishanpura" }],
      errorStyle: { position: "absolute", bottom: -8, zIndex: 5 },
      required: true,
    },
    pincode: {
      id: "pincode",
      type: "textfield",
      jsonPath: "Properties[0].address.pincode",
      floatingLabelText: "PT_PROPERTY_DETAILS_PINCODE",
      hintText: "PT_PROPERTY_DETAILS_PINCODE_PLACEHOLDER",
      numcols: 6,
      errorMessage: "PT_PROPERTY_DETAILS_PINCODE_ERRORMSG",
      errorStyle: { position: "absolute", bottom: -8, zIndex: 5 },
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
    },
  },

  action: "",
  redirectionRoute: "",
  saveUrl: "",
  isFormValid: false,
};

export default formConfig;
