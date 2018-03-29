const formConfig = {
  name: "complaint",
  fields: {
    media: {
      id: "media",
      jsonPath: "actionInfo[0].media",
      required: true,
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
    },
    landmark: {
      id: "landmark",
      jsonPath: "services[0].landmark",
      required: false,
      floatingLabelText: "CS_ADDCOMPLAINT_LANDMARK",
      hintText: "CS_ADDCOMPLAINT_LANDMARK_PLACEHOLDER",
    },
    additionalDetails: {
      id: "additional details",
      jsonPath: "services[0].description",
      required: false,
      floatingLabelText: "CS_ADDCOMPLAINT_ADDITIONAL_DETAILS",
      hintText: "CS_ADDCOMPLAINT_ADDITIONAL_DETAILS_PLACEHOLDER",
    },
  },
  action: "_create",
  saveUrl: "/rainmaker-pgr/v1/requests/_create",
  redirectionRoute: "/citizen/complaint-submitted",
};

export default formConfig;
