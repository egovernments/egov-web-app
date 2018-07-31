import { getOwnerDetails } from "modules/citizen/PropertyTax/FormWizard/utils/formConfigModifier";
import { prepareFormData } from "egov-ui-kit/redux/common/actions";
import set from "lodash/set";
import get from "lodash/get"


const formConfig = {
  name: "ownershipType",
  fields: {
    typeOfOwnership: {
      id: "typeOfOwnership",
      jsonPath: "Properties[0].propertyDetails[0].subOwnershipCategory",
      type: "singleValueList",
      floatingLabelText: "Type of Ownership",
      hintText: "Select Ownership Type",
      dropDownData: [],
      numcols: 6,
      required: true,
      updateDependentFields: ({ formKey, field, dispatch, state }) => {
        dispatch(prepareFormData("Properties[0].propertyDetails[0].ownershipCategory",get(state,`common.generalMDMSDataById.SubOwnerShipCategory[${field.value}]`).ownerShipCategory));
      }
    },
  },
  beforeInitForm: (action, store) => {
    let state = store.getState();
    let {dispatch} =store;
    const ownerDetails = getOwnerDetails(state)
    set(action, "form.fields.typeOfOwnership.dropDownData", ownerDetails)
    set(action, "form.fields.typeOfOwnership.value", ownerDetails[0].value)
    dispatch(prepareFormData("Properties[0].propertyDetails[0].subOwnershipCategory",ownerDetails[0].value));
    dispatch(prepareFormData("Properties[0].propertyDetails[0].ownershipCategory",get(state,`common.generalMDMSDataById.SubOwnerShipCategory[${ownerDetails[0].value}]`).ownerShipCategory));
    return action;
  },
  action: "",
  redirectionRoute: "",
  saveUrl: "",
  isFormValid: false,
};

export default formConfig;
