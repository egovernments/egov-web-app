const formConfig = {
  name: "ownershipType",
  fields: {
    typeOfOwnership: {
      id: "typeOfOwnership",
      jsonPath: "Properties[0].propertyDetails[0].ownershipCategory",
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
      //   queryParams: [],
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
      //   dataPath: ["MdmsRes.PropertyTax.OwnerShipCategory"],
      // },
      numcols: 6,
      required: true,
    },
  },
  action: "",
  redirectionRoute: "",
  saveUrl: "",
  isFormValid: false,
};

export default formConfig;
