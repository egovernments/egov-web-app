import { MDMS } from "egov-ui-kit/utils/endPoints";
const formConfig = {
  name: "plotDetails",
  fields: {
    floorCount: {
      id: "assessment-number-of-floors",
      jsonPath: "",
      type: "textfield",
      floatingLabelText: "No. of Floors",
      required: true,
      value: "1",
    },
    usageType: {
      id: "assessment-usageType",
      jsonPath: "",
      type: "textfield",
      floatingLabelText: "Usage Type",
      value: "Commercial",
      required: true,
      disabled: true,
    },
    subUsageType: {
      id: "assessment-subUsageType",
      jsonPath: "",
      type: "singleValueList",
      floatingLabelText: "Sub Usage Type",
      hintText: "Select",
      required: true,
    },
    occupancy: {
      id: "assessment-occupancy",
      jsonPath: "",
      type: "singleValueList",
      floatingLabelText: "Occupancy",
      value: "Self-Occupied",
      required: true,

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
    },
    superAreaUnit: {
      id: "assessment-super-area-unit",
      jsonPath: "",
      type: "singleValueList",
      floatingLabelText: "Built area unit",
      value: "Sq yards",
      required: true,
    },
    annualRent: {
      id: "assessment-annual-rent",
      jsonPath: "",
      type: "textfield",
      floatingLabelText: "Total Annual Rent",
      hintText: "Enter annual rent",
      ErrorText: "Enter a valid amount",
      required: true,
    },
  },
};

export default formConfig;
