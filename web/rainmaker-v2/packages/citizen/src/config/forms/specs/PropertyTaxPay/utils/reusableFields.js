import { MDMS } from "egov-ui-kit/utils/endPoints";
import { setDependentFields } from "modules/citizen/PropertyTax/FormWizard/utils/enableDependentFields";

let floorDropDownData=[];

for (var i = 1; i <= 25; i++) {
  floorDropDownData.push({ label: i, value: i })
}

export const floorCount={
  floorCount: {
    id: "assessment-number-of-floors",
    jsonPath: "Properties[0].propertyDetails[0].noOfFloors",
    type: "singleValueList",
    floatingLabelText: "No. of Floors",
    toolTip: true,
    toolTipMessage: "Total number of built floors in owned property",
    required: true,
    hintText: "Select",
    numcols: 4,
    dropDownData:floorDropDownData
    // errorMessage: "Enter floor number between 1 to 25",
    // pattern: /^[1-25]$/
  },
};

export const subUsageType={
  subUsageType: {
    id: "assessment-subUsageType",
    jsonPath: "Properties[0].propertyDetails[0].units[0].usageCategorySubMinor",
    type: "singleValueList",
    floatingLabelText: "Sub Usage Type",
    hintText: "Select",
    dropDownData:[],
    // dataFetchConfig: {
    //   url: MDMS.GET.URL,
    //   action: MDMS.GET.ACTION,
    //   queryParams: [],
    //   // isDependent: true,
    //   requestBody: {
    //     MdmsCriteria: {
    //       tenantId: "pb",
    //       moduleDetails: [
    //         {
    //           moduleName: "PropertyTax",
    //           masterDetails: [
    //             {
    //               name: "UsageCategorySubMinor",
    //             },
    //           ],
    //         },
    //       ],
    //     },
    //   },
    //   dataPath: ["MdmsRes.PropertyTax.UsageCategorySubMinor"],
    // },
    required: true,
    numcols: 4
  },
};

export const occupancy={
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
  }
};

export const builtArea={
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
    hideField: true,
    numcols: 4
  }
}

export const annualRent={
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
    hideField: true,
    numcols: 4
  }
}

export const plotSize={
  plotSize: {
    id: "assessment-plot-size",
    jsonPath: "Properties[0].propertyDetails[0].landArea",
    type: "textfield",
    floatingLabelText: "Plot Size",
    hintText: "Enter plot size",
    errorMessage: "Enter a valid plot size",
    required: true,
  }
}

export const measuringUnit={
  measuringUnit: {
    id: "assessment-plot-unit",
    jsonPath: "",
    type: "singleValueList",
    floatingLabelText: "Measuring unit",
    dropDownData: [{ label: "sq ft", value: "sq ft" }, { label: "sq yards", value: "sq yards" }],
    required: true,
    value: "sq yards",
  },
}
