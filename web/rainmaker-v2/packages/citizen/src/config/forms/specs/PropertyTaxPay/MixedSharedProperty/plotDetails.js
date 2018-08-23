import { MDMS } from "egov-ui-kit/utils/endPoints";
import {plotSize,measuringUnit,subUsageType,occupancy,annualRent} from "../utils/reusableFields";
import { setDependentFields } from "modules/citizen/PropertyTax/FormWizard/utils/enableDependentFields";
const formConfig = {
  name: "plotDetails",
  fields: {
    usageType: {
      id: "assessment-usageType",
      jsonPath: "Properties[0].propertyDetails[0].units[0].usageCategoryMinor",
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
        dataPath: ["MdmsRes.PropertyTax.UsageCategoryMajor"],
      },
    },
    ...subUsageType,
    ...occupancy,
    superArea: {
      id: "assessment-super-area",
      jsonPath: "Properties[0].propertyDetails[0].units[0].unitArea",
      type: "textfield",
      floatingLabelText: "Total Super area",
      hintText: "Enter total super area",
      ErrorText: "Enter a valid super area size",
      toolTip: true,
      toolTipMessage: "Total Carpet Area + Total balcony area + Total thickness of outer walls + Total common area (lift, stairs, lobby etc.)",
      required: true,
      numcols: 4,
      hideField: true,
    },
    ...measuringUnit,
    ...annualRent
  },
  isFormValid: false,
};

export default formConfig;
