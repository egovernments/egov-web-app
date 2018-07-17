import { MDMS } from "egov-ui-kit/utils/endPoints";
const formConfig = {
  name: "plotDetails",
  fields: {
    usageType: {
      id: "assessment-usageType",
      jsonPath: "",
      type: "textfield",
      floatingLabelText: "Usage Type",
      value: "Residential",
      required: true,
      disabled: true,
      numcols: 4,
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
      value: "SELFOCCUPIED",
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
        dataPath: ["MdmsRes.PropertyTax.OccupancyType"],
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
      floatingLabelText: "Measuring unit",
      value: "sq yards",
      dropDownData: [{ label: "sq ft", value: "sq ft" }, { label: "sq yards", value: "sq yards" }],
      required: true,
      numcols: 4,
    },
  },
  isFormValid: false,
};

export default formConfig;
