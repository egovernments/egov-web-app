const formConfig = {
  name: "additionalRebate",
  idJsonPath: "services[0].serviceRequestId",
  fields: {
    adhocPenalty: {
      id: "adhocPenalty",
      type: "number",
      floatingLabelText: "Additional Charges",
      hintText: "Enter amount",
      required: false,
      fullWidth: true,
      jsonPath: "Properties[0].propertyDetails[0].adhocPenalty",
    },
    adhocPenaltyReason: {
      id: "adhocPenaltyReason",
      type: "singleValueList",
      dropDownData: [
        { label: "Pending dues from earlier", value: "Pending dues from earlier" },
        { label: "Miscalculation of earlier assessment", value: "Miscalculation of earlier assessment" },
        { label: "One time Penalty", value: "One time Penalty" },
        { label: "Other", value: "Other" },
      ],
      floatingLabelText: "Reason for Charges",
      hintText: "Select",
      required: false,
      fullWidth: true,
      jsonPath: "Properties[0].propertyDetails[0].adhocPenaltyReason",
    },
    adhocExemption: {
      id: "adhocExemption",
      type: "number",
      floatingLabelText: "Additional Rebate",
      hintText: "Enter amount",
      required: false,
      fullWidth: true,
      jsonPath: "Properties[0].propertyDetails[0].adhocExemption",
    },
    adhocExemptionReason: {
      id: "adhocExemptionReason",
      type: "singleValueList",
      floatingLabelText: "Reason for rebate",
      hintText: "Select",
      dropDownData: [
        { label: "Advanced paid by citizen earlier", value: "Advanced paid by citizen earlier" },
        { label: "Rebate provided by commisioner", value: "Rebate provided by commisioner" },
        { label: "Other", value: "Other" },
      ],
      required: false,
      fullWidth: true,
      jsonPath: "Properties[0].propertyDetails[0].adhocExemptionReason",
    },
  },
  action: "_create",
  saveUrl: "/rainmaker-pgr/v1/requests/_create",
  redirectionRoute: "/complaint-submitted",
};

export default formConfig;
