import { MDMS } from "egov-ui-kit/utils/endPoints";
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
    subUsageType: {
      id: "assessment-subUsageType",
      jsonPath: "Properties[0].propertyDetails[0].units[0].usageCategorySubMinor",
      type: "singleValueList",
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
        const dependentFields1 = ["superArea", "superAreaUnit"];
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
    superAreaUnit: {
      id: "assessment-super-area-unit",
      jsonPath: "",
      type: "singleValueList",
      floatingLabelText: "Built area unit",
      dropDownData: [{ label: "sq ft", value: "sq ft" }, { label: "sq yards", value: "sq yards" }],
      required: true,
      numcols: 4,
      value: "sq yards",
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
