const formConfig = {
  name: "complaint",
  idJsonPath: "services[0].serviceRequestId",
  fields: {
    media: {
      id: "media",
      jsonPath: "actionInfo[0].media",
      file: true,
      errorMessage: "CS_FILE_UPLOAD_FAILED",
    },
    complaintType: {
      id: "complaint-type",
      jsonPath: "services[0].serviceCode",
      required: true,
      floatingLabelText: "CS_ADDCOMPLAINT_COMPLAINT_TYPE",
      errorMessage: "CS_ADDCOMPLAINT_COMPLAINT_TYPE_PLACEHOLDER",
      hintText: "CS_ADDCOMPLAINT_COMPLAINT_TYPE_PLACEHOLDER",
    },
    latitude: {
      id: "latitude",
      jsonPath: "services[0].addressDetail.latitude",
    },
    longitude: {
      id: "longitude",
      jsonPath: "services[0].addressDetail.longitude",
    },
    address: {
      id: "address",
      jsonPath: "services[0].address",
      floatingLabelText: "CS_ADDCOMPLAINT_LOCATION",
      hintText: "CS_COMPLAINT_DETAILS_LOCATION",
    },
    city: {
      id: "city",
      jsonPath: "services[0].addressDetail.city",
      floatingLabelText: "CORE_COMMON_CITY",
      hintText: "ES_CREATECOMPLAINT_SELECT_PLACEHOLDER",
      errorMessage: "CS_ADDCOMPLAINT_COMPLAINT_TYPE_PLACEHOLDER",
      required: true,
      errorStyle: { position: "absolute", bottom: -8, zIndex: 5 },
      value: tenantId,
      errorText: "",
      type: "singleValueList",
      dataFetchConfig: {
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
      jsonPath: "services[0].addressDetail.mohalla",
      floatingLabelText: "CS_CREATECOMPLAINT_MOHALLA",
      hintText: "CS_CREATECOMPLAINT_MOHALLA_PLACEHOLDER",
      errorMessage: "CS_ADDCOMPLAINT_COMPLAINT_TYPE_PLACEHOLDER",
      boundary: true,

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
      jsonPath: "services[0].addressDetail.houseNoAndStreetName",
      floatingLabelText: "CS_ADDCOMPLAINT_HOUSE_NO",
      hintText: "CS_ADDCOMPLAINT_HOUSE_NO_PLACEHOLDER",
      errorMessage: "House no should be less than 100 characters",
      value: "",
    },
    landmark: {
      id: "landmark",
      jsonPath: "services[0].addressDetail.landmark",
      // floatingLabelText: "CS_ADDCOMPLAINT_ADDITIONAL_DETAILS",
      // hintText: "CS_ADDCOMPLAINT_ADDITIONAL_DETAILS_PLACEHOLDER",
      floatingLabelText: "CS_ADDCOMPLAINT_LANDMARK",
      hintText: "CS_ADDCOMPLAINT_LANDMARK_PLACEHOLDER",
      errorMessage: "Landmark should be less than 100 characters",
      value: "",
    },
    additionalDetails: {
      id: "additional details",
      jsonPath: "services[0].description",
      floatingLabelText: "CS_ADDCOMPLAINT_COMPLAINT_DETAILS",
      hintText: "CS_ADDCOMPLAINT_COMPLAINT_DETAILS_PLACEHOLDER",
      errorMessage: "Landmark should be less than 300 characters",
      value: "",
    },
    tenantId: {
      id: "add-complaint-tenantid",
      jsonPath: "services[0].tenantId",
    },
  },
  submit: {
    type: "submit",
    label: "CS_ADDCOMPLAINT_ADDITIONAL_DETAILS_SUBMIT_COMPLAINT",
    id: "addComplaint-submit-complaint",
  },
  action: "_create",
  saveUrl: "/rainmaker-pgr/v1/requests/_create",
  redirectionRoute: "/complaint-submitted",
};

export default formConfig;
