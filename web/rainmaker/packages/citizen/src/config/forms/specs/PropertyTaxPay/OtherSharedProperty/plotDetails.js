import { MDMS } from "egov-ui-kit/utils/endPoints";
const formConfig = {
  name: "plotDetails",
  fields: {
    usageType: {
      id: "assessment-usageType",
      jsonPath: "",
      type: "textfield",
      floatingLabelText: "Usage Type",
      value: "Other",
      required: true,
      disabled: true,
      numCols: 4,
    },
    subUsageType: {
      id: "assessment-subUsageType",
      jsonPath: "",
      type: "singleValueList",
      floatingLabelText: "Sub Usage Type",
      hintText: "Select",
      required: true,
      numCols: 4,
    },
    occupancy: {
      id: "assessment-occupancy",
      jsonPath: "",
      type: "singleValueList",
      floatingLabelText: "Occupancy",
      value: "Self-Occupied",
      required: true,
      numCols: 4,

      dataFetchConfig: {
        url: MDMS.GET.URL,
        action: MDMS.GET.ACTION,
        queryParams: {},
        requestBody: {
          MdmsCriteria: {
            tenantId: "pb",
            moduleDetails: [
              {
                moduleName: "PropertyTax",
                masterDetails: [
                  {
                    name: "OccupancyType",
                  },
                ],
              },
            ],
          },
        },
        dataPath: "MdmsRes.PropertyTax.OccupancyType",
      },
    },
    superArea: {
      id: "assessment-super-area",
      jsonPath: "",
      type: "textfield",
      floatingLabelText: "Total Super area",
      hintText: "Enter total super area",
      ErrorText: "Enter a valid super area size",
      required: true,
      numCols: 4,
    },
    superAreaUnit: {
      id: "assessment-super-area-unit",
      jsonPath: "",
      type: "singleValueList",
      floatingLabelText: "Built area unit",
      value: "Sq yards",
      dropDownData: [{ label: "sq ft", value: "SQ_FT" }, { label: "sq yards", value: "SQ_YARDS" }],
      required: true,
      numCols: 4,
    },
    annualRent: {
      id: "assessment-annual-rent",
      jsonPath: "",
      type: "textfield",
      floatingLabelText: "Total Annual Rent",
      hintText: "Enter annual rent",
      ErrorText: "Enter a valid amount",
      required: true,
      numCols: 4,
    },
  },
};

export default formConfig;
