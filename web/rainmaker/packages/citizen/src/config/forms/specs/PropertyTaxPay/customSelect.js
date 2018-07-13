import { FLOOR } from "egov-ui-kit/utils/endPoints";
const formConfig = {
  name: "customSelect",
  fields: {
    floorName: {
      id: "floorName",
      jsonPath: "",
      type: "singleValueList",
      floatingLabelText: "",
      hintText: "Select locality",
      numcols: 12,
      errorMessage: "",
      dataFetchConfig: {
        url: FLOOR.GET.URL,
        action: FLOOR.GET.ACTION,
        queryParams: [],
        requestBody: {
          MdmsCriteria: {
            tenantId: "pb",
            moduleDetails: [
              {
                moduleName: "tenant",
                masterDetails: [
                  {
                    name: "tenants",
                  },
                ],
              },
            ],
          },
        },
        dataPath: "MdmsRes.tenant.tenants",
        dependants: [
          {
            fieldKey: "mohalla",
          },
        ],
      },
      // dropDownData: [],
      // dataFetchConfig: {
      //   url: "egov-location/location/v11/boundarys/_search",
      //   action: "",
      //   queryParams: [],
      //   requestBody: {},
      //   isDependent: true,
      //   dataPath: `$.TenantBoundary.*.boundary[?(@.label=='City'&&@.code==${cityCode})]..children[?(@.label=='Locality')]`,
      // },
    },
  },
  action: "",
  redirectionRoute: "",
  saveUrl: "",
};

export default formConfig;
