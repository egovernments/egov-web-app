import { CITY } from "egov-ui-kit/utils/endPoints";
const cityCode = "";
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
      jsonPath: "",
      required: true,
      toolTip: true,
      toolTipMessage: "",
      value: localStorage.getItem("tenant-id"),
      type: "singleValueList",
      floatingLabelText: "City",
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
      jsonPath: "",
      required: true,
      type: "textfield",
      floatingLabelText: "House No.",
      hintText: "Enter Enter No.",
      numcols: 6,
      errorMessage: "PT_PROPERTY_DETAILS_DOOR_NUMBER_ERRORMSG",
      errorStyle: { position: "absolute", bottom: -8, zIndex: 5 },
    },
    colony: {
      id: "property-colony",
      jsonPath: "",
      required: true,
      toolTip: true,
      type: "textfield",
      floatingLabelText: "Building/Colony Name",
      toolTipMessage: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do.",
      hintText: "Enter buiding/colony name",
      numcols: 6,
      errorMessage: "PT_PROPERTY_DETAILS_COLONY_NAME_ERRORMSG",
      errorStyle: { position: "absolute", bottom: -8, zIndex: 5 },
    },
    street: {
      id: "property-street",
      jsonPath: "",
      type: "textfield",
      floatingLabelText: "Street Name",
      hintText: "Enter street name",
      numcols: 6,
      errorMessage: "PT_PROPERTY_DETAILS_STREET_ERRORMSG",
      errorStyle: { position: "absolute", bottom: -8, zIndex: 5 },
    },
    mohalla: {
      id: "mohalla",
      jsonPath: "",
      type: "singleValueList",
      floatingLabelText: "Locality/Mohalla",
      hintText: "Select locality",
      numcols: 6,
      errorMessage: "PT_PROPERTY_DETAILS_MOHALLA_ERRORMSG",
      dropDownData: [{ value: "sm", label: "Shashtri Market" }, { value: "MN", label: "Malind Nagar" }, { label: "Kishanpura", value: "Kishanpura" }],
      errorStyle: { position: "absolute", bottom: -8, zIndex: 5 },
    },
    pincode: {
      id: "pincode",
      type: "textfield",
      jsonPath: "",
      floatingLabelText: "Pincode",
      hintText: "Enter area pincode",
      numcols: 6,
      errorMessage: "PT_PROPERTY_DETAILS_PINCODE_ERRORMSG",
      errorStyle: { position: "absolute", bottom: -8, zIndex: 5 },
    },
    oldPID: {
      id: "oldpid",
      type: "textfield",
      jsonPath: "",
      floatingLabelText: "Old Property ID (If applicable)",
      hintText: "Enter old propert ID",
      numcols: 6,
      errorMessage: "PT_PROPERTY_DETAILS_PINCODE_ERRORMSG",
      errorStyle: { position: "absolute", bottom: -8, zIndex: 5 },
    },
  },

  action: "",
  redirectionRoute: "",
  saveUrl: "",
  isFormValid: false,
};

export default formConfig;
