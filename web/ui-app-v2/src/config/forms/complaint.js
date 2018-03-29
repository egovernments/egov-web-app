const formConfig = {
  name: "complaint",
  fields: {
    media: {
      id: "media",
      jsonPath: "actionInfo.media",
      required: false,
      errorMessage: "CS_FILE_UPLOAD_FAILED",
    },
    complaintType: {
      id: "complaint-type",
      jsonPath: "services.serviceCode",
      required: false,
      floatingLabelText: "CS_ADDCOMPLAINT_COMPLAINT_TYPE",
      errorMessage: "CS_ADDCOMPLAINT_COMPLAINT_TYPE_PLACEHOLDER",
      hintText: "CS_ADDCOMPLAINT_COMPLAINT_TYPE_PLACEHOLDER",
    },
    latitude: {
      id: "latitude",
      jsonPath: "services.lat",
    },
    longitude: {
      id: "longitude",
      jsonPath: "services.long",
    },
    address: {
      id: "address",
      jsonPath: "services.address",
      required: false,
      floatingLabelText: "CS_ADDCOMPLAINT_LOCATION",
      hintText: "CS_COMPLAINT_DETAILS_LOCATION",
    },
    additionalDetails: {
      id: "additional details",
      jsonPath: "services.description",
      required: false,
      floatingLabelText: "CS_ADDCOMPLAINT_ADDITIONAL_DETAILS",
      hintText: "CS_ADDCOMPLAINT_ADDITIONAL_DETAILS_PLACEHOLDER",
    },
  },
  action: "_create",
  saveUrl: "/requests/_create",
  redirectionRoute: "/citizen/complaint-submitted",
};

export default formConfig;
