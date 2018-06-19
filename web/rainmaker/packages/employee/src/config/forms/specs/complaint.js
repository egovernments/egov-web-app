const formConfig = {
  name: "complaint",
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
    city: {
      id: "city",
      jsonPath: "services[0].city",
      floatingLabelText: "City",
      hintText: "Select",
      dropDownData: [{ label: "Jalandhar", value: "jalandhar" }],
    },
    mohalla: {
      id: "mohalla",
      jsonPath: "services[0].mohalla",
      floatingLabelText: "Mohalla",
      hintText: "Select",
      dropDownData: [{ value: "sm", label: "Shashtri Market" }, { value: "MN", label: "Malind Nagar" }, { label: "Kishanpura", value: "Kishanpura" }],
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
      floatingLabelText: "Address",
      hintText: "Enter address",
    },
    landmark: {
      id: "landmark",
      jsonPath: "services[0].landmark",
      floatingLabelText: "CS_ADDCOMPLAINT_LANDMARK",
      hintText: "CS_ADDCOMPLAINT_LANDMARK_PLACEHOLDER",
      errorMessage: "Landmark should be less than 100 characters",
    },
    additionalDetails: {
      id: "additional details",
      jsonPath: "services[0].description",
      floatingLabelText: "CS_ADDCOMPLAINT_ADDITIONAL_DETAILS",
      hintText: "CS_ADDCOMPLAINT_ADDITIONAL_DETAILS_PLACEHOLDER",
      errorMessage: "Landmark should be less than 300 characters",
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
  redirectionRoute: "/employee/all-complaints",
};

export default formConfig;
