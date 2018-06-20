const formConfig = {
  name: "ownershipType",
  fields: {
    typeOfOwnership: {
      id: "typeOfOwnership",
      jsonPath: "",
      type: "singleValueList",
      floatingLabelText: "Type of Ownership",
      hintText: "Select Ownership Type",
      dropDownData: [
        { label: "Individual Owner", value: "IND" },
        { label: "Multiple Owners", value: "MUL" },
        { label: "Institution", value: "Institution" },
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
      //               name: "OwnerShipCategory",
      //             },
      //           ],
      //         },
      //       ],
      //     },
      //   },
      //   dataPath: "MdmsRes.PropertyTax.OwnerShipCategory",
      // },
      numCols: 6,
    },
  },
  action: "",
  redirectionRoute: "",
  saveUrl: "",
};

export default formConfig;
