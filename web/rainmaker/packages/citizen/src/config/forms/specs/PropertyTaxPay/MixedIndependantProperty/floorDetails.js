import { MDMS } from "egov-ui-kit/utils/endPoints";
import { setDependentFields } from "modules/citizen/PropertyTax/FormWizard/utils/enableDependentFields";
import {subUsageType,occupancy,builtArea,annualRent,beforeInitForm} from "../utils/reusableFields";

const formConfig = {
  name: "floorDetails",
  fields: {
    usageType: {
      id: "assessment-usageType",
      jsonPath: "Properties[0].propertyDetails[0].units[0].usageCategoryMajor",
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
    ...subUsageType,
    ...occupancy,
    ...builtArea,
    ...annualRent
  },
  isFormValid: false,
  ...beforeInitForm
};

export default formConfig;
