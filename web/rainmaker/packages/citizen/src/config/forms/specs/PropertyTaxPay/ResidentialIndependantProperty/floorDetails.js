import { MDMS } from "egov-ui-kit/utils/endPoints";
const formConfig = {
  name: "floorDetails",
  fields: {
    // floor: {
    //   id: "assessment-floor",
    //   jsonPath: "",
    //   type: "singleValueList",
    //   floatingLabelText: "Usage Type",
    //   value: "Ground Floor",
    // },
    usageType: {
      id: "assessment-usageType",
      jsonPath: "",
      type: "singleValueList",
      floatingLabelText: "Usage Type",
      value: "RESIDENTIAL",
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
                    name: "UsageCategoryMajor",
                  },
                ],
              },
            ],
          },
        },
        dependants: [
          {
            fieldKey: "subUsageType",
          },
        ],
        dataPath: ["MdmsRes.PropertyTax.UsageCategoryMajor"],
      },
      required: true,
      numcols: 4,
      disabled: true,
    },
    subUsageType: {
      id: "assessment-subUsageType",
      jsonPath: "",
      type: "singleValueList",
      dataFetchConfig: {
        url: MDMS.GET.URL,
        action: MDMS.GET.ACTION,
        queryParams: [],
        //isDependent: true,
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
        dataPath: ["MdmsRes.PropertyTax.UsageCategorySubMinor"],
      },
      floatingLabelText: "Sub Usage Type",
      hintText: "Select",
      numcols: 4,
      required: true,
    },
    occupancy: {
      id: "assessment-occupancy",
      jsonPath: "",
      type: "singleValueList",
      floatingLabelText: "Occupancy",
      value: "SELFOCCUPIED",
      numcols: 4,
      required: true,

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
        dataPath: ["MdmsRes.PropertyTax.OccupancyType"],
      },
    },
    builtArea: {
      id: "assessment-built-area",
      jsonPath: "",
      type: "textfield",
      //
      hintText: "Enter built area size",
      ErrorText: "Enter a valid built area size",
      numcols: 4,
      required: true,
    },
  },
  isFormValid: false,
};

export default formConfig;
