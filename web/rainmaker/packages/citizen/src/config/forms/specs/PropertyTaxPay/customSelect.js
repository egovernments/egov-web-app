import { FLOOR } from "egov-ui-kit/utils/endPoints";

const formConfig = {
  name: "customSelect",
  fields: {
    floorName: {
      id: "floorName",
      // jsonPath: "Properties[0].propertyDetails[0].units[0].floorNo",
      type: "singleValueList",
      floatingLabelText: "Select Floor",
      hintText: "Select floor",
      numcols: 12,
      errorMessage: "",
      required: true,
      dataFetchConfig: {
        url: FLOOR.GET.URL,
        action: FLOOR.GET.ACTION,
        queryParams: [{ key: "tenantId", value: "pb" }],
        requestBody: {
          MdmsCriteria: {
            tenantId: "pb",
            moduleDetails: [
              {
                moduleName: "PropertyTax",
                masterDetails: [
                  {
                    name: "Floor",
                  },
                ],
              },
            ],
          },
        },
        dataPath: ["MdmsRes.PropertyTax.Floor"],
      },
    },
  },
  action: "",
  redirectionRoute: "",
  saveUrl: "",
  isFormValid: false,
};

export default formConfig;
