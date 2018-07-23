import { MDMS } from "egov-ui-kit/utils/endPoints";
import { setDependentFields } from "modules/citizen/PropertyTax/FormWizard/utils/enableDependentFields";
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
    subUsageType: {
      id: "assessment-subUsageType",
      jsonPath: "Properties[0].propertyDetails[0].units[0].usageCategorySubMinor",
      type: "singleValueList",
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
      required: true,
      numcols: 4,
    },
    occupancy: {
      id: "assessment-occupancy",
      jsonPath: "Properties[0].propertyDetails[0].units[0].occupancyType",
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
        dataPath: ["MdmsRes.PropertyTax.OccupancyType"],
      },
      updateDependentFields: (formKey, sourceField, dispatch) => {
        const { value } = sourceField;
        const dependentFields1 = ["builtArea"];
        const dependentFields2 = ["annualRent"];
        switch (value) {
          case "SELFOCCUPIED":
            setDependentFields(dependentFields2, dispatch, formKey, true);
            setDependentFields(dependentFields1, dispatch, formKey, false);
            break;
          case "RENTED":
            setDependentFields(dependentFields1, dispatch, formKey, true);
            setDependentFields(dependentFields2, dispatch, formKey, false);
            break;
          default:
          // setDependentFields(dependentFields, dispatch, formKey, false);
        }
      },
    },
    builtArea: {
      id: "assessment-built-area",
      jsonPath: "Properties[0].propertyDetails[0].units[0].unitArea",
      type: "textfield",
      floatingLabelText: "Built Area(sq yards)",
      hintText: "Enter built area size",
      ErrorText: "Enter a valid built area size",
      toolTip: true,
      toolTipMessage: "Carpet Area + balcony area + thickness of outer walls",
      required: true,
      numcols: 4,
      hideField: true,
    },
    annualRent: {
      id: "assessment-annual-rent",
      jsonPath: "Properties[0].propertyDetails[0].units[0].arv",
      type: "textfield",
      floatingLabelText: "Total Annual Rent",
      hintText: "Enter annual rent",
      ErrorText: "Enter a valid amount",
      toolTip: true,
      toolTipMessage: "Total Rent collected on your property over a year",
      required: true,
      numcols: 4,
      hideField: true,
    },
  },
  isFormValid: false,
};

export default formConfig;
