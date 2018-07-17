import { MDMS } from "egov-ui-kit/utils/endPoints";
const formConfig = {
  name: "floorDetails",
  fields: {
    usageType: {
      id: "assessment-usageType",
      jsonPath: "",
      type: "textfield",
      floatingLabelText: "Usage Type",
      value: "Public Space",
      required: true,
      disabled: true,
      numcols: 4,
    },
    subUsageType: {
      id: "assessment-subUsageType",
      jsonPath: "",
      type: "singleValueList",
      dataFetchConfig: {
        url: MDMS.GET.URL,
        action: MDMS.GET.ACTION,
        queryParams: [],
        requestBody: {
          MdmsCriteria: {
            tenantId: "pb",
            moduleDetails: [
              {
                moduleName: "PropertyTax",
                masterDetails: [
                  {
                    name: "UsageCategorySubMinor",
                  },
                ],
              },
            ],
          },
        },
        dataPath: "MdmsRes.PropertyTax.UsageCategorySubMinor",
      },
      floatingLabelText: "Sub Usage Type",
      hintText: "Select",
      required: true,
      numcols: 4,
    },
    occupancy: {
      id: "assessment-occupancy",
      jsonPath: "",
      type: "singleValueList",
      floatingLabelText: "Occupancy",
      hintText: "Select",
      required: true,
      numcols: 4,

      dataFetchConfig: {
        url: MDMS.GET.URL,
        action: MDMS.GET.ACTION,
        queryParams: [],
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
    builtArea: {
      id: "assessment-built-area",
      jsonPath: "",
      type: "textfield",
      floatingLabelText: "Built Area(sq yards)",
      hintText: "Enter built area size",
      ErrorText: "Enter a valid built area size",
      required: true,
      numcols: 4,
    },
    annualRent: {
      id: "assessment-annual-rent",
      jsonPath: "",
      type: "textfield",
      floatingLabelText: "Total Annual Rent",
      hintText: "Enter annual rent",
      ErrorText: "Enter a valid amount",
      required: true,
      numcols: 4,
    },
  },
  isFormValid: false,
};

export default formConfig;
