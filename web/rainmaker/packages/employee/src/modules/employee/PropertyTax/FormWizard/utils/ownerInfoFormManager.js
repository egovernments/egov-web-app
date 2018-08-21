import formHoc from "egov-ui-kit/hocs/form";
import GenericForm from "../components/GenericForm";

const combinationToFormkeyMapping = {
  Institution: {
    ownerForm: formHoc({ formKey: "institutionDetails", path: "PropertyTaxPay/OwnerInformation/Institution" ,isCoreConfiguration:true})(GenericForm),
  },
};

export const getOwnerInfoFormConfigPath = (typeOfOwner) => {
  return combinationToFormkeyMapping.hasOwnProperty(typeOfOwner) ? combinationToFormkeyMapping[typeOfOwner] : null;
};
