import { MDMS } from "egov-ui-kit/utils/endPoints";
const formConfig = {
  name: "plotDetails",
  fields: {
    usageType: {
      id: "assessment-usageType",
      jsonPath: "",
      type: "singleValueList",
      floatingLabelText: "Usage Type",
      value: "Residential",
      required: true,
      numcols: 4,
      // dropDownData: [
      //   { label: "Residential", value: "RESIDENTIAL" },
      //   { label: "Commercial", value: "COMMERCIAL" },
      //   { label: "Institutional", value: "INSTITUTIONAL" },
      //   { label: "Industrial", value: "INDUSTRIAL" },
      //   { label: "Public Space", value: "PUBLICSPACE" },
      //   { label: "Religious", value: "RELIGIOUS" },
      //   { label: "Other", value: "OTHER" },
      //   { label: "Mixed", value: "MIXED" },
      // ],
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
        dataPath: "MdmsRes.PropertyTax.UsageCategoryMajor",
      },
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
    superArea: {
      id: "assessment-super-area",
      jsonPath: "",
      type: "textfield",
      floatingLabelText: "Total Super area",
      hintText: "Enter total super area",
      ErrorText: "Enter a valid super area size",
      required: true,
      numcols: 4,
    },
    superAreaUnit: {
      id: "assessment-super-area-unit",
      jsonPath: "",
      type: "singleValueList",
      floatingLabelText: "Built area unit",
      dropDownData: [{ label: "sq ft", value: "sq ft" }, { label: "sq yards", value: "sq yards" }],
      required: true,
      numcols: 4,
      value: "sq yards",
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
