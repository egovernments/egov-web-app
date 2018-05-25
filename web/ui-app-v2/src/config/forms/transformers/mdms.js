import { prepareFormData } from "utils/commons";

const viewModelToBusinessModelTransformer = (form, state) => {
  const formData = prepareFormData(form);
  const { MdmsMetadata } = { ...formData };
  const transformedFormData = {
    MasterMetaData: {
      ...MdmsMetadata,
      moduleName: window.location.pathname.split("/")[3],
      masterName: window.location.pathname.split("/").pop(),
      tenantId: "testtenant", //Hardcoded for now -> To be changed
    },
  };
  return transformedFormData;
};

export default {
  viewModelToBusinessModelTransformer,
};
