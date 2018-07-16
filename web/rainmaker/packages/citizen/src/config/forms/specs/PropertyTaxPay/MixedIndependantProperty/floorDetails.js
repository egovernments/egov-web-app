import { MDMS } from "egov-ui-kit/utils/endPoints";
const formConfig = {
  name: "floorDetails",
  fields: {
    usageType: {
      id: "assessment-usageType",
      jsonPath: "",
      type: "singleValueList",
      floatingLabelText: "Usage Type",
      value: "Residential",
      required: true,
      numcols: 4,
      dropDownData: [
        { label: "Residential", value: "RESIDENTIAL" },
        { label: "Commercial", value: "COMMERCIAL" },
        { label: "Institutional", value: "INSTITUTIONAL" },
        { label: "Industrial", value: "INDUSTRIAL" },
        { label: "Public Space", value: "PUBLICSPACE" },
        { label: "Religious", value: "RELIGIOUS" },
        { label: "Other", value: "OTHER" },
        { label: "Mixed", value: "MIXED" },
      ],
      // dataFetchConfig: {
      //   url: MDMS.GET.URL,
      //   action: MDMS.GET.ACTION,
      //   queryParams: {},
      //   requestBody: {
      //     MdmsCriteria: {
      //       tenantId: "pb",
      //       moduleDetails: [
      //         {
      //           moduleName: "PropertyTax",
      //           masterDetails: [
      //             {
      //               name: "UsageCategoryMajor",
      //             },
      //           ],
      //         },
      //       ],
      //     },
      //   },
      //   dataPath: "MdmsRes.PropertyTax.UsageCategoryMajor",
      // },
    },
    subUsageType: {
      id: "assessment-subUsageType",
      jsonPath: "",
      type: "singleValueList",
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
