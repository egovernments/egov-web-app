import { CITY } from "egov-ui-kit/utils/endPoints";

const formConfig = {
  name: "searchProperty",
  idJsonPath: "services[0].serviceRequestId",
  fields: {
    city: {
      id: "city",
      numcols: 12,
      jsonPath: "services[0].city",
      floatingLabelText: "CORE_COMMON_CITY",
      hintText: "ES_CREATECOMPLAINT_SELECT_PLACEHOLDER",
      errorMessage: "CS_ADDCOMPLAINT_COMPLAINT_TYPE_PLACEHOLDER",
      required: true,
      errorStyle: { position: "absolute", bottom: -8, zIndex: 5 },
      type: "singleValueList",
      dataFetchConfig: {
        url: CITY.GET.URL,
        action: CITY.GET.ACTION,
        queryParams: {},
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
        dataPath: "MdmsRes.tenant.tenants",
      },
    },
    name: {
      id: "add-complaint",
      type: "textfield",
      jsonPath: "services[0].citizen.name",
      floatingLabelText: "ES_CREATECOMPLAINT_COMPLAINT_NAME",
      hintText: "ES_CREATECOMPLAINT_COMPLAINT_NAME_PLACEHOLDER",
      numcols: 6,
      errorStyle: { position: "absolute", bottom: -8, zIndex: 5 },
    },
    phone: {
      id: "complainant-mobile-no",
      type: "mobilenumber",
      jsonPath: "services[0].citizen.mobileNumber",
      floatingLabelText: "ES_CREATECOMPLAINT_MOBILE_NUMBER",
      errorMessage: "CORE_COMMON_PHONENO_INVALIDMSG",
      hintText: "ES_CREATECOMPLAINT_MOBILE_NUMBER_PLACEHOLDER",
      numcols: 6,
      errorStyle: { position: "absolute", bottom: -8, zIndex: 5 },
    },
    oldPropertyId: {
      id: "old-property-id",
      jsonPath: "",
      type: "textfield",
      floatingLabelText: "Old Property Id",
      errorMessage: "",
      hintText: "Enter old poperty ID",
      numcols: 6,
      errorStyle: { position: "absolute", bottom: -8, zIndex: 5 },
    },
    newPropertyId: {
      id: "new-property-id",
      jsonPath: "",
      type: "textfield",
      floatingLabelText: "New Property Id",
      errorMessage: "",
      hintText: "Enter new poperty ID",
      numcols: 6,
      errorStyle: { position: "absolute", bottom: -8, zIndex: 5 },
    },
    houseNo: {
      id: "house-no",
      jsonPath: "",
      type: "textfield",
      floatingLabelText: "House No.",
      errorMessage: "",
      hintText: "Enter house no.",
      numcols: 6,
      errorStyle: { position: "absolute", bottom: -8, zIndex: 5 },
    },
    mohalla: {
      id: "mohalla",
      numcols: 6,
      type: "singleValueList",
      jsonPath: "services[0].mohalla",
      floatingLabelText: "ES_CREATECOMPLAINT_MOHALLA",
      hintText: "ES_CREATECOMPLAINT_SELECT_PLACEHOLDER",
      errorMessage: "CS_ADDCOMPLAINT_COMPLAINT_TYPE_PLACEHOLDER",
      dropDownData: [{ value: "sm", label: "Shashtri Market" }, { value: "MN", label: "Malind Nagar" }, { label: "Kishanpura", value: "Kishanpura" }],
      errorStyle: { position: "absolute", bottom: -8, zIndex: 5 },
    },
    tenantId: {
      id: "add-complaint-tenantid",
      jsonPath: "services[0].tenantId",
      value: "pb.amritsar",
    },
  },
  submit: {
    type: "submit",
    label: "CS_ADDCOMPLAINT_ADDITIONAL_DETAILS_SUBMIT_COMPLAINT",
    id: "addComplaint-submit-complaint",
  },
  action: "_create",
  saveUrl: "/rainmaker-pgr/v1/requests/_create",
  redirectionRoute: "/employee/complaint-submitted",
};

export default formConfig;
