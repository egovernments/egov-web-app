import { setFieldProperty } from "egov-ui-kit/redux/form/actions";
import { CITY } from "egov-ui-kit/utils/endPoints";

const formConfig = {
  name: "complaint",
  idJsonPath: "services[0].serviceRequestId",
  fields: {
    name: {
      id: "add-complaint",
      jsonPath: "services[0].citizen.name",
      required: true,
      floatingLabelText: "ES_CREATECOMPLAINT_COMPLAINT_NAME",
      hintText: "ES_CREATECOMPLAINT_COMPLAINT_NAME_PLACEHOLDER",
      numcols: 6,
      errorStyle: { position: "absolute", bottom: -8, zIndex: 5 },
      value: "",
      errorText: "",
    },
    phone: {
      id: "complainant-mobile-no",
      type: "number",
      pattern: "^([0-9]){10}$",
      jsonPath: "services[0].citizen.mobileNumber",
      required: true,
      floatingLabelText: "ES_CREATECOMPLAINT_MOBILE_NUMBER",
      errorMessage: "CORE_COMMON_PHONENO_INVALIDMSG",
      hintText: "ES_CREATECOMPLAINT_MOBILE_NUMBER_PLACEHOLDER",
      numcols: 6,
      errorStyle: { position: "absolute", bottom: -8, zIndex: 5 },
      value: "",
      errorText: "",
    },
    complaintType: {
      id: "complaint-type",
      jsonPath: "services[0].serviceCode",
      required: true,
      floatingLabelText: "CS_ADDCOMPLAINT_COMPLAINT_TYPE",
      errorMessage: "CS_ADDCOMPLAINT_COMPLAINT_TYPE_PLACEHOLDER",
      hintText: "CS_ADDCOMPLAINT_COMPLAINT_TYPE_PLACEHOLDER",
      numcols: 2,
      errorStyle: { position: "absolute", bottom: -8, zIndex: 5 },
      value: "",
      errorText: "",
    },
    latitude: {
      id: "latitude",
      jsonPath: "services[0].lat",
    },
    longitude: {
      id: "longitude",
      jsonPath: "services[0].long",
    },
    address: {
      id: "address",
      jsonPath: "services[0].address",
      required: true,
      floatingLabelText: "ES_CREATECOMPLAINT_ADDRESS",
      hintText: "ES_CREATECOMPLAINT_ADDRESS_PLACEHOLDER",
      errorStyle: { position: "absolute", bottom: -8, zIndex: 5 },
      value: "",
      errorText: "",
    },
    city: {
      id: "city",
      jsonPath: "services[0].city",
      floatingLabelText: "CORE_COMMON_CITY",
      hintText: "ES_CREATECOMPLAINT_SELECT_PLACEHOLDER",
      errorMessage: "CS_ADDCOMPLAINT_COMPLAINT_TYPE_PLACEHOLDER",
      required: true,
      errorStyle: { position: "absolute", bottom: -8, zIndex: 5 },
      value: "",
      errorText: "",
      type: "singleValueList",
      dataFetchConfig: {
        // url: CITY.GET.URL,
        // action: CITY.GET.ACTION,
        // queryParams: [],
        // requestBody: {
        //   MdmsCriteria: {
        //     tenantId: "pb",
        //     moduleDetails: [
        //       {
        //         moduleName: "tenant",
        //         masterDetails: [
        //           {
        //             name: "tenants",
        //           },
        //         ],
        //       },
        //     ],
        //   },
        // },
        // dataPath: ["MdmsRes.tenant.tenants"],
        dependants: [
          {
            fieldKey: "mohalla",
          },
        ],
      },
    },
    mohalla: {
      id: "mohalla",
      required: true,
      jsonPath: "services[0].addressId",
      // floatingLabelText: "ES_CREATECOMPLAINT_MOHALLA",
      // hintText: "ES_CREATECOMPLAINT_SELECT_PLACEHOLDER",
      floatingLabelText: "CS_CREATECOMPLAINT_MOHALLA",
      hintText: "CS_CREATECOMPLAINT_MOHALLA_PLACEHOLDER",
      errorMessage: "CS_ADDCOMPLAINT_COMPLAINT_TYPE_PLACEHOLDER",
      boundary: true,
      // dropDownData: [{ value: "sm", label: "Shashtri Market" }, { value: "MN", label: "Malind Nagar" }, { label: "Kishanpura", value: "Kishanpura" }],
      dropDownData: [],
      dataFetchConfig: {
        url: "egov-location/location/v11/boundarys/_search?hierarchyTypeCode=ADMIN&boundaryType=Locality",
        action: "",
        queryParams: [],
        requestBody: {},
        isDependent: true,
      },

      errorStyle: { position: "absolute", bottom: -8, zIndex: 5 },
      value: "",
      errorText: "",
    },
    houseNo: {
      id: "houseNo",
      jsonPath: "services[0].houseNo",
      floatingLabelText: "CS_ADDCOMPLAINT_HOUSE_NO",
      hintText: "CS_ADDCOMPLAINT_HOUSE_NO_PLACEHOLDER",
      errorMessage: "House no should be less than 100 characters",
      value: "",
    },
    landmark: {
      id: "landmark",
      jsonPath: "services[0].landmark",
      floatingLabelText: "CS_ADDCOMPLAINT_ADDITIONAL_DETAILS",
      hintText: "CS_ADDCOMPLAINT_ADDITIONAL_DETAILS_PLACEHOLDER",
      errorStyle: { position: "absolute", bottom: -8, zIndex: 5 },
      value: "",
      errorText: "",
    },
    additionalDetails: {
      id: "additional details",
      jsonPath: "services[0].description",
      floatingLabelText: "ES_CREATECOMPLAINT_ADDITIONAL_DETAILS",
      hintText: "ES_CREATECOMPLAINT_ADDITIONAL_DETAILS_PLACEHOLDER",
      errorStyle: { position: "absolute", bottom: -8, zIndex: 5 },
      value: "",
      errorText: "",
    },
    tenantId: {
      id: "add-complaint-tenantid",
      jsonPath: "services[0].tenantId",
      value: "pb",
    },
  },
  submit: {
    type: "submit",
    label: "CS_ADDCOMPLAINT_ADDITIONAL_DETAILS_SUBMIT_COMPLAINT",
    id: "addComplaint-submit-complaint",
  },
  afterInitForm: (action, store, dispatch) => {
    try {
      let state = store.getState();
      const { cities, citiesByModule } = state.common;
      const { PGR } = citiesByModule || {};
      if (PGR) {
        const tenants = PGR.tenants;
        const dd = tenants.reduce((dd, tenant) => {
          let selected = cities.find((city) => {
            return city.code === tenant.code;
          });
          dd.push({ label: selected.name, value: selected.code });
          return dd;
        }, []);
        dispatch(setFieldProperty("complaint", "city", "dropDownData", dd));
      }
      return action;
    } catch (e) {
      console.log(e);
    }
  },
  action: "_create",
  saveUrl: "/rainmaker-pgr/v1/requests/_create",
  redirectionRoute: "/complaint-submitted",
};

export default formConfig;
