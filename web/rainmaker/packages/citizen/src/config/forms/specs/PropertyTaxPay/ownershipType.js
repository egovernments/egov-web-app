import { getOwnerDetails } from "modules/citizen/PropertyTax/FormWizard/utils/formConfigModifier";
import set from "lodash/set";
import get from "lodash/get";
import { updateInstituteType } from "modules/citizen/PropertyTax/FormWizard/utils/formConfigModifier";
import { setFieldProperty } from "egov-ui-kit/redux/form/actions";
import { prepareFormData } from "egov-ui-kit/redux/common/actions";

const formConfig = {
  name: "ownershipType",
  fields: {
    typeOfOwnership: {
      id: "typeOfOwnership",
      jsonPath: "Properties[0].propertyDetails[0].subOwnershipCategory",
      type: "singleValueList",
      floatingLabelText: "PT_FORM3_OWNERSHIP_TYPE",
      hintText: "PT_FORM3_OWNERSHIP_TYPE_PLACEHOLDER",
      // floatingLabelText: "Type of Ownership",
      // hintText: "Select Ownership Type",
      // dropDownData: [
      //   { label: "Individual Owner", value: "IND" },
      //   { label: "Multiple Owners", value: "MUL" },
      //   { label: "Institution", value: "Institution" },
      // ],
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
      updateDependentFields: ({ formKey, field: sourceField, dispatch, state }) => {
        const { value } = sourceField;
        const institutedropDown = updateInstituteType(state, value);
        dispatch(
          prepareFormData(
            "Properties[0].propertyDetails[0].ownershipCategory",
            get(state, `common.generalMDMSDataById.SubOwnerShipCategory[${sourceField.value}].ownerShipCategory`, value)
          )
        );
        if (value.toUpperCase().indexOf("INSTITUTIONAL") !== -1) {
          dispatch(prepareFormData("Properties[0].propertyDetails[0].subOwnershipCategory", null));
        }
        dispatch(setFieldProperty("institutionDetails", "type", "dropDownData", institutedropDown));
      },
    },
  },
  beforeInitForm: (action, store) => {
    let state = store.getState();
    const { dispatch } = store;
    const ownerDetails = getOwnerDetails(state);
    const currentOwnershipType = get(state, "form.ownershipType.fields.typeOfOwnership.value", ownerDetails[0].value);
    set(action, "form.fields.typeOfOwnership.dropDownData", ownerDetails);
    set(action, "form.fields.typeOfOwnership.value", currentOwnershipType);
    dispatch(prepareFormData("Properties[0].propertyDetails[0].subOwnershipCategory", ownerDetails[0].value));
    dispatch(
      prepareFormData(
        "Properties[0].propertyDetails[0].ownershipCategory",
        get(state, `common.generalMDMSDataById.SubOwnerShipCategory[${ownerDetails[0].value}]`).ownerShipCategory
      )
    );
    return action;
  },
  action: "",
  redirectionRoute: "",
  saveUrl: "",
  isFormValid: false,
};

export default formConfig;
