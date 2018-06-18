const formConfig = {
  name: "createComplaint",
  idJsonPath: "services[0].serviceRequestId",
  fields: {
    name: {
      id: "add-complaint",
      jsonPath: "services[0].name",
      floatingLabelText: "Complainant Name",
      hintText: "Enter complainant name",
      errorMessage: "Landmark should be less than 100 characters",
      numCols: 6,
    },
    phone: {
      id: "complainant-mobile-no",
      jsonPath: "services[0].mobile",
      floatingLabelText: "Complainant Mobile No.",
      hintText: "Enter complainant mobile no.",
      errorMessage: "Landmark should be less than 100 characters",
      numCols: 6,
    },
    complaintType: {
      id: "complaint-type",
      jsonPath: "services[0].serviceCode",
      required: true,
      floatingLabelText: "CS_ADDCOMPLAINT_COMPLAINT_TYPE",
      errorMessage: "CS_ADDCOMPLAINT_COMPLAINT_TYPE_PLACEHOLDER",
      hintText: "CS_ADDCOMPLAINT_COMPLAINT_TYPE_PLACEHOLDER",
      numCols: 2,
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
      floatingLabelText: "CS_ADDCOMPLAINT_LOCATION",
      hintText: "CS_COMPLAINT_DETAILS_LOCATION",
      numCols: 2,
    },
    landmark: {
      id: "landmark",
      jsonPath: "services[0].landmark",
      floatingLabelText: "CS_ADDCOMPLAINT_LANDMARK",
      hintText: "CS_ADDCOMPLAINT_LANDMARK_PLACEHOLDER",
      errorMessage: "Landmark should be less than 100 characters",
      numCols: 2,
    },
    additionalDetails: {
      id: "additional details",
      jsonPath: "services[0].description",
      floatingLabelText: "CS_ADDCOMPLAINT_ADDITIONAL_DETAILS",
      hintText: "CS_ADDCOMPLAINT_ADDITIONAL_DETAILS_PLACEHOLDER",
      errorMessage: "Landmark should be less than 300 characters",
      numCols: 2,
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
  redirectionRoute: "/employee/all-complaints",
};

export default formConfig;
