import { MDMS } from "egov-ui-kit/utils/endPoints";
import get from "lodash/get"
import { updateInstituteType } from "modules/citizen/PropertyTax/FormWizard/utils/formConfigModifier"
import set from "lodash/set"

const formConfig = {
  name: "institutionDetails",
  fields: {
    name: {
      id: "institution-name",
      jsonPath: "propertyDetails[0].institution.name",
      type: "textfield",
      floatingLabelText: "Name of Institution",
      hintText: "Enter Institute's name",
      errorMessage: "Enter a valid name",
      numcols: 6,
      required: true,
    },
    type: {
      id: "institution-type",
      jsonPath: "propertyDetails[0].institution.type",
      type: "singleValueList",
      floatingLabelText: "Type of Institution",
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
      //               name: "UsageCategorySubMinor",
      //               filter: "[?(@.usageCategoryMinor=='INSTITUTIONAL')]", //year value for this filter should be dynamic.
      //             },
      //           ],
      //         },
      //       ],
      //     },
      //   },
      //   dataPath: ["MdmsRes.PropertyTax.UsageCategorySubMinor"],
      // },
      // dropDownData:[],
      numcols: 6,
      hintText: "PT_COMMONS_SELECT_PLACEHOLDER",
      required: true,
    },
  },
  beforeInitForm: (action, store) => {
    let state = store.getState();
    const value = get(state, "form.ownershipType.fields.typeOfOwnership.value", "");
    const  institutedropDown = updateInstituteType(state, value)
    set(action, "form.fields.type.dropDownData", institutedropDown)
    return action
  },
  action: "",
  redirectionRoute: "",
  saveUrl: "",
  isFormValid: false,
};

export default formConfig;
