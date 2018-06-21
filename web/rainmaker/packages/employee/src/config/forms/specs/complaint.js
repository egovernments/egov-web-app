const formConfig = {
  name: "complaint",
  idjsonPath: "services[0].serviceRequestId",
  fields: {
    name: {
      id: "add-complaint",
      jsonpath: "services[0].name",
      required: true,
      floatingLabelText: "ES_CREATECOMPLAINT_COMPLAINT_NAME",
      hintText: "ES_CREATECOMPLAINT_COMPLAINT_NAME_PLACEHOLDER",
      numcols: 6,
    },
    phone: {
      id: "complainant-mobile-no",
      jsonpath: "services[0].mobile",
      floatingLabelText: "CORE_COMMON_MOBILE_NUMBER",
      errormessage: "CORE_COMMON_PHONENO_INVALIDMSG",
      hintText: "CORE_COMMON_PHONE_NUMBER_PLACEHOLDER",
      numcols: 6,

    },
    complaintType: {
      id: "complaint-type",
      jsonpath: "services[0].serviceCode",
      required: true,
      floatingLabelText: "CS_ADDCOMPLAINT_COMPLAINT_TYPE",
      errormessage: "CS_ADDCOMPLAINT_COMPLAINT_TYPE_PLACEHOLDER",
      hintText: "CS_ADDCOMPLAINT_COMPLAINT_TYPE_PLACEHOLDER",
      numcols: 2,
    },
    city: {
      id: "city",
      jsonpath: "services[0].city",
      floatingLabelText: "CORE_COMMON_CITY",
      hintText: "CORE_COMMON_CITY_PLACEHOLDER",
      dropDownData: [{ label: "Jalandhar", value: "jalandhar" }],
    },
    mohalla: {
      id: "mohalla",
      jsonpath: "services[0].mohalla",
      floatingLabelText: "ES_CREATECOMPLAINT_MOHALLA",
      hintText: "ES_CREATECOMPLAINT_MOHALLA_PLACEHOLDER",
      dropDownData: [{ value: "sm", label: "Shashtri Market" }, { value: "MN", label: "Malind Nagar" }, { label: "Kishanpura", value: "Kishanpura" }],
    },
    latitude: {
      id: "latitude",
      jsonpath: "services[0].lat",
    },
    longitude: {
      id: "longitude",
      jsonpath: "services[0].long",
    },
    address: {
      id: "address",
      jsonpath: "services[0].address",
      required: true,
      floatingLabelText: "ES_CREATECOMPLAINT_ADDRESS",
    },
    landmark: {
      id: "landmark",
      jsonpath: "services[0].landmark",
      floatingLabelText: "CS_ADDCOMPLAINT_LANDMARK",
      hintText: "CS_ADDCOMPLAINT_LANDMARK_PLACEHOLDER",
    },
    additionalDetails: {
      id: "additional details",
      jsonpath: "services[0].description",
      floatingLabelText: "CS_ADDCOMPLAINT_ADDITIONAL_DETAILS",
      hintText: "CS_ADDCOMPLAINT_ADDITIONAL_DETAILS_PLACEHOLDER",
    },
    tenantId: {
      id: "add-complaint-tenantid",
      jsonpath: "services[0].tenantId",
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
