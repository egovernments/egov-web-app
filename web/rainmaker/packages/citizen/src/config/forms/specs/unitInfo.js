import { MDMS } from "egov-ui-kit/utils/endPoints";
const formConfig = {
  name: "unitInfo",
  fields: {
    floor: {
      id: "floor",
      jsonPath: "",
      type: "singleValueList",
      floatingLabelText: "Floor",
      hintText: "",
      dropDownData: [],
      numCols: 4,
      value: "",
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
    builtArea: {
      id: "builtArea",
      jsonPath: "",
      type: "textfield",
      floatingLabelText: "Built Area",
      hintText: "Enter built area size",
      numCols: 4,
    },
  },
  action: "",
  redirectionRoute: "",
  saveUrl: "",
};

export default formConfig;
