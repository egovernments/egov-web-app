import { prepareFormData } from "utils/commons";
import commonConfig from "config/common";

const viewModelToBusinessModelTransformer = (form, state) => {
  const formData = prepareFormData(form);
  // const tenantId = localStorage.getItem("tenant-id");
  formData.tenantId = commonConfig.tenantId;
  const { fields } = state.form.employeeForgotPasswd || {};

  formData.userName = fields.username.value;
  return formData;
};

export default {
  viewModelToBusinessModelTransformer,
};
