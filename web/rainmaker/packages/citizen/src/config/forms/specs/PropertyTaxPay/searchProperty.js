import { CITY } from "egov-ui-kit/utils/endPoints";

const formConfig = {
  name: "searchProperty",
  idJsonPath: "services[0].serviceRequestId",
  fields: {
    city: {
      id: "city",
      numcols: 6,
      fullWidth: true,
      jsonPath: "",
      floatingLabelText: "CORE_COMMON_CITY",
      hintText: "ES_CREATECOMPLAINT_SELECT_PLACEHOLDER",
      errorMessage: "CS_ADDCOMPLAINT_COMPLAINT_TYPE_PLACEHOLDER",
      required: true,
      errorStyle: { position: "absolute", bottom: -8, zIndex: 5 },
      type: "singleValueList",
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
      },
    },
    mobileNumber: {
      id: "complainant-mobile-no",
      type: "mobilenumber",
      jsonPath: "",
      floatingLabelText: "ES_CREATECOMPLAINT_MOBILE_NUMBER",
      errorMessage: "CORE_COMMON_PHONENO_INVALIDMSG",
      hintText: "ES_CREATECOMPLAINT_MOBILE_NUMBER_PLACEHOLDER",
      inputStyle: { width: "calc(100% - 35px)" },
      numcols: 6,
      errorStyle: { position: "absolute", bottom: -8, zIndex: 5 },
    },
    oldAssessmentNumber: {
      id: "old-property-id",
      jsonPath: "",
      type: "textfield",
      floatingLabelText: "Old Property Id",
      errorMessage: "",
      hintText: "Enter old property ID",
      numcols: 6,
      errorStyle: { position: "absolute", bottom: -8, zIndex: 5 },
      maxLength: 64,
    },
    ids: {
      id: "property-tax-assessment-id",
      jsonPath: "",
      type: "textfield",
      floatingLabelText: "Property Tax Assesssment ID",
      errorMessage: "",
      hintText: "Enter property tax assesssment ID",
      numcols: 6,
      errorStyle: { position: "absolute", bottom: -8, zIndex: 5 },
      maxLength: 64,
    },

    // houseNo: {
    //   id: "house-no",
    //   jsonPath: "",
    //   type: "textfield",
    //   floatingLabelText: "House No.",
    //   errorMessage: "",
    //   hintText: "Enter house no.",
    //   numcols: 6,
    //   errorStyle: { position: "absolute", bottom: -8, zIndex: 5 },
    // },
    // mohalla: {
    //   id: "mohalla",
    //   numcols: 6,
    //   type: "singleValueList",
    //   jsonPath: "services[0].mohalla",
    //   floatingLabelText: "ES_CREATECOMPLAINT_MOHALLA",
    //   hintText: "ES_CREATECOMPLAINT_SELECT_PLACEHOLDER",
    //   errorMessage: "CS_ADDCOMPLAINT_COMPLAINT_TYPE_PLACEHOLDER",
    //   dropDownData: [{ value: "sm", label: "Shashtri Market" }, { value: "MN", label: "Malind Nagar" }, { label: "Kishanpura", value: "Kishanpura" }],
    //   errorStyle: { position: "absolute", bottom: -8, zIndex: 5 },
    // },
    // tenantId: {
    //   id: "add-complaint-tenantid",
    //   jsonPath: "services[0].tenantId",
    //   value: "pb.amritsar",
    // },
  },
  submit: {
    type: "submit",
    label: "SEARCH",
    id: "search-property",
  },
  action: "_search",
  saveUrl: "/pt-services-v2/property",
  redirectionRoute: "",
  isFormValid: false,
};

export default formConfig;
